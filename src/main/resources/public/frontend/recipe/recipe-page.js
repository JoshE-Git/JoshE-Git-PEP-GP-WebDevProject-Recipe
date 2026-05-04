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

    /*
     * TODO: Attach event handlers
     * - Add recipe button → addRecipe()
     * - Update recipe button → updateRecipe()
     * - Delete recipe button → deleteRecipe()
     * - Search button → searchRecipes()
     * - Logout button → processLogout()
     */
    searchButton.addEventListener("click", searchRecipes);
    addRecipeButton.addEventListener("click", addRecipe);
    updateRecipeButton.addEventListener("click", updateRecipe);
    deleteRecipeButton.addEventListener("click", deleteRecipe);
    logoutButton.addEventListener("click", processLogout);

    /*
     * TODO: On page load, call getRecipes() to populate the list
     */
    window.onload = function(){getRecipes();};


    /**
     * TODO: Search Recipes Function
     * - Read search term from input field
     * - Send GET request with name query param
     * - Update the recipe list using refreshRecipeList()
     * - Handle fetch errors and alert user
     */
    async function searchRecipes() {
        // Implement search logic here
        let search = searchInput.value;

        const requestBody = {search: search};

        const requestOptions = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(requestBody)
        };

        try{
            let request = await fetch(BASE_URL, requestOptions);
            const data = await request.json();

            recipes = [{name: data.name, recipe: data.instructions}];
            refreshRecipeList;



        }catch(error){
            console.error(`Error: `, error);
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
        let addRecipe = addRecipeInput.value;
        let addInstruction = addInstructionInput.value;

        const requestBody = {name: addRecipe, instructions: addInstruction};

        const requestOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(requestBody)
        };

        try{
            await fetch(`${BASE_URL}/recipes`, requestOptions);
            getRecipes;

        }catch(error){
            console.error(`Error: `, error);
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
        // Implement delete logic here
        let updateInput = updateRecipeInput.value;
        let updateInstruction = updateInstructionInput.value;

        const getRequestBody = {name: updateInput, instruction: updateInstruction};

        const getRequestOptions = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(getRequestBody)
        };

        const updateRequestOptions = {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify("")
        };

        try{
            let getRequest = await fetch(BASE_URL, getRequestOptions);
            const data = await getRequest.json();

            if(data){
               await fetch(`${BASE_URL}/{${data.id}}`, updateRequestOptions);

               getRecipes;
            }
            else{
                console.error(`Unknown issue: `, getRequest.status, getRequest.statusText);
            }

        }catch(error){
            console.error(`Error: `, error);
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
        let deleteInput = deleteRecipeInput.value;

        const getRequestBody = {search: deleteInput};

        const getRequestOptions = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(getRequestBody)
        };

        const deleteRequestOptions = {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify("")
        };

        try{
            let getRequest = await fetch(BASE_URL, getRequestOptions);
            const data = await getRequest.json();

            if(data){
               await fetch(`${BASE_URL}/{${data.id}}`, deleteRequestOptions);

               getRecipes;
            }
            else{
                console.error(`Unknown issue: `, getRequest.status, getRequest.statusText);
            }

        }catch(error){
            console.error(`Error: `, error);
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
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify("")
        };

        try{
            let request = await fetch(BASE_URL, requestOptions);
            const data = await request.json();

            let arrIndex = 0;

            for(element in data){
                recipes[arrIndex] = {name: element.name, recipe: element.instructions};
                ++arrIndex;
            }

            refreshRecipeList;
        }catch(error){
            console.error(`Error: `, error);
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
        recipeList.innerHTML = "";

        recipes.forEach(
            function(name, recipe){
                let liElement = document.createElement("li");
                liElement.innerText = `${name} ${recipe}`;
                recipeList.appendChild(liElement);
            }
        )
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
                "Authorization": "Bearer " + sessionStorage.getItem("auth-token"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify("")
        };

        try{
            await fetch(`${BASE_URL}/logout`, requestOptions);

            sessionStorage.clear();

            setTimeout(() => {
                window.location.href = "login-page.html";
            }, 500);

        }catch(error){
            console.error(`Error: `, error);
        }

    }

});
