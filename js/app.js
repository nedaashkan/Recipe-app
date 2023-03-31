let form = document.querySelector("#search-form");
let mealsBoxEl = document.getElementById("meals-box");
let favMealsBox = document.querySelector(".fav-meals");
let favMealsBoxEl = document.getElementById("fav-meals-box");

let UrlRandomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
axios.get(UrlRandomMeal).then(getMealRecipe);

let favMealData = [];
let favMeal = {};
let purpleHeart = false;

form.addEventListener("submit", searchButton);
function searchButton(event) {
  event.preventDefault();
  let input = document.querySelector("#input-el");
  let inputValue = input.value;
  let mealName = inputValue.toLowerCase().trim();
  let msg = document.getElementById("msg");
  if (mealName === "") {
    console.log(mealName);
    msg.textContent = "value not valid";
  } else {
    msg.textContent = "";
    let UrlGetMealByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    axios.get(UrlGetMealByName).then(getMealRecipe);
    console.log(mealName);
  }
}

function getMealRecipe(response) {
  let randomMealResponse = response.data.meals[0];
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (randomMealResponse[`strIngredient${i}`]) {
      ingredients.push(
        `${randomMealResponse[`strIngredient${i}`]} - ${
          randomMealResponse[`strMeasure${i}`]
        }`
      );
    } else {
      break;
    }
  }

  favMeal["name"] = randomMealResponse.strMeal;
  favMeal["img"] = randomMealResponse.strMealThumb;
  favMeal["id"] = randomMealResponse.idMeal;
  favMeal["instruction"] = randomMealResponse.strInstructions;
  favMeal["ingredientText"] = ingredients;
  favMeal["youtube"] = randomMealResponse.strYoutube;
  mealsBoxEl.innerHTML = `


        <div class="meal">
          <div class="meal-header">
            <span class="random"> random Recipe </span>
            <img
              class="card-img"
              onclick="viewMeal(this)"
              src="${randomMealResponse.strMealThumb}"
              alt="${randomMealResponse.strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>${randomMealResponse.strMeal}</h4>
            <button class="fv-btn">
              <i
                class="fa-solid fa-heart"
                id="heart-icon"
                onclick="favClick(this)"
              ></i>
            </button>
          </div>
          <div class="popup-container hidden" id="meal-popup">
            <div class="popup">
              <div class="meal-info" id="meal-info">
                <button
                  id="close-popup"
                  class="close-popup"
                  onclick="closeMeal()"
                >
                  <i class="fas fa-times"></i>
                </button>
                <h3 id="mealname" class="meal-name">
                  ${randomMealResponse.strMeal}
                </h3>

                <div class="img-box">
                  <img
                    src="${randomMealResponse.strMealThumb}"
                    alt="${randomMealResponse.strMeal}"
                    id="popup-img"
                  />
                </div>

                <div class="ingredients-box">
                  <h2>Ingredients</h2>
                  <ul id="ingredients-el">
                    ${ingredients
                      .map(
                        (ingredient) => `
                    <li>${ingredient}</li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>

                <div class="instructions-box">
                  <h2>instructions</h2>
                  <p id="instructions-el">
                    ${randomMealResponse.strInstructions}
                  </p>
                </div>

                <div class="video-box">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/${randomMealResponse.strYoutube.slice(
                      -11
                    )}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
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
    setTimeout(() => {
      location.reload();
    }, 500);
    createFevMeal();
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
            <button class="clear" onclick="deleteFavMeal(this);createFevMeal()"><i class="fas fa-window-close"></i></button>
          </li>

  
  `);
  });
}

function viewFavMeal(e) {
  let index = e.parentElement.id;
  favMealsBoxËl.innerHTML = `
          <div class="popup-container hidden" id="fav-meal-popup">
            <div class="popup">
              <div class="meal-info" id="meal-info">
                <button
                  id="close-popup"
                  class="close-popup"
                  onclick="closeFavMeal()"
                >
                  <i class="fas fa-times"></i>
                </button>
                <h3 id="mealname" class="meal-name">
                  ${favMealData[index].name}
                </h3>

                <div class="img-box">
                  <img
                    src="${favMealData[index].img}"
                    alt="${favMealData[index].name}"
                    id="popup-img"
                  />
                </div>

                <div class="ingredients-box">
                  <h2>Ingredients</h2>
                  <ul id="ingredients-el">
                    ${favMealData[index].ingredientText
                      .map(
                        (ingredient) => `
                    <li>${ingredient}</li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>

                <div class="instructions-box">
                  <h2>instructions</h2>
                  <p id="instructions-el">
                    ${favMealData[index].instruction}
                  </p>
                </div>

                <div class="video-box">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/${favMealData[
                      index
                    ].youtube.slice(-11)}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

`;
  let favMealPopup = document.getElementById("fav-meal-popup");
  favMealPopup.classList.remove("hidden");
}

function closeFavMeal() {
  let favMealPopup = document.getElementById("fav-meal-popup");
  favMealPopup.classList.add("hidden");
}

(() => {
  favMealData = JSON.parse(localStorage.getItem("data")) || [];
  createFevMeal();
})();
