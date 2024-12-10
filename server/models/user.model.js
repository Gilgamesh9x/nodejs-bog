const jwt = require("jsonwebtoken");
const users = require("./user.mongo");
const bcrypt = require("bcryptjs");

async function addUser(userName, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const addedUser = await users.create({
      userName,
      password: hashedPassword,
    });
    return addedUser;
  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
}

async function checkOneUser() {
  const checkOneUser = await users.find();
  if (checkOneUser.length === 0) {
    addUser("med", "amine");
  } else {
    console.log("We already have a user");
  }
}

module.exports = {
  addUser,
  checkOneUser,
};
