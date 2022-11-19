const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//get meal list that matches with ingredients
function getMealList(){
    let searchInputTxt = document.getElementById("search-input").value.trim();
    //console.log(searchInputTxt.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json()).then(data=>{
        //console.log(data);
        let html ="";
        if(data.meals){
            data.meals.forEach(meal => {
                html+=  `<div class="meal-item" data-id = "${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Check the recipe</a>
                            </div>
                        </div>`;
            });
            mealList.classList.remove('notfound');
        }
        else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notfound');
        }
        mealList.innerHTML = html;
    });
}

//get recipe of the meal searched
function getMealRecipe(e){
    e.preventDefault();
    //console.log(e.target);
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        //console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response => response.json()).then(data => mealRecipeModal(data.meals)); 
    }
}

//create modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `<div class="col">
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <div class="meal-item-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <p class="category">${meal.strCategory}</p>

                    <div class="link">
                        <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                    </div>
                </div>
                <div class="col">
                    <div class="tofollow">
                        <h3>Instructions</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                </div>`;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}