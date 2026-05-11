/**
 * This script handles the login functionality for the Recipe Management Application.
 * It manages user authentication by sending login requests to the server and handling responses.
 */
const BASE_URL = "http://localhost:8081"; // backend URL

/*
 * TODO: Get references to DOM elements
 * - username input
 * - password input
 * - login button
 * - logout button (optional, for token testing)
 */
let usernameInput = document.getElementById("login-input");
let passwordInput = document.getElementById("password-input");
let loginButton = document.getElementById("login-button");

/*
 * TODO: Add click event listener to login button
 * - Call processLogin on click
 */
loginButton.addEventListener("click", processLogin);

/**
 * TODO: Process Login Function
 *
 * Requirements:
 * - Retrieve values from username and password input fields
 * - Construct a request body with { username, password }
 * - Configure request options for fetch (POST, JSON headers)
 * - Send request to /login endpoint
 * - Handle responses:
 *    - If 200: extract token and isAdmin from response text
 *      - Store both in sessionStorage
 *      - Redirect to recipe-page.html
 *    - If 401: alert user about incorrect login
 *    - For others: show generic alert
 * - Add try/catch to handle fetch/network errors
 *
 * Hints:
 * - Use fetch with POST method and JSON body
 * - Use sessionStorage.setItem("key", value) to store auth token and admin flag
 * - Use `window.location.href` for redirection
 */
async function processLogin() {
  // TODO: Retrieve username and password from input fields
  // - Trim input and validate that neither is empty
  let username = usernameInput.value.trim();
  let password = passwordInput.value.trim();

  // TODO: Create a requestBody object with username and password
  const requestBody = { username: username, password: password };

  const requestOptions = {
    method: "POST",
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
    body: JSON.stringify(requestBody),
  };

  //   try {
  //     // TODO: Send POST request to http://localhost:8081/login using fetch with requestOptions
  //     let request = await fetch(`${BASE_URL}/login`, requestOptions);

  //     // TODO: If response status is 200
  //     // - Read the response as text
  //     // - Response will be a space-separated string: "token123 true"
  //     // - Split the string into token and isAdmin flag
  //     // - Store both in sessionStorage using sessionStorage.setItem()
  //     if (request.status == 200) {
  //       const data = await request.text();
  //       console.log(`Fetched data`, data);

  //       const [token, adminFlag] = data.split(" ");

  //       sessionStorage.setItem("auth-token", token);
  //       sessionStorage.setItem("is-admin", adminFlag);

  //       setTimeout(() => {
  //         window.location.href = "../recipe/recipe-page.html";
  //       }, 500);
  //     } else if (request.status == 401) {
  //       console.error(`Incoreect login: `, request.status, request.statusText);
  //       throw new Error("Incorrect username or password");
  //     } else {
  //       console.error(`Unknown issue: `, request.status, request.statusText);
  //       throw new Error("Generic error message");
  //     }

  //     // TODO: Optionally show the logout button if applicable

  //     // TODO: Add a small delay (e.g., 500ms) using setTimeout before redirecting
  //     // - Use window.location.href to redirect to the recipe page

  //     // TODO: If response status is 401
  //     // - Alert the user with "Incorrect login!"

  //     // TODO: For any other status code
  //     // - Alert the user with a generic error like "Unknown issue!"
  //   } catch (error) {
  //     // TODO: Handle any network or unexpected errors
  //     // - Log the error and alert the user
  //     console.error(`Error: `, error);
  //   }
  try {
    // TODO: Send POST request to http://localhost:8081/login using fetch with requestOptions
    fetch(`${BASE_URL}/login`, requestOptions).then(async (response) => {
      if (response.ok) {
        let responseText = await response.text();
        const textArray = responseText.split(" ");
        sessionStorage.setItem("auth-token", textArray[0]);
        sessionStorage.setItem("is-admin", textArray[1] == "true");
        setTimeout(() => {
          window.location.href = "../recipe/recipe-page.html";
        }, 500);
        //window.location.href = "../recipe/recipe-page.html"
      } else if (response.status == 401) {
        window.alert("Incorrect login!");
      } else {
        window.alert("Unknown issue!");
      }
    });
  } catch (error) {
    // TODO: Handle any network or unexpected errors
    // - Log the error and alert the user
    alert("Unknown Error");
  }
}
