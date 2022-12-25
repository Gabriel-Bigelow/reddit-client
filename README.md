# Lurker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To see a live deploy of this project, visit [Lurker](https://reddit-lurker.netlify.app/).

Lurker is a multi-page application, built with the React library.



## Purpose 

Lurker is Reddit clone built with React/Redux that forgoes all the unneccessary elements of the main Reddit site that a "lurker" would not need. By narrowing down the displayed content to only posts, upvotes, comments, and a subreddit list, the user has a much more streamlined and content-focused experience with Reddit. Users can still browse Reddit in the exact same way that they normally would, sans advertisements and all the buttons and features that the majority of users rarely access, such as posting, commenting, account settings, etc..

## Features

### Custom Theming

* Custom scrollbars and logo

### Navbar

* Clickable home button (Lurker logo) to return the front page of reddit.
* Night Mode button
* Searchbar
* Minimizes to the top when not hovered over, or at the top of the page.

### Night Mode

* Night Mode (dark theme) toggle is built into the navigation bar for late-night browsing.

### Search

* The search function can be used to find posts.

### Feed

* Loads to a default feed with 5 posts from the front page of Reddit.
* Procedural fetching - When a user scrolls down and reaches the third post in the most recently loaded batch of posts, 5 more posts are fetched and added to the feed.
* All posts are preloaded with top comments and rendered along with the post.
* Navigating to different areas of the site is much more seamless, with the current page not changing to the next page until the next page is loaded.
* Subreddits can be accessed directly from a post, without the need to load another page.

### Subreddits Bar

* Contains links to the top 25 most subscribed-to Subreddits.
* Minimizes to the side when not hovered.

### Posts
<ul><li>By default, each post displays
        <ul>
            <li>Subreddit (containing link to specified subreddit)</li>
            <li>Author</li>
            <li>Time since post<ul>
                    <li>in seconds if less than 1 minute</li>
                    <li>in minutes if less than 1 hour</li>
                    <li>in hours if less than 1 day</li>
                    <li>in days if less than 1 week</li>
                    <li>in weeks if less than 1 month</li>
                    <li>in months if less than 1 year</li>
                </ul>
            </li>
            <li>Title</li>
            <li>Post content</li>
            <li>Post score<ul>
                    <li>divided by 1000 and rounded to the nearest hundred if more than 999.</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

* Image posts can be enlarged without navigating to a new page.
* Image gallery posts can be accessed without navigating to a new page.
* All video posts can be accessed without navigating to a new page.
* Hyperlink posts access the website directly from the post container, given abiding XSS permissions.
* Comments
* Number of comments
* Hovered post's background will be darkened for increased contrast and readability.

### Comments

<ul><li>Each comment displays (by default)
        <ul>
            <li>Author</li>
            <li>Time since comment<ul>
                    <li>in seconds if less than 1 minute</li>
                    <li>in minutes if less than 1 hour</li>
                    <li>in hours if less than 1 day</li>
                    <li>in days if less than 1 week</li>
                    <li>in weeks if less than 1 month</li>
                    <li>in months if less than 1 year</li>
                </ul>
            </li>
            <li>Comment content</li>
            <li>Comment score<ul>
                    <li>divided by 1000 and rounded to the nearest hundred if more than 999.</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

* Text posts show up to 3 top comments by default, to increase the content of a text post (such as an AskReddit thread), without the need for user interaction.
* Clicking the comments button will show 3 additional parent comments, until all parent comments are loaded.
* Clicking the "^" arrow above the comments button will hide all comments.
* Hovered comment's background will be darkened for increased contrast and readability

## App Architecture

### Getting Data

