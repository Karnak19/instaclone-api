const bcrypt = require("bcrypt");

function randomAvatar() {
  const avatars = [
    "https://cdn.iconscout.com/icon/free/png-256/avatar-365-456317.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-366-456318.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-368-456319.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-367-456320.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-368-456321.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-369-456322.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456323.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-371-456324.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456325.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-373-456326.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-374-456327.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456328.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-376-456329.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-377-456330.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-378-456331.png",
    "https://cdn.iconscout.com/icon/free/png-256/avatar-379-456332.png",
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

function encryptPasswordIfChanged(user, options) {
  if (user.changed("password")) {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.get("password"), salt);
  }
}

const testUserUsername = "toto56";
const testPostId = "8c0381bb-33ea-4981-a280-7c9b1886a987";

module.exports = {
  testUserUsername,
  testPostId,
  encryptPasswordIfChanged,
  randomAvatar,
};
