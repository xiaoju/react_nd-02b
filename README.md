# Readable
Readable is a message board webapp to post/delete/edit messages and comments,
I built this project from scrap as part of the [React Udacity NanoDegree](https://www.udacity.com/course/react-nanodegree--nd019) [_MOOC_](https://en.wikipedia.org/wiki/Massive_open_online_course), of which I joined the first cohort starting july 2017. This was the second 'project' out of three, focused on [Redux](http://redux.js.org/).

## Try the app

### Online
`readable.xiaoju.io`

### Locally
0. Pre-requisites: git, node.js and npm are installed on you local machine.

2. In a first terminal window: clone the files to a local folder, install the backend server and run it:
  `git clone https://github.com/xiaoju/react_nd-02-readable_server.git`

  `cd react_nd-02-readable_server`

  `npm install`

  `node server`

  Unless modified in `config.js`, server will use port 5001.

3. In a second terminal window: clone, install and run the app itself:

  `git clone https://github.com/xiaoju/react_nd-02-readable_client.git`

  `cd react_nd-02-readable_server`

  `npm Install`

  `npm start`

4. If your browser doesn't open the app automatically, visit the page at
// TODO
http://localhost:3000/ (possibly with another port number).  

## App architecture

backend: node_js express, code provided by udacity.
frontend: this project.

### Forms:
As this project is a study exercise, I used different approaches to tackle similar issues:
- each of the forms is built with a different style:
  - create post : using Redux-Form (form appears on new page)
  - create comment: using vanilla React (form is always visible, above comments list)
  - edit comment: using vanilla Redux (form is shown when necessary, inline within the rest of the comments list, replacing the standard view for a comment)
- state strategies:
  - for the posts, the app maintains inside the state a local posts database mirrored from the backend, with reducers applying atomically any required CRUD modification to the state.
  - for the comments, the app simply makes new API calls of the comments for one post, anytime the comments of a post need to be loaded to the view. These comments are discarded from state when leaving that view.
- selection of posts/comments:
  - for the posts, there is only one pair of edit/delete buttons, shared by all the posts. The posts with focus get access to the buttons. The 'selected post' id is saved in redux store.
  - for the comments, each comment gets its own edit/delete buttons.

### Project requirement
Most app state must be managed through Redux. This was a Udacity requirement, due to this class being focused on Redux.

### Language and framework
This project is written in JavaScript, leveraging the [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) frameworks.
It was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Backend

[Backend code](https://github.com/udacity/reactnd-project-readable-starter) entirely provided by Udacity, the shortcomings of which had to be corrected through the _client_ app, especially:
- no API endpoint for 'number of comments',
- suboptimal API endpoint naming choices ('category' name follows directly the root '/' ),
- API outputs not [normalized](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html).

# available categories

Create, edit and delete categories directly within the code of the backend, file `categories.js`.

Following keywords cannot be used as category names , as they would interfere with the routing in the client app):
- `newPost`,
- `editComment`,
- `editPost`.

# API

Use an Authorization header to work with your own data:

`fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})`

The following endpoints are available:  

  ##### GET /categories
  Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.

  ##### GET /posts
  Get all of the posts, **including those that have been deleted** ( = get all the posts whatever the value of their 'deleted' property). Used for the main page when no category is selected.

  ##### GET /:category/posts
  For a particular category, get all the posts **that haven't been deleted** (= only get those posts that have a value of 'false' for their 'deleted' property).  

  ##### POST /posts
  Add a new post  
  id - UUID should be fine, but any unique id will work  
  timestamp - timestamp in whatever format you like, you can use Date.now() if you like  
  title - String  
  body - String  
  owner - String  
  category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.  

  ##### GET /posts/:id
  Get the details of a single post

  ##### POST /posts/:id
  Used for voting on a post  
  option - String: Either "upVote" or "downVote"  

  ##### PUT /posts/:id
  Edit the details of an existing post  
  title - String  
  body - String  

  ##### DELETE /posts/:id
  Sets the deleted flag for a post to 'true'.   
  Sets the parentDeleted flag for all child comments to 'true'.  

  ##### GET /posts/:id/comments
  Get all the comments for a single post  

  ##### POST /comments
  Add a comment to a post  
  id: Any unique ID. As with posts, UUID is probably the best here.  
  timestamp: timestamp. Get this however you want.  
  body: String  
  owner: String  
  parentId: Should match a post id in the database.  

  ##### GET /comments/:id
  Get the details for a single comment  

  ##### POST /comments/:id
  Used for voting on a comment.  

  ##### PUT /comments/:id
  Edit the details of an existing comment  
  timestamp: timestamp. Get this however you want.  
  body: String  

  ##### DELETE /comments/:id
  Sets a comment's deleted flag to 'true'

# Contributing
  - As per release 0.1.0, this project passed Udacity review, and I'm not working on it anymore. However, feel free to contact me per email to `me@xiaoju.io` regarding any comments or suggestions.
  - If you would like to work deeper on this app, I suggest you take the excellent [`React Udacity NanoDegree`](https://www.udacity.com/course/react-nanodegree--nd019) and create your own version of the project.
  - [Semantic versioning guidelines](http://semver.org/).
  - [Udacity style guides](https://udacity.github.io/git-styleguide/).

# License
  - See [Udacity legal terms](https://www.udacity.com/legal), _License to Educational Content_ section.
  - Color theme is copied from [One Dark UI](https://github.com/atom/one-dark-ui) and [One Dark syntax](https://github.com/atom/one-dark-syntax). As these are the standard themes used by [Atom Nuclide](https://nuclide.io/), the colors can also be checked directly within Atom Nuclide, by opening a Chrome Dev Tools panel.
