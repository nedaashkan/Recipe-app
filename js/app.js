let input = document.querySelector("#input-el");
let form = document.querySelector("#search-form");
let mealsBoxEl = document.getElementById("meals-box");
form.addEventListener("submit", searchButton);
let mealName;
function searchButton(event) {
  event.preventDefault();
  let inputValue = input.value;
  mealName = inputValue.toLowerCase().trim();
  console.log(mealName);
}

let UrlRandomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
axios.get(UrlRandomMeal).then(getRandomMeal);

function getRandomMeal(response) {
  console.log(response.data);
  mealsBoxEl.innerHTML = `<div class="meal">
          <div class="meal-header">
            <span class="random"> random Recipe </span>
            <img
              src="${response.data.meals[0].strMealThumb}"
              alt="${response.data.meals[0].strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>${response.data.meals[0].strMeal}</h4>
            <button class="fv-btn" onclick="favMeal()"><i class="fa-solid fa-heart" id="heart-icon"></i></button>
            <!-- fa-regular -->
          </div>
        </div>
`;
}
// when heart its purple we going to store the mealid in side localStorage
function favMeal() {
  let heartIcon = document.getElementById("heart-icon");
  heartIcon.classList.toggle("active");
}

// let UrlGetMealById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
// axios.get(UrlGetMealById).then(getMealById);

// function getMealById(response) {
//   console.log(response.data);
// }

// let UrlGetMealByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
// axios.get(UrlGetMealByName).then(mealByName);
// function mealByName(response) {
//   console.log(response.data);
// }
