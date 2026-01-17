# API Routes Documentation

## Table of Contents
- [General](#general)
- [Endpoints](#endpoints)
  - [GET /](#get-)
  - [POST /checkToken](#post-checktoken)
  - [POST /getHomeFeed](#post-gethomefeed)
  - [POST /register](#post-register)
  - [POST /login](#post-login)
  - [GET /post/:id](#get-postid)
  - [POST /post/:id/edit](#post-postidedit)
  - [DELETE /post/:id](#delete-postid)
  - [POST /create-post](#post-create-post)
  - [POST /search](#post-search)
  - [POST /doesUsernameExist](#post-doesusernameexist)
  - [POST /doesEmailExist](#post-doesemailexist)
- [Profile Routes](#profile-routes)
  - [POST /profile/:username](#post-profileusername)
  - [GET /profile/:username/posts](#get-profileusernameposts)
  - [GET /profile/:username/followers](#get-profileusernamefollowers)
  - [GET /profile/:username/following](#get-profileusernamefollowing)
- [Follow Routes](#follow-routes)
  - [POST /addFollow/:username](#post-addfollowusername)
  - [POST /removeFollow/:username](#post-removefollowusername)

## General
- All routes are prefixed by the base URL of your backend.
- For routes requiring authentication, include a valid JWT token in the request body as shown.

## Endpoints

### GET /
- **Request:** _No request body_
- **Response:**  
  ```json
  "Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"
  ```

### POST /checkToken
- **Request:**
  ```json
  { "token": "your_JWT_token" }
  ```
- **Response:**  
  ```json
  true  // or false if the token is invalid
  ```

### POST /getHomeFeed
- **Request:**
  ```json
  { "token": "your_JWT_token" }
  ```
- **Response:**  
  ```json
  [ /* Array of post objects for the home feed */ ]
  ```

### POST /register
- **Request:** (example payload)
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Response:**  
  ```json
  {
    "token": "generated_JWT_token",
    "username": "exampleUser",
    "avatar": "user_avatar_url_or_data"
  }
  ```
- **Error:** HTTP 500 with error details if registration fails.

### POST /login
- **Request:** (example payload)
  ```json
  {
    "username": "exampleUser",
    "password": "yourPassword"
  }
  ```
- **Response:**  
  ```json
  {
    "token": "generated_JWT_token",
    "username": "exampleUser",
    "avatar": "user_avatar_url_or_data"
  }
  ```
- **Alternate Response:**  
  ```json
  false
  ```

### GET /post/:id
- **Request:**  
  - URL parameter: `id` (post id)
- **Response:**  
  ```json
  { /* Post object */ }
  ```
- **Error:**  
  ```json
  false
  ```

### POST /post/:id/edit
- **Request:**
  - URL parameter: `id` (post id)
  - Request body: Include token and updated post data.
    ```json
    {
      "token": "your_JWT_token",
      "title": "Updated Title",
      "content": "Updated post content"
    }
    ```
- **Response:**  
  ```json
  "success"
  ```
- **Alternate Responses:**
  - ```json
    "failure"
    ```
  - ```json
    "no permissions"
    ```

### DELETE /post/:id
- **Request:**
  - URL parameter: `id` (post id)
  - Request body:
    ```json
    { "token": "your_JWT_token" }
    ```
- **Response:**  
  ```json
  "Success"
  ```
- **Error Response:**  
  ```json
  "You do not have permission to perform that action."
  ```

### POST /create-post
- **Request:**
  ```json
  {
    "token": "your_JWT_token",
    "title": "Post Title",
    "content": "Post content"
    // ...other post fields...
  }
  ```
- **Response:**  
  ```json
  "newPostId"  // if successful
  ```
- **Error Response:**  
  ```json
  [ /* array of error messages */ ]
  ```

### POST /search
- **Request:**
  ```json
  { "searchTerm": "keyword or phrase" }
  ```
- **Response:**  
  ```json
  [ /* Array of matching post objects */ ]
  ```

### POST /doesUsernameExist
- **Request:**
  ```json
  { "username": "requestedUsername" }
  ```
- **Response:**  
  ```json
  true  // or false if the username does not exist
  ```

### POST /doesEmailExist
- **Request:**
  ```json
  { "email": "user@example.com" }
  ```
- **Response:**  
  ```json
  true  // or false
  ```

## Profile Routes

### POST /profile/:username
- **Request:**
  - URL parameter: `username`
  - Request body: Optionally include token for more personalized data.
    ```json
    { "token": "your_JWT_token" }
    ```
- **Response:**
  ```json
  {
    "profileUsername": "exampleUser",
    "profileAvatar": "user_avatar_url_or_data",
    "isFollowing": true,  // or false
    "counts": {
      "postCount": 10,
      "followerCount": 100,
      "followingCount": 50
    }
  }
  ```

### GET /profile/:username/posts
- **Request:**
  - URL parameter: `username`
- **Response:**  
  ```json
  [ /* Array of post objects by the user */ ]
  ```

### GET /profile/:username/followers
- **Request:**
  - URL parameter: `username`
- **Response:**  
  ```json
  [ /* Array of follower information objects */ ]
  ```

### GET /profile/:username/following
- **Request:**
  - URL parameter: `username`
- **Response:**  
  ```json
  [ /* Array of following user objects */ ]
  ```

## Follow Routes

### POST /addFollow/:username
- **Request:**
  - URL parameter: `username`
  - Request body:
    ```json
    { "token": "your_JWT_token" }
    ```
- **Response:**  
  ```json
  true  // or false if the follow action fails
  ```

### POST /removeFollow/:username
- **Request:**
  - URL parameter: `username`
  - Request body:
    ```json
    { "token": "your_JWT_token" }
    ```
- **Response:**  
  ```json
  true  // or false if the unfollow action fails
  ```