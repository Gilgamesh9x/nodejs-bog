const express = require("express");
const adminLayout = "../views/layouts/admin";
const users = require("../models/user.mongo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const addPaginationToPosts = require("../helperFunctions/addPaginationToPosts");
const { getPost, editPost, deletePost } = require("../models/posts.model");

const adminRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Check logged in

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

////////////////

adminRouter.get("/admin", async (req, res) => {
  try {
    // Check if the user is already logged in
    const token = req.cookies.token;
    if (token) {
      try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // If the token is valid, redirect to the dashboard
        return res.redirect("/dashboard");
      } catch (err) {
        // If the token is invalid, proceed to render the admin login page
        console.log("Invalid token, rendering admin login page.");
      }
    }

    // If no token is found or the token is invalid, render the admin login page
    const locals = {
      pageTitle: "Admin",
      layout: adminLayout,
      noShowLogOut: true,
    };
    return res.render("admin/index", { ...locals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// to log in
adminRouter.post("/admin", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await users.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Let's create the token that will let us now that the user logged in
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    // Let's save this token into cookies
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

// to register
/* adminRouter.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const addedUser = await addUser(userName, password);
    res.status(201).json({
      message: "User added Successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "User already in use" });
    } else {
      res.json({
        message: "Could not add user",
      });
    }
  }
}); */

// Dashboard

adminRouter.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const { postsToDisplay, nextPage } = await addPaginationToPosts(
      req.query.page,
      5
    );
    //

    const locals = {
      pageTitle: "Dashboard",
      postsToDisplay,
      nextPage,
      layout: adminLayout, // this is a property that locals accepts so we can choose what layout we want. By defualt, we use the layout we chose in app.j
    };
    res.render("admin/dashboard", { ...locals });
  } catch (err) {}
});

// Get add-post

adminRouter.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      pageTitle: "Add Post",
      layout: adminLayout, // this is a property that locals accepts so we can choose what layout we want. By defualt, we use the layout we chose in app.j
    };
    res.render("admin/add-post", { ...locals });
  } catch (err) {
    console.log(err);
  }
});

// Get edit-post

adminRouter.get("/edit-post/:id", authMiddleware, async (req, res) => {
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
      pageTitle: `Edit Post: ${post.postNumber}`,
      layout: adminLayout,
    };
    return res.render("admin/edit-post", { ...locals });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Put edit-post

adminRouter.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const id = +req.params.id;
    const body = req.body;
    body.updatedAt = Date.now();
    const editedPost = await editPost(id, body);
    res.redirect(`/edit-post/${id}`);
  } catch (err) {
    console.log(err);
  }
});

// Delete post

adminRouter.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    const id = +req.params.id;
    const deletedPost = await deletePost(id);
    console.log(`Deleted post: ${deletedPost}`);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

adminRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin");
});

module.exports = adminRouter;

module.exports = adminRouter;
