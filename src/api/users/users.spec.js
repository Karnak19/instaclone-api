const supertest = require("supertest");

const app = require("../../app");
const db = require("../../../db");
const { testUserId } = require("../../util");

describe("GET /api/v1/users", () => {
  it("Should respond with an array of users", async () => {
    const res = await supertest(app)
      .get("/api/v1/users")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body.length).toEqual(1);
  });
});

describe("GET /api/v1/users/id", () => {
  it("Should respond with a specific user", async () => {
    const res = await supertest(app)
      .get(`/api/v1/users/${testUserId}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).not.toHaveProperty("password");
  });
});

describe("GET /api/v1/users/id/posts", () => {
  it("Should respond with an array of user posts", async () => {
    const res = await supertest(app)
      .get(`/api/v1/users/${testUserId}/posts`)
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
