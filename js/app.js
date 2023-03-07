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


// async function getRandomMeal() {
//   const resp = await fetch(`www.themealdb.com/api/json/v1/1/random.php`);
//   const randomMeal = await resp.json();
//   console.log(randomMeal);
// }
// getRandomMeal();




// async function getMealById() {
//   const MealById = await fetch(
//     `www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
//   );
// }
// async function getMealsBySearch() {
//   const MealsBySearch = await fetch(
//     `www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
//   );
// }
