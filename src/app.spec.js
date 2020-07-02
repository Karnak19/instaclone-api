const supertest = require("supertest");

const app = require("./app");

describe("GET /", () => {
  it("Should respond with a message", async () => {
    const res = await supertest(app).get("/").expect(200).expect("Content-Type", /json/);

    expect(res.body).toHaveProperty("message");
  });
});
