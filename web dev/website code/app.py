from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample recipe data
recipes = [
    {
        "id": 1,
        "name": "Paneer Butter Masala",
        "image": "/static/images/paneer.jpg",
        "description": "Creamy tomato-based curry with paneer cubes.",
        "ingredients": ["Paneer", "Tomatoes", "Butter", "Spices"],
        "instructions": [
            "Fry paneer cubes lightly.",
            "Make tomato gravy with spices.",
            "Add cream and butter, then paneer."
        ]
    },
    {
        "id": 2,
        "name": "Pasta Alfredo",
        "image": "/static/images/pasta.jpg",
        "description": "Italian creamy pasta with garlic and cheese.",
        "ingredients": ["Pasta", "Garlic", "Butter", "Cream", "Cheese"],
        "instructions": [
            "Boil pasta.",
            "Make garlic butter sauce.",
            "Add cream and cheese, mix pasta in."
        ]
    }
]

# Homepage
@app.route('/')
def home():
    return render_template('index.html')

# API to get all recipes
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    return jsonify(recipes)

# Search recipe by name
@app.route('/api/recipes/search', methods=['GET'])
def search_recipes():
    query = request.args.get('q', '').lower()
    results = [r for r in recipes if query in r['name'].lower()]
    return jsonify(results)

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