This app uses the [Reddit JSON API](https://github.com/reddit-archive/reddit/wiki/JSON) to fetch data from Reddit.

Based on user interactions, different requests are sent via JavaScript's fetch API.

Data is stored in different slices of state, which are held in the React/Redux Store. This state is managed with the Redux Toolkit.

### Fetching posts

`https://www.reddit.com/.json?limit=5`
* On initial load, a request is sent to `https://www.reddit.com/.json` with a query parameter `?` of `limit=5`. The returned response object is parsed to JSON and used to populate the `Feed` slice with posts.

<br>

`https://www.reddit.com/.json?limit=5&after=${postId}`
* When scrolled to the 3rd to last post loaded, a request is sent to `https://www.reddit.com/.json` with query parameters `?` of `limit=5&after=${ID of the last post loaded in the feed slice}`. The returned response object is parsed to JSON and used to add the additional posts to the `Feed` slice.

<br>


### Fetching posts from a specific subreddit

`https://www.reddit.com/${subreddit}/.json?limit=5`
* When a user selects a subreddit, a request is made to `https://www.reddit.com/${subreddit}/.json`, with the specified subreddit being part of the path of the request, and a query parameter `?` of `limit=5`.

<br>

`https://www.reddit.com/${subreddit}/.json?after=${ID of the last post loaded on the feed slice}&limit=5`
* When scrolled to the 3rd to last post loaded, a request is sent to `https://www.reddit.com/${subreddit}/.json`, with the specified subreddit being part of the path of the request, and a query parameter `?` of `after=${ID of the last post loaded on the feed slice}&limit=5`. The returned response object is parsed to JSON and used to add the additional posts to the Feed slice.
<br>


### Searching for posts (searchbar)

`https://www.reddit.com/search/.json?q=${searchTerm}&limit=5`
* On submission of the search term from the search bar, a request is sent to `https://www.reddit.com/search/.json` with a query parameter `?` of `q=${searchTerm}&limit=5`. The returned response object is parsed to JSON and used to populate the `Feed` slice with posts.

<br>

`https://www.reddit.com/search/.json?q=${searchTerm}&limit=5&after=${ID of the last post loaded in the feed slice}`
* When scrolled to the 3rd to last post loaded, a request is sent to `https://www.reddit.com/search/.json` with query parameters `?` of `q=${searchTerm}&limit=5&after=${ID of the last post loaded in the feed slice}`. The returned response object is parsed to JSON and used to add the additional posts to the `Feed` slice.

<br>


### Fetching comments
* Up to 10 comments are preloaded for all text-based posts.

<br>

`https://www.reddit.com/${permalink}/.json?limit=10`
* During a fetch request for posts, when the returned object's post data object contains a "type" property of "link", "self", or no defined "type" property, a request is made for comments at `https://www.reddit.com/` with the post's permalink property as the rest of the path, with a query parameter `?` of `limit=10`. The returned object contains an array of comment objects containing information about the comment, which is then added to the `Articles` slice. When the articles are rendered on the feed, if the section of the `Articles` slice that matches the post's ID has an array of comments, those comments are rendered along with the post, as well as the total number of comments in the post.

<br>

`https://www.reddit.com/${permalink}/.json`
* When a user clicks on the comments button on a post, if the "allCommentsLoaded" property on that section of the `Articles` slice is false, a request is made for comments at `https://www.reddit.com/` with the post's permalink property as the rest of the path, with no query parameters, and all comments are fetched and added to that section of the `Articles` slice, allCommentsLoaded is marked as true, and the total number of comments in the post is rendered in the button.

<br>


* The number of comments displayed is increased by 3 every time the comments button is clicked, until all comments are shown.

* Fetch requests will not be repeated for comments of a specific article after the allCommentsLoaded property is marked as true, since all comments are already fetched.

## Technologies

### Languages
<ul> 
    <li>JavaScript (ES6)
        <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Redux</li>
        </ul>
    </li>
    <li>HTML</li>
    <li>CSS</li>
</ul>

### Testing
* Chrome Dev Tools
* Lighthouse

### Version Control
* Git
* GitHub

### Hosting & CI/CD
* GitHub
* Netlify

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Testing

This project was tested manually with Chrome Dev tools on Windows 10.

Lighthouse test scores as of December 23, 2022:
<ul>
    <li> Desktop 
        <ul>
            <li>Performance: 89</li>
            <li>Accessibility: 97</li>
            <li>Best Practices: 92</li>
            <li>SEO: 100</li>
        </ul>
    <li>Mobile
        <ul>
            <li>Performance: 79</li>
            <li>Accessibility: 96</li>
            <li>Best Practices: 92</li>
            <li>SEO: 100</li>
        </ul>
    </li>
</ul>
Disclaimer: Lighthouse scores are subject to change, as page load times are dependent on different types of media being loaded.

## Future Improvements

* Automated testing

* OAuth2 integration, allowing users to log in and access their own personalized versions of Reddit, and interact with posts and comments in ways such as upvoting/downvoting, as well as subscribing to Subreddits.

## Contribute

If you would like to improve this project, you may submit a pull request here.

If you would like to connect with me you can reach me at:

Email: gabrielbigelow.code@gmail.com

LinkedIn: https://www.linkedin.com/in/gabriel-bigelow-b37b24232/

## References

https://reactjs.org/

https://redux.js.org/

https://github.com/reddit-archive/reddit/wiki/JSON