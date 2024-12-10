require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mainRouter = require("./server/routes/main");
const adminRouter = require("./server/routes/admin");
const mongoConnect = require("./server/config/mongo");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { checkOneUser } = require("./server/models/user.model");
const methodOverride = require("method-override");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use cookie-parser to parse cookies
app.use(cookieParser());
// Override with the _method query parameter
// <form action="/edit-post/<%= post.postNumber %>?_method=PUT" method="POST">
app.use(methodOverride("_method"));

// Use express-session to manage sessions
app.use(
  session({
    secret: "kayboard hh", // Used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions even if they haven't been modified
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
    }), // This will create the cookie for us
    cookie: {
      maxAge: 2592000000,
    },
  })
);

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/", adminRouter);

// Connect to DB
mongoConnect();
//Create admin user:
checkOneUser();

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
