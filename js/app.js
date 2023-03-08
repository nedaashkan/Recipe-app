let input = document.querySelector("#input-el");
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);
let mealId;
let mealName;
function searchButton(event) {
  event.preventDefault();
  let inputValue = input.value;
  mealName = inputValue.toLowerCase().trim();
  console.log(mealName);
}

// let UrlRandomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
// axios.get(UrlRandomMeal).then(getRandomMeal);

// function getRandomMeal(response) {
//   console.log(response.data);
// }

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
