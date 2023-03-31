let input = document.querySelector("#input-el");
let form = document.querySelector("#search-form");
let mealsBoxEl = document.getElementById("meals-box");
let favMealsBox = document.querySelector(".fav-meals");
form.addEventListener("submit", searchButton);
let mealName;
function searchButton(event) {
  event.preventDefault();
  let inputValue = input.value;
  mealName = inputValue.toLowerCase().trim();
}
let UrlRandomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
axios.get(UrlRandomMeal).then(getRandomMeal);

let favMealData = [];
let favMeal = {};
let purpleHeart = false;

function getRandomMeal(response) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (response.data.meals[0][`strIngredient${i}`]) {
      ingredients.push(
        `${response.data.meals[0][`strIngredient${i}`]} - ${
          response.data.meals[0][`strMeasure${i}`]
        }`
      );
    } else {
      break;
    }
  }

  favMeal["name"] = response.data.meals[0].strMeal;
  favMeal["img"] = response.data.meals[0].strMealThumb;
  favMeal["id"] = response.data.meals[0].idMeal;
  favMeal["instruction"] = response.data.meals[0].strInstructions;
  favMeal["ingredientText"] = ingredients;
  favMeal["youtube"] = response.data.meals[0].strYoutube;
  mealsBoxEl.innerHTML = `
        <div class="meal">
          <div class="meal-header">
            <span class="random"> random Recipe </span>
            <img
              class="card-img"
              onclick="viewMeal()"
              src="${response.data.meals[0].strMealThumb}"
              alt="${response.data.meals[0].strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>${response.data.meals[0].strMeal}</h4>
            <button class="fv-btn">
              <i
                class="fa-solid fa-heart"
                id="heart-icon"
                onclick="favClick(this)"
              ></i>
            </button>
          </div>
        </div>
`;
}

function favClick(e) {
  if (!e.classList.contains("active")) {
    e.classList.add("active");
    purpleHeart = true;
    console.log(" purple heart ", purpleHeart);
    favMealData.push(favMeal);
    localStorage.setItem("data", JSON.stringify(favMealData));
    console.log(favMealData);
    createFevMeal();
    // setTimeout(() => {
    //   location.reload();
    // }, 6000);
  } else {
    e.classList.remove("active");
    purpleHeart = false;
    console.log(" purple heart ", purpleHeart);
    let indexOfMeal = favMealData.indexOf(favMeal);
    favMealData.splice(indexOfMeal, 1);
    console.log(indexOfMeal);
    localStorage.setItem("data", JSON.stringify(favMealData));
  }
}

function viewMeal() {
  let mealPopup = document.getElementById("meal-popup");
  mealPopup.classList.remove("hidden");
}
function closeMeal() {
  let mealPopup = document.getElementById("meal-popup");
  mealPopup.classList.add("hidden");
}

function deleteFavMeal(e) {
  e.parentElement.remove();
  favMealData.splice(e.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(favMealData));
}

function createFevMeal() {
  favMealsBox.innerHTML = "";
  favMealData.map((x, y) => {
    return (favMealsBox.innerHTML += `
  
            <li id=${y}>
            <img
              src="${x.img}"
              alt="${x.name}"
              onclick="viewFavMeal(this)"
            /><span>${x.name.slice(0, 8)}</span>
            <button class="clear" onclick="deleteFavMeal(this)"><i class="fas fa-window-close"></i></button>
          </li>

  
  `);
  });
}

function viewFavMeal(e) {
  viewMeal();
  let index = e.parentElement.id;
  let mealNameEl = document.getElementById("mealname");
  mealNameEl.textContent = favMealData[index].name;
  let popupImgEl = document.getElementById("popup-img");
  popupImgEl.src = favMealData[index].img;
  // let ingredientsEl = document.getElementById("ingredients-el");
  // ingredientsEl.textContent = favMealData[index].ingredientText
  //   .map((ingredient) => ingredient)
  //   .join("");
  let instructionsEl = document.getElementById("instructions-el");
  instructionsEl.textContent = favMealData[index].instruction;
}
// function getMealById(response) {
//   // console.log(response.data.meals[0]);
//   favMealIdData[0]["recipe"] = response.data.meals[0];
//   console.log(favMealIdData);
// }

// // let UrlGetMealByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
// // axios.get(UrlGetMealByName).then(mealByName);
// // function mealByName(response) {
// //   console.log(response.data);
// // }
(() => {
  favMealData = JSON.parse(localStorage.getItem("data")) || [];
  createFevMeal();
})();
