from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL connection
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",          # your MySQL username
        password="0000",      # your MySQL password
        database="cooking_guide"
    )
    cursor = db.cursor(dictionary=True)
    print("✅ MySQL connected successfully!")
except mysql.connector.Error as err:
    print("❌ MySQL connection error:", err)
    exit(1)

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'status': 'error', 'message': 'Please fill all fields'}), 400

    try:
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()
        if user:
            return jsonify({'status': 'success', 'message': 'Login successful!'})
        else:
            return jsonify({'status': 'error', 'message': 'Invalid email or password'}), 401
    except Exception as e:
        print("Error during login:", e)
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500

# Registration Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not email or not password or not confirm_password:
        return jsonify({'status': 'error', 'message': 'Please fill all fields'}), 400

    if password != confirm_password:
        return jsonify({'status': 'error', 'message': 'Passwords do not match'}), 400

    try:
        # Check if email already exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({'status': 'error', 'message': 'Email already registered'}), 400

        # Insert new user
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        db.commit()
        return jsonify({'status': 'success', 'message': 'Registration successful! You can now log in.'})
    except Exception as e:
        print("Error during registration:", e)
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500



if __name__ == '__main__':
    print("🔹 Flask server running at http://127.0.0.1:5000")
    app.run(debug=True)
