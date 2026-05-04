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
let addIngredientNameInput = document.getElementById("add-ingredient-name-input");
let deleteIngredientNameInput = document.getElementById("delete-ingredient-name-input");

let addIngredientSubmitButton = document.getElementById("add-ingredient-submit-button");
let deleteIngredientSubmitButton = document.getElementById("delete-ingredient-submit-button");

let ingredientList = document.getElementById("ingredient-list");

/* 
 * TODO: Attach 'onclick' events to:
 * - "add-ingredient-submit-button" → addIngredient()
 * - "delete-ingredient-submit-button" → deleteIngredient()
 */
addIngredientSubmitButton.addEventListener("click", addIngredient);
deleteIngredientSubmitButton.addEventListener("click", deleteIngredient);

/*
 * TODO: Create an array to keep track of ingredients
 */
let ingredients = [];

/* 
 * TODO: On page load, call getIngredients()
 */
window.onload = function(){getIngredients;};


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
    let ingredientInput = addIngredientNameInput.value.trim();

    try{

        if(ingredientInput){
            const requestBody = {name: ingredientInput};

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

            await fetch(`${BASE_URL}/ingredients`, requestOptions);
            getIngredients;
    
        }
        else{
            console.error(`Input is empty`);
        }
    }catch(error){
        console.error(`Error: `, error);
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
        let request = await fetch(`${BASE_URL}/ingredients`, requestOptions);
        const data = await request.json();

        let arrIndex = 0;

        for(element of data){
            ingredients[arrIndex] = {name: element.name};
            ++arrIndex;
        }

        refreshIngredientList;
    }catch(error){
        console.error(`Error: `, error);
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
    let deleteInput = deleteIngredientNameInput.value.trim();
    

    try{
        if(deleteInput){
            let deleteId = ingredients.findIndex(function(word){return word == deleteInput}) + 1;

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

            await fetch(`${BASE_URL}/{${deleteId}}`, deleteRequestOptions);

            getIngredients;
        }
        else{
            console.error(`Input is empty`);
        }

    }catch(error){
        console.error(`Error: `, error);
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
    ingredientList.innerHTML = "";

    for(element of ingredients){
        let liElement = document.createElement("li");
        liElement.innerText = element;
        ingredientList
    }
}
