import express from "express";
import bodyParser from "body-parser"; 

const app = express();
const port = 4000;
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let lastId = 4;
let date = new Date();

//Posts data
let posts = [
    {
      id: 1,
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis lorem sem, quis scelerisque enim tempor a. Nullam faucibus nunc in lorem tincidunt porta. Suspendisse vulputate velit quis mauris elementum, pretium finibus ante gravida. Sed ullamcorper pellentesque facilisis. Cras sit amet libero ullamcorper, laoreet mauris nec, varius sapien. Mauris non vulputate arcu. Donec ultricies volutpat nisl eu feugiat. Suspendisse eget mauris urna. Aenean finibus turpis pharetra felis consequat tincidunt. Cras venenatis eros sed nisl pellentesque pretium eget vitae ex. ",
      author: "Lorem ipsum",
      date: "Tue Oct 01 2024 12:36:32 GMT+0200 (Central European Summer Time)",
    },
    {
        id: 2,
        title: "Lorem ipsum",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis lorem sem, quis scelerisque enim tempor a. Nullam faucibus nunc in lorem tincidunt porta. Suspendisse vulputate velit quis mauris elementum, pretium finibus ante gravida. Sed ullamcorper pellentesque facilisis. Cras sit amet libero ullamcorper, laoreet mauris nec, varius sapien. Mauris non vulputate arcu. Donec ultricies volutpat nisl eu feugiat. Suspendisse eget mauris urna. Aenean finibus turpis pharetra felis consequat tincidunt. Cras venenatis eros sed nisl pellentesque pretium eget vitae ex. ",
        author: "Lorem ipsum",
        date: "Thu Oct 03 2024 14:23:19 GMT+0200 (Central European Summer Time)",
      },
      {
        id: 3,
        title: "Lorem ipsum",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis lorem sem, quis scelerisque enim tempor a. Nullam faucibus nunc in lorem tincidunt porta. Suspendisse vulputate velit quis mauris elementum, pretium finibus ante gravida. Sed ullamcorper pellentesque facilisis. Cras sit amet libero ullamcorper, laoreet mauris nec, varius sapien. Mauris non vulputate arcu. Donec ultricies volutpat nisl eu feugiat. Suspendisse eget mauris urna. Aenean finibus turpis pharetra felis consequat tincidunt. Cras venenatis eros sed nisl pellentesque pretium eget vitae ex. ",
        author: "Lorem ipsum",
        date: "Wed Oct 02 2024 18:52:24 GMT+0200 (Central European Summer Time)",
      },
      {
        id: 4,
        title: "Lorem ipsum",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis lorem sem, quis scelerisque enim tempor a. Nullam faucibus nunc in lorem tincidunt porta. Suspendisse vulputate velit quis mauris elementum, pretium finibus ante gravida. Sed ullamcorper pellentesque facilisis. Cras sit amet libero ullamcorper, laoreet mauris nec, varius sapien. Mauris non vulputate arcu. Donec ultricies volutpat nisl eu feugiat. Suspendisse eget mauris urna. Aenean finibus turpis pharetra felis consequat tincidunt. Cras venenatis eros sed nisl pellentesque pretium eget vitae ex. ",
        author: "Lorem ipsum",
        date: "Thu Oct 03 2024 10:12:03 GMT+0200 (Central European Summer Time)",
      },
  ];

//GET All posts
app.get("/posts", (req,res) => {
    console.log(posts);
    res.json(posts)
})

//GET a specific post by id
app.get("/posts/:id", (req,res) => { 
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) res.status(404),json({message:"Post not found"});
    res.json(post);
})

//POST a new post
app.post("/posts", (req,res) =>{
    if (!req.body.title || !req.body.content || !req.body.author) {
        return res.status(400).json({error: "All fields are required"});
    }
    const newID = lastId + 1;
    const newPost = {
        id: newID,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: date
    }
    lastId = newID;
    posts.push(newPost);
    res.status(202).json(newPost);
});
//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const existingPost = posts.find((post) => post.id === postId);
  
  if (!existingPost) return res.status(404).json({ message: "Post not found" });
  if (req.body.title) existingPost.title = req.body.title;
  if (req.body.content) existingPost.content = req.body.content;
  if (req.body.author) existingPost.author = req.body.author;
  
  res.json(existingPost);
});
//DELETE a specific post by providing id
app.delete("/posts/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const findIndex = posts.findIndex(post => post.id === id);
    if (findIndex > -1) {
        posts.splice(findIndex, 1)
        res.sendStatus(200).json({message:"Post deleted"});
      } else {
        res.status(404).send({error: `Joke with id: ${id} not found. No jokes were deleted`})
      }
})


app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});