/**
 * This script defines the registration functionality for the Registration page in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

/* 
 * TODO: Get references to various DOM elements
 * - usernameInput, emailInput, passwordInput, repeatPasswordInput, registerButton
 */
let username = document.getElementById("username-input");
let email = document.getElementById("email-input");
let password = document.getElementById("password-input");
let repeatedPassword = document.getElementById("repeat-password-input");
let register = document.getElementById("register-button");

/* 
 * TODO: Ensure the register button calls processRegistration when clicked
 */
register.addEventListener("click", processRegistration);

/**
 * TODO: Process Registration Function
 * 
 * Requirements:
 * - Retrieve username, email, password, and repeat password from input fields
 * - Validate all fields are filled
 * - Check that password and repeat password match
 * - Create a request body with username, email, and password
 * - Define requestOptions using method POST and proper headers
 * 
 * Fetch Logic:
 * - Send POST request to `${BASE_URL}/register`
 * - If status is 201:
 *      - Redirect user to login page
 * - If status is 409:
 *      - Alert that user/email already exists
 * - Otherwise:
 *      - Alert generic registration error
 * 
 * Error Handling:
 * - Wrap in try/catch
 * - Log error and alert user
 */
async function processRegistration() {
    // Implement registration logic here
    try{
        if(!username.value || !email.value || !password.value || !repeatedPassword.value){
            throw new Error(`Field(s) are empty.`);
        }
        if(password.value != repeatedPassword.value){
            throw new Error(`Passwords must match.`);
        }

        const registerBody = {username: username.value, email: email.value, password: password.value};

        const response = await fetch(`${BASE_URL}/register`, requestOptions);

        if(response.statusText == "Created"){
            const data = await response.json();
            console.log(`Fetched data: `, data);

            window.location.href = "login-page.html";
        }
        else if(response.statusText == "Conflict"){
            console.error(`User/email already exisit`, response.status, response.statusText);
        }
        else{
            console.error(`Error with registration: `, response.status, response.statusText);
        }


    } catch(error){
        console.error(`Error: `, error);
    }
    // Example placeholder:
    // const registerBody = { username, email, password };
const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(registerBody)
    };
    // await fetch(...)
}

