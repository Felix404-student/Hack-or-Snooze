"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
    storyList = await StoryList.getStories();
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
    const hostName = story.getHostName();
    return $(`
      <li id="${story.storyId}">
        <span class="favorite-star">☆</span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <span class="delete-button"> ⓧ </span>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Gets user input, send it to the server, then adds that story to the page. */
async function addNewStoryToPage(evt) {
  evt.preventDefault();

  if (!$storyForm[0].reportValidity()) {
    return;
  }

  let inputTitle = $storySubmitTitle.val();
  inputTitle = capitalize(inputTitle);

  let inputURL =  $storySubmitURL.val();
  
  let inputAuthor = $storySubmitAuthor.val();
  inputAuthor = capitalize(inputAuthor);

  // once inputs are validated, clear the form.
  $storySubmitTitle.val('');
  $storySubmitURL.val('');
  $storySubmitAuthor.val('');

  let newStory = await storyList.addStory(currentUser, {
    title: inputTitle,
    author: inputAuthor,
    url: inputURL
  });

  // adding story to page
  storyList.stories.unshift(newStory);
  const $story = generateStoryMarkup(newStory);
  let $yourStory = $story.clone();
  $story[0].children[0].style.display = "inline";
  $allStoriesList.prepend($story);
  $userAddedStoriesList.prepend($yourStory);
}

$storySubmit.on("click", addNewStoryToPage);

/** Capitalizes each word of input text, space delimited */
function capitalize(inputText) {
  let capitalized = inputText.replace(/(^\w{1})|(\s+\w{1})/g, 
    letter => letter.toUpperCase());
  return capitalized;
}

/** On user login, shows the favorite stars */
function addFavoriteStarsToStories(){
  $('.favorite-star').show();
}

/** On user login, shows delete buttons on stories on main page and your stories**/
function showDeleteButtons() {
  $("#user-added-stories-list .delete-button").show();
}

/** Deletes story when you click on the ⓧ */
async function deleteStoryOnClick($evt) {
  let id = $evt.target.parentElement.id;

  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}/stories/${id}`,
    data: { token: currentUser.loginToken },
});

$(`#all-stories-list #${id}`).remove();
$(`#favorited-stories-list #${id}`).remove();
$(`#user-added-stories-list #${id}`).remove();
}

$userAddedStoriesList.on("click", ".delete-button", deleteStoryOnClick);