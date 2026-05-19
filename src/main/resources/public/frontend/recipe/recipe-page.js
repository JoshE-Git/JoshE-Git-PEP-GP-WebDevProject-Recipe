/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

let recipes = [];

// Wait for DOM to fully load before accessing elements
window.addEventListener("DOMContentLoaded", () => {
  /*
   * TODO: Get references to various DOM elements
   * - Recipe name and instructions fields (add, update, delete)
   * - Recipe list container
   * - Admin link and logout button
   * - Search input
   */
  let adminLink = document.getElementById("admin-link");
  let logoutButton = document.getElementById("logout-button");

  let searchInput = document.getElementById("search-input");
  let searchButton = document.getElementById("search-button");

  let recipeList = document.getElementById("recipe-list");

  let addRecipeNameInput = document.getElementById("add-recipe-name-input");
  let addRecipeInstructionInput = document.getElementById(
    "add-recipe-instructions-input",
  );
  let addRecipeSubmitButton = document.getElementById(
    "add-recipe-submit-input",
  );

  let deleteRecipeNameInput = document.getElementById(
    "delete-recipe-name-input",
  );
  let deleteRecipeSubmitButton = document.getElementById(
    "delete-recipe-submit-input",
  );

  let updateRecipeNameInput = document.getElementById(
    "update-recipe-name-input",
  );
  let updateRecipeInstructionsInput = document.getElementById(
    "update-recipe-instructions-input",
  );
  let updateRecipeSubmitButton = document.getElementById(
    "update-recipe-submit-input",
  );

  /*
   * TODO: Show logout button if auth-token exists in sessionStorage
   */
  if (sessionStorage.getItem("auth-token")) {
    logoutButton.removeAttribute("hidden");
  }

  /*
   * TODO: Show admin link if is-admin flag in sessionStorage is "true"
   */
  if (sessionStorage.getItem("is-admin") == "true") {
    adminLink.removeAttribute("hidden");
  }

  /*
   * TODO: Attach event handlers
   * - Add recipe button → addRecipe()
   * - Update recipe button → updateRecipe()
   * - Delete recipe button → deleteRecipe()
   * - Search button → searchRecipes()
   * - Logout button → processLogout()
   */
  searchButton.addEventListener("click", searchRecipes);
  addRecipeSubmitButton.addEventListener("click", addRecipe);
  deleteRecipeSubmitButton.addEventListener("click", deleteRecipe);
  updateRecipeSubmitButton.addEventListener("click", updateRecipe);
  logoutButton.addEventListener("click", processLogout);

  /*
   * TODO: On page load, call getRecipes() to populate the list
   */
  window.addEventListener("load", getRecipes);
  //getRecipes();

  /**
   * TODO: Search Recipes Function
   * - Read search term from input field
   * - Send GET request with name query param
   * - Update the recipe list using refreshRecipeList()
   * - Handle fetch errors and alert user
   */
  async function searchRecipes() {
    // Implement search logic here
    const name = searchInput.value.trim();
    const requestOptions = {
      method: "GET",
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
    };

    try {
      const response = await fetch(
        `${BASE_URL}/recipes?name=${name}`,
        requestOptions,
      );
      recipes = await response.json();
      refreshRecipeList();
    } catch (e) {
      alert("Error");
    }
  }

  /**
   * TODO: Add Recipe Function
   * - Get values from add form inputs
   * - Validate both name and instructions
   * - Send POST request to /recipes
   * - Use Bearer token from sessionStorage
   * - On success: clear inputs, fetch latest recipes, refresh the list
   */
  async function addRecipe() {
    // Implement add logic here
    const name = addRecipeNameInput.value.trim();
    const instructions = addRecipeInstructionInput.value.trim();

    if (name.length == 0) {
      alert("Error: Must input name");
      return;
    } else if (instructions.length == 0) {
      alert("Error: Must input instructions");
      return;
    }

    const requestBody = {
      name: name,
      instructions: instructions,
    };

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
      body: JSON.stringify(requestBody),
    };

    try {
      let response = await fetch(`${BASE_URL}/recipes`, requestOptions);
      if (response.ok) {
        addRecipeNameInput.value = "";
        addRecipeInstructionInput.value = "";
        getRecipes();
      } else {
        alert("Add Recipe Error: Could not add recipe");
      }
    } catch (e) {
      alert("Error sending request");
    }
  }

  /**
   * TODO: Update Recipe Function
   * - Get values from update form inputs
   * - Validate both name and updated instructions
   * - Fetch current recipes to locate the recipe by name
   * - Send PUT request to update it by ID
   * - On success: clear inputs, fetch latest recipes, refresh the list
   */
  async function updateRecipe() {
    // Implement update logic here

    const name = updateRecipeNameInput.value.trim();
    const instructions = updateRecipeInstructionsInput.value.trim();

    if (name.length == 0) {
      alert("Error: Must input name");
      return;
    } else if (instructions.length == 0) {
      alert("Error: Must input instructions");
      return;
    }

    foundRecipe = -1;
    for (i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.name == name) {
        foundRecipe = recipe.id;
        break;
      }
    }

    if (foundRecipe == -1) {
      alert("Invalid name");
      return;
    }

    const requestBody = {
      name: updateRecipeNameInput.value,
      instructions: updateRecipeInstructionsInput.value,
    };

    const requestOptions = {
      method: "PUT",
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
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/recipes/${foundRecipe}`,
        requestOptions,
      );
      if (response.ok) {
        updateRecipeNameInput.value = "";
        updateRecipeInstructionsInput.value = "";
        getRecipes();
      } else {
        alert("Unknown error");
      }
    } catch (e) {
      alert("Unknown error");
    }
  }

  /**
   * TODO: Delete Recipe Function
   * - Get recipe name from delete input
   * - Find matching recipe in list to get its ID
   * - Send DELETE request using recipe ID
   * - On success: refresh the list
   */
  async function deleteRecipe() {
    // Implement delete logic here
    let name = deleteRecipeNameInput.value.trim();
    let foundRecipe = -1;
    for (i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.name == name) {
        foundRecipe = recipe.id;
        break;
      }
    }

    if (foundRecipe != -1) {
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
        let response = await fetch(
          `${BASE_URL}/recipes/${foundRecipe}`,
          requestOptions,
        );
        if (response.ok) {
          getRecipes();
        } else {
          alert("Invalid delete request");
        }
      } catch (e) {
        alert("Unknown error");
      }
    } else {
      alert("Invalid name");
    }
  }

  /**
   * TODO: Get Recipes Function
   * - Fetch all recipes from backend
   * - Store in recipes array
   * - Call refreshRecipeList() to display
   */
  async function getRecipes() {
    // Implement get logic here

    const requestOptions = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        //"Authorization": "Bearer " + sessionStorage.getItem("auth-token")
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    try {
      const response = await fetch(BASE_URL + "/recipes", requestOptions);
      if (response.ok) {
        recipes = await response.json();
        refreshRecipeList();
      } else {
        alert("Error in getting recipes");
      }
    } catch (e) {
      alert("Error in getting recipes");
    }
  }

  /**
   * TODO: Refresh Recipe List Function
   * - Clear current list in DOM
   * - Create <li> elements for each recipe with name + instructions
   * - Append to list container
   */
  function refreshRecipeList() {
    // Implement refresh logic here
    while (recipeList.children.length > 0) {
      recipeList.removeChild(recipeList.children[0]);
    }

    for (recipe of recipes) {
      let newItem = document.createElement("li");
      newItem.textContent = `${recipe.name}: ${recipe.instructions}`;
      recipeList.appendChild(newItem);
    }
  }

  /**
   * TODO: Logout Function
   * - Send POST request to /logout
   * - Use Bearer token from sessionStorage
   * - On success: clear sessionStorage and redirect to login
   * - On failure: alert the user
   */
  async function processLogout() {
    // Implement logout logic here
    const requestOptions = {
      method: "POST",
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
      const response = await fetch(BASE_URL + "/logout", requestOptions);
      if (response.ok) {
        sessionStorage.clear();
        window.location.href = "../login/login-page.html";
      } else {
        alert("Logout Error: Could not process request");
      }
    } catch (e) {
      alert("Logout Error: Could not send request");
    }
  }
});