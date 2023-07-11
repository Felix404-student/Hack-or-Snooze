"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
    hidePageComponents();
    $allStoriesList.show();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
    hidePageComponents();
    $loginForm.show();
    $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
    $(".main-nav-links").show();
    $navLogin.hide();
    $navLogOut.show();
    $navUserProfile.text(`${currentUser.username}`).show();
}

/** Toggle showing/hiding the submit story form */
function navSubmitClick(evt) {
    if ($allStoriesList[0].checkVisibility()) {
        $storyForm.toggle();
    } else {
        hidePageComponents();
        $allStoriesList.show();
        $storyForm.show();
    }
}

$navSubmit.on("click", navSubmitClick);

/** clicking on favorites nav link hides other pages and shows current user's 
 *    favorite list 
 */
function navUserFavoritesClick(evt) {
    hidePageComponents();
    $userFavoritedStoriesList.show();
}

$navUserFavorites.on("click", navUserFavoritesClick);

/** clicking on your stories nav link hides other pages and shows current 
 *    user's posted stories 
 */
function navUserStoriesClick(evt) {
    hidePageComponents();
    $userAddedStoriesList.show();
}

$navUserStories.on("click", navUserStoriesClick);
