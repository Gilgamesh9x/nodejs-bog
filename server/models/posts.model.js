const posts = require("./posts.mongo");

async function getLatestPostNumber() {
  const lastestPostNumber = await posts.findOne().sort("-postNumber");
  let newPostNumber;
  if (!lastestPostNumber) {
    newPostNumber = 1;
    return newPostNumber;
  }

  newPostNumber = lastestPostNumber.postNumber;
  newPostNumber++;
  return newPostNumber;
}

async function addPost(post) {
  /* const postDate = new Intl.DateTimeFormat("de-DE").format(new Date()); */
  Object.assign(post, {
    postNumber: await getLatestPostNumber(),
  });
  await posts.create(post);
}

async function getPosts(skip, limit) {
  return await posts
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({ postNumber: -1 })
    .skip(skip)
    .limit(limit);
}

async function getPost(id, update) {
  return await posts.findOne({ postNumber: id });
}

async function editPost(id, update) {
  return await posts.findOneAndUpdate({ postNumber: id }, update);
}

async function deletePost(id) {
  return await posts.findOneAndDelete({ postNumber: id });
}
module.exports = {
  addPost,
  getPosts,
  getPost,
  editPost,
  deletePost,
};
