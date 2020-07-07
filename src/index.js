require("dotenv").config();
const app = require("./app");
const db = require("../db");
require("../db/associations");

const PORT = process.env.PORT || 5000;
db.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
