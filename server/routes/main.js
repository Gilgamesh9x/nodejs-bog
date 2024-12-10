const express = require("express");
const posts = require("../models/posts.mongo");
const { addPost, getPost } = require("../models/posts.model");
const addPaginationToPosts = require("../helperFunctions/addPaginationToPosts");

const mainRouter = express.Router();

mainRouter.get("/", async (req, res) => {
  try {
    /*     let page = +req.query.page || 1;
    let limit = 2;
    let skip = limit * page - limit;
    //
    const postsToDisplay = await getPosts(skip, limit);
    const count = await posts.countDocuments();
    const nextPage = parseInt(page) + 1; // this is the next page button we'll click on
    const hasNextPage = nextPage <= Math.ceil(count / limit); // condition to see if the next page will have at least 1 document or not */
    //
    const { postsToDisplay, nextPage } = await addPaginationToPosts(
      req.query.page,
      5
    );
    //
    const locals = {
      pageTitle: "NodeJS Blog",

      postsToDisplay,
      nextPage,
      /* nextPage: hasNextPage ? nextPage : null, */
    };
    return res.render("index", { ...locals });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

mainRouter.get("/post/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const post = await getPost(id);
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    const locals = {
      post,
      pageTitle: `Post: ${post.postNumber}`,
    };
    return res.render("post", { ...locals });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

mainRouter.post("/add-post", async (req, res) => {
  try {
    const post = req.body;
    await addPost(post);
    console.log("Post added");
    return res.redirect("/dashboard");
  } catch (err) {
    return res.status(400).json({
      error: "Could not add post",
    });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////

mainRouter.post("/search", async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    // this removes any special characters. Example: "Hello, World! 123" => "HelloWorld123"
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const postsToDisplay = await posts.find({
      $or: [
        { postTitle: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    console.log(postsToDisplay);
    const locals = {
      pageTitle: "Search",
      postsToDisplay,
    };
    return res.render("search", { ...locals });
  } catch (err) {
    console.log(err);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////

mainRouter.get("/about", async (req, res) => {
  const locals = {
    pageTitle: "NodeJS Blog",
  };
  return res.render("about", { ...locals });
});

module.exports = mainRouter;
