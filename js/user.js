"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */
async function login(evt) {
  if (!$loginForm[0].reportValidity()) {
    return;
  }

    evt.preventDefault();

    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // clear the form
    $("#login-username").val("");
    $("#login-password").val("");

    // User.login retrieves user info from API and returns User instance
    // which we'll make the globally-available, logged-in user.
    try {
      currentUser = await User.login(username, password);
    } catch (e) {
      alert("Login attempt failed");
    }

    $loginForm.trigger("reset");

    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */
async function signup(evt) {
  if (!$signupForm[0].reportValidity()) {
    return;
  }

    evt.preventDefault();

    const name = $("#signup-name").val();
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();

    // User.signup retrieves user info from API and returns User instance
    // which we'll make the globally-available, logged-in user.
    try {
      currentUser = await User.signup(username, password, name);
    } catch (e) {
      alert("Signup attempt failed");
    }

    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();

    $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

/** Handle click of logout button
 * Remove their credentials from localStorage and refresh page
 */
function logout(evt) {
    localStorage.clear();
    location.reload();
}

$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */
async function checkForRememberedUser() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token || !username) return false;

    // try to log in with these credentials (will be null if login failed)
    currentUser = await User.loginViaStoredCredentials(token, username);
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */
function saveUserCredentialsInLocalStorage() {
    if (currentUser) {
        localStorage.setItem("token", currentUser.loginToken);
        localStorage.setItem("username", currentUser.username);
    }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 * - hide login and signup forms
 * - adds the stars to favorite stories
 * - populates the favorites and your stories pages
 */
function updateUIOnUserLogin() {
    hidePageComponents()
    $allStoriesList.show();
    updateNavOnLogin();
    addFavoriteStarsToStories();
    getUserFavoritesOnLogin();
    getUserStoriesOnLogin();
    showDeleteButtons();
}

/** sends favorite request to API, adds story to the storyList and the DOM*/
async function addStoryToFavorites(storyID) {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}/users/${currentUser.username}/favorites/${storyID}`,
    data: { token: currentUser.loginToken },
  });

  let storyHTML = $('#'+storyID).clone();
  $userFavoritedStoriesList.append(storyHTML);
}

/** sends unfavorite request to API, removes story from the storyList and the DOM */
async function removeStoryFromFavorites(storyID) {
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/users/${currentUser.username}/favorites/${storyID}`,
    data: { token: currentUser.loginToken },
  });

  $('#favorited-stories-list #'+storyID).remove();
}

/** Lets logged in user add and remove a story from their favorites 
 * - checks if this story has already been favorited
 * - calls functions to add or removes story
 * - toggles star accordingly ☆ / ★
*/ 
function favoriteStoryClick(evt) {
 let storyID = evt.target.parentElement.id;

  if (evt.target.innerText === "☆") {
    evt.target.innerText = "★";
    evt.target.style.color = "rgb(236,113,20)";
    addStoryToFavorites(storyID);
  } else {
    evt.target.innerText = "☆";
    evt.target.style.color = "lightgrey";
    removeStoryFromFavorites(storyID);
  }
}

$allStoriesList.on("click", ".favorite-star", favoriteStoryClick);

/** Lets users unfavorite stories from the favorite stories page  */
async function unfavoriteFromFavoritesPage(evt) {
  let storyID = evt.target.parentElement.id;

  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/users/${currentUser.username}/favorites/${storyID}`,
    data: { token: currentUser.loginToken },
  });

  $('#favorited-stories-list #'+storyID).remove();
  $('#'+storyID+' .favorite-star')[0].innerText = "☆";
  $('#'+storyID+' .favorite-star')[0].style.color = "lightgrey";
}

$userFavoritedStoriesList.on("click", ".favorite-star", unfavoriteFromFavoritesPage);

/** when a user logs in, gets their favorites and add them to the DOM 
 * - highlights them on main page as favorites
 * - duplicates the HTML for the favorites page
*/
function getUserFavoritesOnLogin() {
  for (let story of currentUser.favorites) {
    let $storyHTML = $('#all-stories-list #'+story.storyId)
    $storyHTML[0].children[0].innerText = "★";
    $storyHTML[0].children[0].style.color = "rgb(236,113,20)";
    let favStory = $storyHTML.clone();
    $userFavoritedStoriesList.append(favStory);
  }
}

/** When a user logs in, gets the stories they submitted and add them to the DOM 
 * - duplicates the HTML, adds to your stories page
*/
function getUserStoriesOnLogin() {
  for (let story of currentUser.ownStories) {
    let $storyHTML = $('#all-stories-list #'+story.storyId)
    let $addedStory = $storyHTML.clone();
    $addedStory[0].children[0].innerText = "";
    $userAddedStoriesList.prepend($addedStory);
  }
}
