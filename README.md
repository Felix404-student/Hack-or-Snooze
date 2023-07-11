# Hack-or-Snooze
"Hack or Snooze" link sharing site based on the public API. Name is a pun on "Hacker News"

<p>In this exercise, you’ll add features to a news-aggregator site
(based loosely on a popular one called Hacker News). It will allow users to
create accounts, log in, create articles, mark articles as favorites, and more!</p>

<p>We’ve already built the backend server API, so you’ll focus on learning
to use an API and building features for the front-end HTML and Javascript.</p>
<div class="section" id="part-0-explore-working-version-and-api">
<h2>Part 0: Explore Working Version and API</h2>
<p>Explore our
<a class="reference external" href="http://hack-or-snooze.surge.sh">live working solution</a>. It will help
you to try how the app works, and what features you’ll build <em>before</em> digging
into the source code.</p>
<div class="admonition note">
<p>Turn on your browser console!</p>
<p class="last">In the browser console, you’ll see a message explaining how the front-end app
can show you useful debugging messages — those will help you get a handle
on how the app works, so do what it says :)</p>
</div>
<p>Once you’ve had a chance to try out the app, you should learn about our API.
The API docs are at <a class="reference external" href="https://hackorsnoozev3.docs.apiary.io/#">quickstart</a>.
Read the first section and try out some API calls in Insomnia or curl.
You don’t need to read and understand <em>everything</em> about the API right now,
but get a sense of the basics before moving on.</p>
</div>
<div class="section" id="part-1-explore-the-starter-code">
<h2>Part 1: Explore the Starter Code</h2>
<p>Download the starter code and start it with <code class="docutils literal notranslate"><span class="pre">python3</span> <span class="pre">-m</span> <span class="pre">http.server</span></code>. You
can then visit the site at <cite>http://localhost:8000/</cite>.</p>
<p>You will see that stories are displayed, and the story links work, but the navigation bar ones do nothing. You will add the functionality to log in and create a user, then later, the features to let users add new
stories, favorite a story, and delete a story.)</p>
<p>Our front-end app consists of two parts:</p>
<ul class="simple">
<li>Classes and methods for the big data ideas: a <cite>Story</cite> class for each story,
a <cite>StoryList</cite> class for the list of stories, and a <cite>User</cite> class for the
logged-in user (if any). These methods also need to handle interacting with the API.</li>
<li>Functions for the UI, handling things like reading form values from forms
and manipulating the DOM.</li>
</ul>
<div class="admonition note">
<p>Separation of Concerns and Organization</p>
<p class="last">We’ve divided the code up into those different parts for readability and
maintenance. It’s often useful to think about the data and the UI separately,
(a <em>separation of concerns</em>). Many apps are written this way.</p>
</div>
<p>There’s one JS file for the “data” layer of the app:</p>
<dl class="docutils">
<dt><cite>js/models.js</cite></dt><dd><p>contains classes to manage the data of the app and the connection to the API.
The name <em>models.js</em> to describe a file containing these kinds of classes
that focus on the data and logic about the data. UI stuff shouldn’t go here.</p>
<p><strong>Read this file thoroughly.</strong></p>
</dd>
</dl>
<p>For the UI layer, we’ve broken this into several files by topic:</p>
<dl class="docutils">
<dt><cite>js/main.js</cite></dt><dd>contains code for starting the UI of the application, and other miscellaneous
things.</dd>
<dt><cite>js/user.js</cite></dt><dd>contains code for UI about logging in/signing up/logging out, as well as
code about remembering a user when they refresh the page and logging them
in automatically.</dd>
<dt><cite>js/stories.js</cite></dt><dd>contains code for UI about listing stories.</dd>
<dt><cite>js/nav.js</cite></dt><dd>contains code to show/hide things in the navigation bar, and well as code
for when a user clicks in that bar.</dd>
</dl>
<div class="section" id="preparing-to-read-the-code">
<h3>Preparing to Read the Code</h3>
<p>When meeting a new codebase, be thoughtful about <em>how</em> to read the code. It’s
usually <em>not</em> helpful to just read everything in detail, top to bottom. You
won’t remember it all, and it won’t help you understand what the pieces are
and how they fit together.</p>
<p>Instead, in the beginning, think about <em>skimming</em> the codebase first to just
see what the classes and functions are. Look at which functions call other
functions. Read the documentation comments before a function or class to get
an idea of what it should do and return.</p>
<p>It can be very helpful to make a pen-and-paper drawing of the names of the
important functions and how the call the other functions.</p>
<a class="image-border reference internal image-reference" href="_images/design.svg"><img alt="_images/design.svg" class="image-border" src="_images/design.svg" width="100%" /></a>
</div>
</div>
<div class="section" id="part-2-creating-new-stories">
<h2>Part 2: Creating New Stories</h2>
<p>In this part, you’ll design and write the functionality to let logged-in users
add new stories. We’ve broken this task into two parts. It will help you
to tackle them in this order.</p>
<div class="section" id="subpart-2a-sending-story-data-to-the-backend-api">
<h3>Subpart 2A: Sending Story Data to the Backend API</h3>
<p>Here, you’ll need to write a method that adds a new story by sending
the right data to our API.</p>
<p>We’ve given you a comment string and a stub method for this, <cite>addStory</cite>, in
the <cite>StoryList</cite> class. Complete this function, making sure your function takes
in the same parameters and returns the same result as our comment said.</p>
<p>Test that this works, and that your method returns an instance of <cite>Story</cite>.
You can do this in the browser console with:</p>
<div class="highlight-js notranslate"><div class="highlight"><pre><span></span><span class="kd">let</span> <span class="nx">newStory</span> <span class="o">=</span> <span class="k">await</span> <span class="nx">storyList</span><span class="p">.</span><span class="nx">addStory</span><span class="p">(</span><span class="nx">currentUser</span><span class="p">,</span>
  <span class="p">{</span><span class="nx">title</span><span class="o">:</span> <span class="s2">&quot;Test&quot;</span><span class="p">,</span> <span class="nx">author</span><span class="o">:</span> <span class="s2">&quot;Me&quot;</span><span class="p">,</span> <span class="nx">url</span><span class="o">:</span> <span class="s2">&quot;http://meow.com&quot;</span><span class="p">});</span>
</pre></div>
</div>
<p>And make sure that returns an instance of the <cite>Story</cite> class:</p>
<div class="highlight-js notranslate"><div class="highlight"><pre><span></span><span class="nx">newStory</span> <span class="k">instanceof</span> <span class="nx">Story</span><span class="p">;</span>      <span class="c1">// should be true!</span>
</pre></div>
</div>
</div>
<div class="section" id="subpart-2b-building-the-ui-for-new-story-form-add-new-story">
<h3>Subpart 2B: Building The UI for New Story Form/Add New Story</h3>
<p>Now, we’ll add the UI for the story-adding feature:</p>
<ul class="simple">
<li>Add a form in the HTML for the story. This should initially be hidden.</li>
<li>Add a link in the navbar with the text of “submit”.</li>
<li>Write a function in <cite>nav.js</cite> that is called when users click that navbar
link. Look at the other function names in that file that do similar things
and pick something descriptive and similar.</li>
<li>Write a function in <cite>stories.js</cite> that is called when users submit the form.
Pick a good name for it. This function should get the data from the form,
call the <cite>.addStory</cite> method you wrote, and then put that new story on the
page.</li>
</ul>
</div>
</div>
<div class="section" id="part-3-favorite-stories">
<h2>Part 3: Favorite stories</h2>
<p>In this step, you’ll add a feature marking/unmarking a story as a favorite.</p>
<p>As before, it’s best to write the data-logic and API-call part first, and do
the UI afterwards.</p>
<div class="section" id="subpart-3a-data-api-changes">
<h3>Subpart 3A: Data/API Changes</h3>
<p>Allow logged in users to “favorite” and “un-favorite” a story. These stories
should remain favorited when the page refreshes.</p>
<p>Allow logged in users to see a separate list of favorited stories.</p>
<p><strong>The methods for adding and removing favorite status on a story should be
defined in the User class.</strong></p>
</div>
</div>
<div class="section" id="part-4-removing-stories">
<h2>Part 4: Removing Stories</h2>
<p>Allow logged in users to remove a story. Once a story has been deleted, remove
it from the DOM and let the API know its been deleted.</p>
</div>
<div class="section" id="further-study">
<h2>Further Study</h2>
<ul class="simple">
<li>Add some error handling for when a username has already been taken or if
credentials are incorrect!</li>
<li>Allow users to edit stories they have created.</li>
<li>Add a section for a “user profile” where a user can change their <cite>name</cite> and
<cite>password</cite> in their profile.</li>
<li>Style the application so that it is presentable on mobile devices.</li>
<li>Add infinite scroll!  When a user scrolls to the bottom of the page, load more
stories.</li>
