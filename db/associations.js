const Post = require("../src/api/posts/posts.model");
const User = require("../src/api/users/users.model");

Post.belongsTo(User, { foreignKey: "username" });
User.hasMany(Post, { foreignKey: "username" });
