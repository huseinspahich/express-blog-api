# Blog Post Management API & Backend Application
Blog API is a backend application for managing blog posts, designed with two key layers.      
The backend is implemented in the server.js file, while the API is handled in the index.js file.     
I used Postman for Testing and Validating Results of this RESTful application.  
**1. Backend Server (Port 3000):**    
Handles rendering dynamic EJS templates and serves as an interface for users to interact with the API, enabling them to view, add, edit, and delete posts via HTTP requests made with Axios.      
**2. RESTful API (Port 4000):**    
 A standalone API built with Express that provides full CRUD (Create, Read, Update, Delete) functionality. This includes endpoints for creating, retrieving, updating, and deleting blog posts stored in-memory.   
  

## Getting Started
Follow the instructions below to get local copy up and running.
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/huseinspahich/express-blog-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run command below to start the API.
   ```sh
   node index.js
   ```
4. Open new terminal and run command below to start the Backend Server.
   ```sh
   node sever.js
   ```   
   Website home page can be accessed on http://localhost:3000.

![MyBlogMainPage](https://github.com/user-attachments/assets/f54e2851-ebd1-4b8c-9cdd-808b501d37b8)
![MyBlogMainPage2](https://github.com/user-attachments/assets/36788290-361d-49fa-9625-71c356935b9a)
![MyBlogNewPost](https://github.com/user-attachments/assets/e1a1312a-ee6e-48ac-982d-d9e6ee8b1b8a)
![MyBlogEditPost](https://github.com/user-attachments/assets/5c880a70-e2e2-4add-87a2-5aa3d5725e54)
![MyBlogNewPost 1PNG](https://github.com/user-attachments/assets/4dfaa839-7dc5-4bf1-9098-315cd617668e)

