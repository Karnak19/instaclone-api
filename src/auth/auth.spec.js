const supertest = require("supertest");

const app = require("../app");
const db = require("../../db");

describe("POST /auth/login", () => {
  it("Should respond with a token and user", async () => {
    const res = await supertest(app)
      .post("/auth/login")
      .send({
        email: "johndoe@gmail.com",
        password: "johndoe",
      })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body).not.toHaveProperty("user.password");
  });
});

describe("POST /auth/login", () => {
  it("Should fail at login due to wrong credentials", async () => {
    const res = await supertest(app)
      .post("/auth/login")
      .send({
        email: "johndoe@gmail.com",
        password: "johndick",
      })
      .expect(422)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /auth/register", () => {
  it("Should respond with a newly created user", async () => {
    const res = await supertest(app)
      .post("/auth/register")
      .send({
        firstName: "Mark",
        lastName: "Doe",
        email: "markdoe@gmail.com",
        password: "markdoe",
      })
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body).not.toHaveProperty("user.password");
  });
});

describe("POST /auth/register", () => {
  it("Should fail at create an user that is already created", async () => {
    const res = await supertest(app)
      .post("/auth/register")
      .send({
        firstName: "Mark",
        lastName: "Doe",
        email: "markdoe@gmail.com",
        password: "markdoe",
      })
      .expect(400)
      .expect("Content-Type", /json/);
  });
});

afterAll(async (done) => {
  db.close();
  done();
});
