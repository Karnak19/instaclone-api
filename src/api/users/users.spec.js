const supertest = require("supertest");

const app = require("../../app");
const db = require("../../../db");
const { testUserUsername } = require("../../util");

describe("GET /api/v1/users", () => {
  it("Should respond with an array of users", async () => {
    const res = await supertest(app)
      .get("/api/v1/users")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body.length).toEqual(1);
  });
});

describe("GET /api/v1/users/username", () => {
  it("Should respond with a specific user", async () => {
    const res = await supertest(app)
      .get(`/api/v1/users/${testUserUsername}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).not.toHaveProperty("password");
  });
});

describe("GET /api/v1/users/username/posts", () => {
  it("Should respond with an array of user posts", async () => {
    const res = await supertest(app)
      .get(`/api/v1/users/${testUserUsername}/posts`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body.length).toEqual(1);
  });
});

describe("POST /api/v1/users", () => {
  it("Should respond with a newly created user", async () => {
    const res = await supertest(app)
      .post("/api/v1/users")
      .send({
        username: "jane_doe12",
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        password: "janedoe",
      })
      .set("Accept", "application/json")
      .expect(201)
      .expect("Content-Type", /json/);

    expect(res.body).not.toHaveProperty("password");
  });
});

afterAll(async (done) => {
  db.close();
  done();
});
