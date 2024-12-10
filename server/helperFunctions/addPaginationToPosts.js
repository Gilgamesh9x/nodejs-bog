const posts = require("../models/posts.mongo");
const { getPosts } = require("../models/posts.model");

async function addPaginationToPosts(enteredPage, enteredLimit) {
  let page = enteredPage || 1;
  let limit = enteredLimit;
  let skip = limit * page - limit;
  //
  const postsToDisplay = await getPosts(skip, limit);
  const count = await posts.countDocuments();
  const nextPage = parseInt(page) + 1; // this is the next page button we'll click on
  const hasNextPage = nextPage <= Math.ceil(count / limit); // condition to see if the next page will have at least 1 document or not

  const result = { postsToDisplay, nextPage: hasNextPage ? nextPage : null };

  return result;
}

module.exports = addPaginationToPosts;
