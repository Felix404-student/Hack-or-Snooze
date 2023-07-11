"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:
const $body = $("body");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-post-story");
const $navUserFavorites = $('#nav-user-favorites');
const $navUserStories = $('#nav-user-added-stories');

const $storyForm = $("#post-story-form");
const $storySubmit = $("#post-story-button");
const $storySubmitTitle = $('#post-story-title');
const $storySubmitURL = $('#post-story-url');
const $storySubmitAuthor = $('#post-story-author');

const $userFavoritedStoriesList = $('#favorited-stories-list');
const $userAddedStoriesList = $('#user-added-stories-list');

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */
function hidePageComponents() {
    const components = [ $allStoriesList, $loginForm, $signupForm, $storyForm, 
      $userFavoritedStoriesList, $userAddedStoriesList ];
    components.forEach((c) => c.hide());
}

/** Overall function to kick off the app. */
async function start() {
    // "Remember logged-in user" and log in, if credentials in localStorage
    await checkForRememberedUser();
    await getAndShowStoriesOnStart();

    // if we got a logged-in user
    if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app
$(start);
