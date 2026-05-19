/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

/*
 * TODO: Get references to various DOM elements
 * - addIngredientNameInput
 * - deleteIngredientNameInput
 * - ingredientListContainer
 * - searchInput (optional for future use)
 * - adminLink (if visible conditionally)
 */
const addIngredientNameInput = document.getElementById(
  "add-ingredient-name-input",
);
const deleteIngredientNameInput = document.getElementById(
  "delete-ingredient-name-input",
);
const ingredientListContainer = document.getElementById("ingredient-list");

/*
 * TODO: Attach 'onclick' events to:
 * - "add-ingredient-submit-button" → addIngredient()
 * - "delete-ingredient-submit-button" → deleteIngredient()
 */
document
  .getElementById("delete-ingredient-submit-button")
  .addEventListener("click", deleteIngredient);
document
  .getElementById("add-ingredient-submit-button")
  .addEventListener("click", addIngredient);

/*
 * TODO: Create an array to keep track of ingredients
 */
let ingredience = [];

/*
 * TODO: On page load, call getIngredients()
 */
window.addEventListener("load", getIngredients);

/**
 * TODO: Add Ingredient Function
 *
 * Requirements:
 * - Read and trim value from addIngredientNameInput
 * - Validate input is not empty
 * - Send POST request to /ingredients
 * - Include Authorization token from sessionStorage
 * - On success: clear input, call getIngredients() and refreshIngredientList()
 * - On failure: alert the user
 */
async function addIngredient() {
  // Implement add ingredient logic here
  const name = addIngredientNameInput.value.trim();

  if (name.length == 0) {
    alert("ERRROR: Name cannot be empty");
    return;
  }

  const requestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      Authorization: "Bearer " + window.sessionStorage.getItem("auth-token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ name: name }),
  };

  try {
    const response = await fetch(`${BASE_URL}/ingredients`, requestOptions);
    if (response.ok) {
      addIngredientNameInput.value = "";
      getIngredients();
    } else {
      alert("Add Ingredient Error");
    }
  } catch (e) {
    alert("Add Ingredient Error");
  }
}

/**
 * TODO: Get Ingredients Function
 *
 * Requirements:
 * - Fetch all ingredients from backend
 * - Store result in `ingredients` array
 * - Call refreshIngredientList() to display them
 * - On error: alert the user
 */
async function getIngredients() {
  // Implement get ingredients logic here
  const requestOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  try {
    const response = await fetch(`${BASE_URL}/ingredients`, requestOptions);
    if (response.ok) {
      ingredience = await response.json();
      refreshIngredientList();
    } else {
      alert("Get Ingredients Error");
    }
  } catch (e) {
    alert("Get Ingredients Error");
  }
}

/**
 * TODO: Delete Ingredient Function
 *
 * Requirements:
 * - Read and trim value from deleteIngredientNameInput
 * - Search ingredientListContainer's <li> elements for matching name
 * - Determine ID based on index (or other backend logic)
 * - Send DELETE request to /ingredients/{id}
 * - On success: call getIngredients() and refreshIngredientList(), clear input
 * - On failure or not found: alert the user
 */
async function deleteIngredient() {
  // Implement delete ingredient logic here
  const name = deleteIngredientNameInput.value.trim();
  let id = -1;
  for (ingredient of ingredience) {
    if (ingredient.name == name) {
      id = ingredient.id;
      break;
    }
  }

  if (id == -1) {
    alert("Invalid ingredient name");
    return;
  }

  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      Authorization: "Bearer " + sessionStorage.getItem("auth-token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  try {
    let response = await fetch(`${BASE_URL}/ingredients/${id}`, requestOptions);
    if (response.ok) {
      getIngredients();
    } else {
      alert("There was an error with this request");
    }
  } catch (e) {
    alert("An error has occured");
  }
}

/**
 * TODO: Refresh Ingredient List Function
 *
 * Requirements:
 * - Clear ingredientListContainer
 * - Loop through `ingredients` array
 * - For each ingredient:
 *   - Create <li> and inner <p> with ingredient name
 *   - Append to container
 */
function refreshIngredientList() {
  // Implement ingredient list rendering logic here
  while (ingredientListContainer.children.length > 0) {
    ingredientListContainer.removeChild(ingredientListContainer.children[0]);
  }

  for (ingredient of ingredience) {
    let newItem = document.createElement("li");
    newItem.textContent = `${ingredient.name}`;
    ingredientListContainer.appendChild(newItem);
  }
}
