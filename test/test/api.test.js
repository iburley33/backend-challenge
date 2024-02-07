require("dotenv").config({ path: "../.env" });
const Organization = require("../../server/models/Organization");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require("chai-http");
const request = require("supertest");
const app = require("../../server/app");
chai.should();
chai.use(chaiHttp);
let authToken;
let orgId;

const testUser = {
  email: "testadmin@test.com",
  password: "tomato",
};

describe("./api/login", function () {
  it("should return a valid JWT token for a valid login", function (done) {
    request(app)
      .post("/api/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("token");
        authToken = res.body.token;
        done();
      });
  });

  it("should hit a protected organization route searching by id and store the id for later use", function (done) {
    const orgData = {
      name: "Test Organization",
      addresses: [
        {
          street: "123 Test St",
          city: "Test City",
          state: "Test State",
          zip: "12345",
          country: "Test Country",
        },
      ],
    };
    request(app)
      .post("/api/organization/create")
      .set("Authorization", `Bearer ${authToken}`)
      .send(orgData)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("_id");
        orgId = res.body.data._id;
        done();
      });
  });

  it("should access organization by its ID using stored token", function (done) {
    request(app)
      .get(`/api/organization/${orgId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .end(done);
  });
});

describe("POST /api/organization/create", () => {
  it("should create a new organization with address", async () => {
    const orgData = {
      name: "Test Organization",
      addresses: [
        {
          street: "123 Test St",
          city: "Test City",
          state: "Test State",
          zip: "12345",
          country: "Test Country",
        },
      ],
    };

    const response = await request(app)
      .post("/api/organization/create")
      .set("Authorization", `Bearer ${authToken}`)
      .send(orgData)
      .expect(200);

    assert(response.body.data.name === orgData.name);
    assert.strictEqual(response.body.data.addresses.length, 1);

    const createdOrg = await Organization.findOne({ name: orgData.name });
    assert(createdOrg !== null);
    assert.strictEqual(createdOrg.addresses.length, 1);
  });

  it("should return 500 if there is an error during organization creation", async () => {
    const orgData = {
      name: "Test Organization",
      addresses: [
        {
          street: "123 Test St",
          city: "Test City",
          state: "Test State",
          zip: "12345",
          country: "Test Country",
        },
      ],
    };
    Organization.create = () => {
      throw new Error("Test error");
    };

    const response = await request(app)
      .post("/api/organization/create")
      .set("Authorization", `Bearer ${authToken}`)
      .send(orgData)
      .expect(500);

    assert(response.body.message === "Test error");
  });
});

describe("GET /api/organization/:orgId/matchany/", async () => {
  it("should return a single organization by its ID", (done) => {
    const queryParams = {
      city: "Test City",
      state: "Test State",
    };

    request(app)
      .get(`/api/organization/${orgId}/matchany`)
      .set("Authorization", `Bearer ${authToken}`)
      .query(queryParams)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an("array");
        expect(res.body.data[0]).to.have.be.an("object");
        expect(res.body.data[0]).to.have.property("_id");
        done();
      });
  });
});
describe("GET /api/organization/:orgId", async () => {
  it("should return a single organization by its ID", (done) => {
    request(app)
      .get(`/api/organization/${orgId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("_id").equal(orgId);
        done();
      });
  });
});
describe("PUT /api/organization/orgId", function () {
  it("should update the organization", function (done) {
    const updateData = {
      name: "Updated Test Organization",
    };

    request(app)
      .put(`/api/organization/${orgId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateData)
      .expect(200)
      .end(done);
  });
});

/* describe("DELETE /api/organization.orgId", function () {
  it("should delete the organization", function (done) {
    request(app)
      .delete(`/api/organization/${orgId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .end(done);
  });
}); */
/*
describe("GET /api/organization/:orgId/matchall/", () => {
 
  it("should return an array of strings based on query parameters", async () => {
      
      const queryParams = {
        param1: "city: Test City",
        param2: "state: Test State",
      };
      const res = await request(app)
        .get(`/api/organization/${orgId}/matchall/`)
        .set("Authorization", `Bearer ${authToken}`)
        .query(queryParams);
        expect(res.body.array1).to.be.json;
        expect(res.body.array1).to.be.an("array")
    });
  });


*/
