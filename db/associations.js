const Post = require("../src/api/posts/posts.model");
const User = require("../src/api/users/users.model");

Post.belongsTo(User);
User.hasMany(Post);
