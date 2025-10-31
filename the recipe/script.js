document.addEventListener("DOMContentLoaded", function() {



// --- 1. CONFIGURATION & API URLs ---

const API_BASE = 'https://www.themealdb.com/api/json/v1/1/';

const API_BASE_URL = 'http://127.0.0.1:5001';

const API_FILTER_BY_CATEGORY = API_BASE + 'filter.php?c=';

const API_LOOKUP_BY_ID = API_BASE + 'lookup.php?i=';

const API_SEARCH_BY_NAME = API_BASE + 'search.php?s=';



const pageContainer = document.getElementById('page-container');



// --- 2. Homepage Categories (IMAGE BUGS FIXED) ---

const homeCategories = [

{

id: 'category-Starter', title: 'Easy Dinners',

img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'

},

{

id: 'category-Dessert', title: 'Baking Made Easy',

img: 'https://images.pexels.com/photos/806357/pexels-photo-806357.jpeg'

},

// **IMAGE FIX 1**: This now has a real image of jam

{

id: 'category-Miscellaneous', title: 'Jams and Preserves',

img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfJxW_KDasfy76cweP4h3Hv66zyrBoS637Q&s'

},

{

id: 'category-Starter', title: 'Soups',

img: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg'

},

{

id: 'category-Starter', title: 'Starters & Snacks',

img: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg'

},

{

id: 'category-Dessert', title: 'Desserts',

img: 'https://www.brit.co/media-library/strawberry-filled-chocolate-cake.jpg?id=34162741&width=1500&height=2000&quality=50&coordinates=0%2C56%2C0%2C57'

},

{

// *** MODIFICATION 1: Changed 'category-Cocktail' to 'page-cocktails' ***

id: 'page-cocktails', title: 'Cocktails & Mocktails',

img: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg'

},

{

id: 'category-Breakfast', title: 'Breakfast',

img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'

},

{

id: 'category-Side', title: 'Lunch',

img: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg'

},

{

id: 'category-Vegetarian', title: 'Salads',

img: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg'

},

// **IMAGE FIX 2**: This now has a real image for Desi food

{

id: 'page-desi-party', title: 'Desi & Party',

img: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg' // Image of Samosas

},

// **IMAGE FIX 3**: This now has a real image for Student food

{

id: 'page-student', title: 'Student Friendly',

img: 'https://www.themealdb.com/images/media/meals/1529445893.jpg' // Image of Chow Mein

}

];



// --- 3. Local Recipe Database (Desi & Party) (IMAGE BUGS FIXED) ---

const localRecipes = [

{

id: 'samosa', title: 'Vegetable Samosa', category: 'desi-party',

// **IMAGE FIX**: Correct Samosa Image

img: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',

desc: 'A crispy fried pastry filled with spiced potatoes, peas, and carrots.',

ingredients: ['2 cups All-purpose flour (Maida)', '4 tbsp Oil', 'Water (to knead)', '4 Potatoes (boiled & mashed)', '1 cup Green peas (boiled)', '1 tsp Ginger (grated)', '1 tsp Cumin seeds', '1 tsp Garam masala', 'Salt to taste', 'Oil (for frying)'],

steps: ['Make the dough: Mix flour, 4 tbsp oil, and salt. Add water slowly to form a stiff dough. Cover and rest for 30 min.', 'Make the filling: Heat 1 tbsp oil, add cumin seeds. Add ginger, peas, and mashed potatoes.', 'Add all spices (garam masala, salt) and mix well. Let it cool.', 'Assemble: Make small balls from the dough, roll into an oval. Cut in half.', 'Form a cone with one half, fill it with the potato mixture, and seal the edges using water.', 'Fry: Deep fry in medium-hot oil until golden brown and crispy.']

},

{

id: 'bhel-puri', title: 'Bhel Puri', category: 'desi-party',

// **IMAGE FIX 2**: Correct Bhel Puri Image

img: 'https://shwetainthekitchen.com/wp-content/uploads/2022/01/bhel-puri.jpg',

desc: 'A savory snack made of puffed rice, vegetables, and a tangy tamarind sauce.',

ingredients: ['3 cups Puffed rice (Murmura)', '1 Onion (finely chopped)', '1 Tomato (finely chopped)', '1 Potato (boiled & chopped)', '1/2 cup Sev', '2 tbsp Peanuts (roasted)', '1/4 cup Tamarind chutney', '1/4 cup Green chutney', '1 tsp Chaat masala', 'Cilantro (for garnish)'],

steps: ['In a large bowl, add puffed rice, onion, tomato, and potato.', 'Add the peanuts, half the sev, and the chaat masala.', 'Just before serving, pour both the tamarind and green chutneys over the mixture.', 'Mix everything quickly and well.', 'Garnish with the remaining sev and fresh cilantro. Serve immediately.']

},

{

id: 'paneer-chilli', title: 'Chilli Paneer', category: 'desi-party',

// **IMAGE FIX 3**: Correct Chilli Paneer Image

img: 'https://www.cookclickndevour.com/wp-content/uploads/2016/05/chilli-paneer-recipe-1.jpg',

desc: 'An Indo-Chinese starter made by tossing fried paneer in a spicy, tangy sauce.',

ingredients: ['250g Paneer (cubed)', '2 tbsp Cornflour', '1 tbsp All-purpose flour', '1 tsp Soy sauce', '1/2 tsp Black pepper', 'Oil (for frying)', '1 tbsp Oil (for sauce)', '1 Onion (cubed)', '1 Bell Pepper (cubed)', '2 cloves Garlic (minced)', '2 tbsp Soy sauce', '1 tbsp Chili sauce', '1 tbsp Ketchup', '1 tbsp Vinegar'],

steps: ['Make batter: In a bowl, mix cornflour, all-purpose flour, soy sauce, pepper, and a little water to make a medium-thick batter.', 'Coat paneer cubes in the batter and deep fry until golden and crisp. Set aside.', 'Make sauce: Heat 1 tbsp oil in a wok. Add minced garlic and stir-fry for 30 seconds.', 'Add the cubed onion and bell pepper. Stir-fry on high heat for 2 minutes.', 'Add all the sauces (soy, chili, ketchup, vinegar) and 1/4 cup of water. Bring to a boil.', 'Add the fried paneer cubes and toss to coat them in the sauce. Serve hot.']

},

{

id: 'maggi', title: 'Street Style Masala Maggi', category: 'desi-party',

// **IMAGE FIX 4**: Correct Maggi Image

img: 'https://www.nestleprofessional.in/sites/default/files/2022-08/MAGGI-Noodles-Szechuan-Paneer-756x471.jpg',

desc: 'The classic 2-minute noodles, cooked with extra veggies and spices.',

ingredients: ['1 packet Maggi noodles', '1 packet Maggi tastemaker', '1.5 cups Water', '1 tbsp Oil', '1/2 Onion (chopped)', '1/2 Tomato (chopped)', '1/4 cup Green peas', '1/4 tsp Turmeric', '1/4 tsp Red chili powder (optional)'],

steps: ['Heat oil in a pan. Add onions and sauté until translucent.', 'Add tomatoes and green peas. Cook for 2-3 minutes.', 'Add turmeric, chili powder, and the Maggi tastemaker. Stir for 30 seconds.', 'Add 1.5 cups of water and bring to a boil.', 'Break the Maggi noodle cake and add it to the boiling water. Cook for 2-3 minutes, stirring occasionally.']

},

// *** MODIFICATION 2: Added new local recipes for cocktails ***
{
    id: 'mojito', title: 'Classic Mojito', category: 'cocktails',
    img: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
    desc: 'A refreshing Cuban highball with mint, lime, sugar, and rum.',
    ingredients: ['2 oz White Rum', '1 oz Fresh lime juice', '2 tsp Sugar', '6-8 Mint leaves', 'Soda water', 'Ice'],
    steps: ['Muddle mint leaves and sugar in a glass.', 'Add lime juice and rum.', 'Fill the glass with ice.', 'Top with soda water and stir gently.', 'Garnish with a mint sprig and lime wedge.']
},
{
    id: 'virgin-mojito', title: 'Virgin Mojito (Mocktail)', category: 'cocktails',
    img: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg',
    desc: 'The classic refreshing mojito, without the alcohol.',
    ingredients: ['1 oz Fresh lime juice', '2 tsp Sugar', '10-12 Mint leaves', 'Sprite or Club Soda', 'Crushed ice'],
    steps: ['In a sturdy glass, muddle the mint leaves, sugar, and lime juice.', 'Fill the glass almost to the top with crushed ice.', 'Top off with Sprite or soda water.', 'Stir well and garnish with a mint sprig.']
},
{
    id: 'old-fashioned', title: 'Old Fashioned', category: 'cocktails',
    img: 'https://images.pexels.com/photos/1579227/pexels-photo-1579227.jpeg',
    desc: 'A classic cocktail of whiskey, sugar, bitters, and citrus.',
    ingredients: ['1 Sugar cube (or 1 tsp sugar)', '2-3 dashes Angostura bitters', '1 tsp Water', '2 oz Bourbon or Rye whiskey', 'Orange peel', 'Ice'],
    steps: ['Place the sugar cube in a glass. Add bitters and water.', 'Muddle until the sugar is dissolved.', 'Fill the glass with one large ice cube.', 'Pour the whiskey over the ice.', 'Garnish by expressing the oil of an orange peel over the glass, then dropping it in.']
}

];



// --- 4. Custom Page Definitions (IMAGE BUGS FIXED) ---

const customSubCategories = {

'student': [

{ id: 'category-Pasta', title: 'Easy Pasta', img: 'https://www.themealdb.com/images/category/pasta.png', isLocal: false },

{ id: 'category-Starter', title: 'Quick Starters', img: 'https://www.themealdb.com/images/category/starter.png', isLocal: false },

{ id: 'category-Vegetarian', title: 'Veggie Meals', img: 'https://www.themealdb.com/images/category/vegetarian.png', isLocal: false }

],

'global': [

{ id: 'category-Italian', title: 'Italian', img: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg', isLocal: false },

{ id: 'category-Mexican', title: 'Mexican', img: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067340.jpg', isLocal: false },

{ id: 'category-Chinese', title: 'Chinese', img: 'https://www.themealdb.com/images/media/meals/1529445893.jpg', isLocal: false },

{ id: 'category-Indian', title: 'Indian', img: 'httpsIA://www.themealdb.com/images/media/meals/1529444830.jpg', isLocal: false }

],

// **IMAGE FIX 5**: All images here are now correct

'desi-party': [

{ id: 'local-samosa', title: 'Vegetable Samosa', img: 'https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg', isLocal: true },

{ id: 'local-bhel-puri', title: 'Bhel Puri', img: 'https://shwetainthekitchen.com/wp-content/uploads/2022/01/bhel-puri.jpg', isLocal: true },

{ id: 'local-paneer-chilli', title: 'Chilli Paneer', img: 'https://www.cookclickndevour.com/wp-content/uploads/2016/05/chilli-paneer-recipe-1.jpg', isLocal: true },

{ id: 'local-maggi', title: 'Masala Maggi', img: 'https://www.nestleprofessional.in/sites/default/files/2022-08/MAGGI-Noodles-Szechuan-Paneer-756x471.jpg', isLocal: true },

{ id: 'recipe-52774', title: 'Chow Mein', img: 'https://i0.wp.com/s.lightorangebean.com/media/20240914164843/chow-mein-fun-done.png', isLocal: false },

{ id: 'recipe-52852', title: 'English Trifle (Custard)', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqTmswFi3QeHHPSPwF2XVWiyhJiNGYeserQ&s', isLocal: false }

],

// *** MODIFICATION 3: Added new 'cocktails' page definition ***
'cocktails': [
    { id: 'local-mojito', title: 'Classic Mojito', img: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg', isLocal: true },
    { id: 'local-virgin-mojito', title: 'Virgin Mojito', img: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg', isLocal: true },
    { id: 'local-old-fashioned', title: 'Old Fashioned', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTHwqLe6JnaOimvWHPYCBW2-fwsOm7mTkIw&s', isLocal: true },
]

};



// --- 5. PAGE RENDERING FUNCTIONS ---



function showLoader() {

pageContainer.innerHTML = '<div class="loader"></div>';

}



// Renders the Homepage (Categories) - Uses the fixed list

function renderHomePage() {

let html = '<h2 class="section-title">Browse All Categories</h2>';

html += '<div class="category-grid">';

homeCategories.forEach(cat => {

html += `

<a href="#" class="category-card" data-target="${cat.id}" data-title="${cat.title}">

<img src="${cat.img}" alt="${cat.title}">

<div class="card-title">${cat.title}</div>

</a>

`;

});

html += '</div>';

pageContainer.innerHTML = html;

}


// Renders custom pages (Student, Global, Desi & Party)

function renderCustomPage(pageId, title) {

let html = `<h2 class="section-title">${title}</h2>`;


// This page is a list of recipes
// *** MODIFICATION 4: Added '|| pageId === 'cocktails'' to the condition ***
if (pageId === 'desi-party' || pageId === 'cocktails') {

html += '<div class="recipe-grid">'; // Use recipe grid

customSubCategories[pageId].forEach(recipe => {

html += `

<div class="recipe-card">

<img src="${recipe.img}" alt="${recipe.title}">

<h3>${recipe.title}</h3>

<a href="#" class="recipe-link" data-target="${recipe.id}">Get the Recipe</a>

</div>

`;

});

html += '</div>';

} else {

// These pages are lists of sub-categories

html += '<div class="category-grid">'; // Use category grid

customSubCategories[pageId].forEach(cat => {

html += `

<a href="#" class="category-card" data-target="${cat.id}" data-title="${cat.title}">

<img src="${cat.img}" alt="${cat.title}">

<div class="card-title">${cat.title}</div>

</a>

`;

});

html += '</div>';

}

pageContainer.innerHTML = html;

}



// Renders a Recipe Grid Page from the API

async function renderCategoryPage(categoryId, title) {

showLoader();

try {

const response = await fetch(`${API_FILTER_BY_CATEGORY}${categoryId}`);

const data = await response.json();


let html = `<h2 class="section-title">${title}</h2>`;

if (!data.meals || data.meals.length === 0) {

html += '<p style.textAlign = "center";>No recipes found for this category yet.</p>';

pageContainer.innerHTML = html;

return;

}



html += '<div class="recipe-grid">';

data.meals.forEach(recipe => {

html += `

<div class="recipe-card">

<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">

<h3>${recipe.strMeal}</h3>

<p>A delicious ${title} dish.</p>

<a href="#" class="recipe-link" data-target="recipe-${recipe.idMeal}">Get the Recipe</a>

</div>

`;

});

html += '</div>';

pageContainer.innerHTML = html;



} catch (error) {

console.error('Failed to load recipes:', error);

pageContainer.innerHTML = '<p style="text-align: center;">Error loading recipes. Please try again.</p>';

}

}



// Renders a Single Recipe Page from the API

async function renderRecipePage(recipeId) {

showLoader();

try {

const response = await fetch(`${API_LOOKUP_BY_ID}${recipeId}`);

const data = await response.json();

const recipe = data.meals[0];



let ingredientsHtml = '<ul>';

for (let i = 1; i <= 20; i++) {

const ingredient = recipe[`strIngredient${i}`];

const measure = recipe[`strMeasure${i}`];

if (ingredient && ingredient.trim() !== "") {

ingredientsHtml += `<li>${measure} ${ingredient}</li>`;

}

}

ingredientsHtml += '</ul>';



let stepsHtml = '<ol>';

const steps = recipe.strInstructions.split('\r\n').filter(step => step.trim() !== "");

steps.forEach(item => {

if(item.trim().length > 1) { stepsHtml += `<li>${item}</li>`; }

});

stepsHtml += '</ol>';



const html = `

<div class="recipe-content">

<h2>${recipe.strMeal}</h2>

<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">

<p>${recipe.strTags ? 'Tags: ' + recipe.strTags.split(',').join(', ') : 'A classic recipe.'}</p>

<div class="recipe-details">

<h3>Ingredients</h3>

${ingredientsHtml}

<h3>How to Prepare</h3>

${stepsHtml}

</div>

</div>

`;

pageContainer.innerHTML = html;



} catch (error) {

console.error('Failed to load recipe details:', error);

pageContainer.innerHTML = '<p style="text-align: center;">Error loading recipe. Please try again.</p>';

}

}



// Renders a Single Recipe Page from our LOCAL database

function renderLocalRecipePage(recipeId) {

showLoader();


const recipe = localRecipes.find(r => r.id === recipeId);

if (!recipe) {

navigate('home', 'Home'); // Go home if not found

return;

}



let ingredientsHtml = '<ul>';

recipe.ingredients.forEach(item => { ingredientsHtml += `<li>${item}</li>`; });

ingredientsHtml += '</ul>';



let stepsHtml = '<ol>';

recipe.steps.forEach(item => { stepsHtml += `<li>${item}</li>`; });

stepsHtml += '</ol>';



const html = `

<div class="recipe-content">

<h2>${recipe.title}</h2>

<img src="${recipe.img}" alt="${recipe.title}">

<p>${recipe.desc}</p>

<div class.recipe-details">

<h3>Ingredients</h3>

${ingredientsHtml}

<h3>How to Prepare</h3>

${stepsHtml}

</div>

</div>

`;

setTimeout(() => { pageContainer.innerHTML = html; }, 200); // Simulate load time

}



// Renders Search Results from BOTH API and Local

async function renderSearchResults(query) {

showLoader();

let allResults = [];



// 1. Search Local Recipes

const localResults = localRecipes

.filter(r => r.title.toLowerCase().includes(query.toLowerCase()))

.map(r => ({

id: `local-${r.id}`,

title: r.title,

img: r.img,

desc: r.category

}));

allResults = allResults.concat(localResults);



// 2. Search API

try {

const response = await fetch(`${API_SEARCH_BY_NAME}${query}`);

const data = await response.json();


if (data.meals) {

const apiResults = data.meals.map(recipe => ({

id: `recipe-${recipe.idMeal}`,

title: recipe.strMeal,

img: recipe.strMealThumb,

desc: recipe.strCategory

}));

allResults = allResults.concat(apiResults);

}



} catch (error) {

console.error('Failed to load API search:', error);

}



// 3. Render Combined Results

let html = `<h2 class="section-title">Search Results for "${query}"</h2>`;

if (allResults.length === 0) {

html += `<p style="text-align: center;">No recipes found for "${query}". Please try another search.</p>`;

pageContainer.innerHTML = html;

return;

}



html += '<div class="recipe-grid">';

allResults.forEach(recipe => {

html += `

<div class="recipe-card">

<img src="${recipe.img}" alt="${recipe.title}">

<h3>${recipe.title}</h3>

<p>Category: ${recipe.desc}</p>

<a href="#" class="recipe-link" data-target="${recipe.id}">Get the Recipe</a>

</div>

`;

});

html += '</div>';

pageContainer.innerHTML = html;

}





// --- 6. NAVIGATION ROUTER (The Main Brain) ---


function navigate(targetId, title) {

window.scrollTo(0, 0);


if (targetId === 'home') {

renderHomePage();

}

// Handle custom pages (Student, Global, Desi)

else if (targetId.startsWith('page-')) {

const pageName = targetId.replace('page-', '');

renderCustomPage(pageName, title);

}

// Handle an API recipe category

else if (targetId.startsWith('category-')) {

const categoryName = targetId.split('-')[1];

renderCategoryPage(categoryName, title);

}

// Handle a LOCAL recipe

else if (targetId.startsWith('local-')) {

renderLocalRecipePage(targetId.replace('local-', ''));

}

// Handle an API recipe

else if (targetId.startsWith('recipe-')) {

const recipeId = targetId.split('-')[1];

renderRecipePage(recipeId);

}

// Handle a search query

else if (targetId.startsWith('search-')) {

const query = targetId.substring(7);

renderSearchResults(query);

}

// Fallback to home

else {

renderHomePage();

}

}



// --- 7. EVENT LISTENERS ---



// Use Event Delegation for all navigation clicks

document.addEventListener('click', function(e) {

const link = e.target.closest('[data-target]');


if (link) {

e.preventDefault();

const targetId = link.dataset.target;

const title = link.dataset.title || link.querySelector('.card-title')?.textContent || link.title || link.textContent.trim();

navigate(targetId, title);

}

});



// SEARCH BAR (FUNCTIONAL)

document.getElementById("finder-search").addEventListener("submit", function(event) {

event.preventDefault();

const query = document.getElementById("finder-input").value.trim();

if (query) {

navigate(`search-${query}`, `Search: ${query}`);

document.getElementById("finder-input").value = ''; // Clear search bar

}

});



// --- 8. DARK MODE TOGGLE ---

const toggleButton = document.getElementById("dark-mode-toggle");

(function applySavedTheme() {

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') document.body.dataset.theme = 'dark';

})();

toggleButton.addEventListener("click", () => {

let currentTheme = document.body.dataset.theme;

if (currentTheme === 'dark') {

document.body.removeAttribute('data-theme');

localStorage.setItem('theme', 'light');

} else {

document.body.dataset.theme = 'dark';

localStorage.setItem('theme', 'dark');

}

});



// --- 9. INITIAL PAGE LOAD ---

navigate('home', 'Home');



});