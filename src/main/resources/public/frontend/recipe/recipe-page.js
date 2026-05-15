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

   let recipeList = document.getElementById("recipe-list");

   let logoutButton = document.getElementById("logout-button");
   let searchButton = document.getElementById("search-button");
   let addRecipeButton = document.getElementById("add-recipe-submit-input");
   let updateRecipeButton = document.getElementById("update-recipe-submit-input");
   let deleteRecipeButton = document.getElementById("delete-recipe-submit-input");

   let searchInput = document.getElementById("search-input");
   let addRecipeInput = document.getElementById("add-recipe-name-input");
   let updateRecipeInput = document.getElementById("update-recipe-name-input");
   let deleteRecipeInput = document.getElementById("delete-recipe-name-input");

   let addInstructionInput = document.getElementById("add-recipe-instructions-input");
   let updateInstructionInput = document.getElementById("update-recipe-instructions-input");


   /*let hiddenLogout = logoutButton.getAttribute("hidden");
   let hiddenAdminLink = adminLink.getAttribute("hidden");*/

    /*
     * TODO: Show logout button if auth-token exists in sessionStorage
     */
    if(sessionStorage.getItem("auth-token")){
        logoutButton.removeAttribute("hidden");    
    }

    /*
     * TODO: Show admin link if is-admin flag in sessionStorage is "true"
     */
    if(sessionStorage.getItem("is-admin")){
        adminLink.removeAttribute("hidden");
    }

    
});
