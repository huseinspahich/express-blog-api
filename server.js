import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route to render main page
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        res.render("index.ejs", { posts: response.data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

//Route to render edit page
app.get("/new", (req, res) => {
    res.render("addPost.ejs", {
        heading: "New post",
        submit: "Create post"
    });
});

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        res.render("addPost.ejs", {
                heading: "Edit post",
                submit: "Update post",
                post: response.data
            });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

//Create new post
app.post("/api/posts", async (req, res) => {
    if (req.body === null || req.body.title === null || req.body.content === null || req.body.author === null) {
        res.status(400).json({ error: "Missing required fields in request body" });
        return;
    }
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        if (response.data === null) {
            res.status(404).json({ error: "No data found" });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating post" });
    }
});

//Partially update post
app.post("/api/posts/:id", async (req, res) => {
    try {
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
        if (response.data === null) {
            res.status(404).json({ error: "No data found" });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error updating post" });
    }
});

//Delete post
app.get("/api/posts/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
        if (response.data === null) {
            res.status(404).json({ error: "No data found" });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error deleting post" });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
