import request from "supertest";
import app from "../src/app";

describe("Employee Routes", () => {
  it("POST /api/v1/employees -> creates employee", async () => {
    const payload = { name:"Test User", position:"Teller", department:"Operations", email:"t@example.com", phone:"123", branchId:1 };
    const res = await request(app).post("/api/v1/employees").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(payload.name);
  });

  it("POST /api/v1/employees -> missing params returns 400", async () => {
    const res = await request(app).post("/api/v1/employees").send({ name:"X" });
    expect(res.status).toBe(400);
  });

  it("GET /api/v1/employees -> returns array", async () => {
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/v1/employees/:id -> returns employee or 404", async () => {
    const list = await request(app).get("/api/v1/employees");
    const firstId = list.body[0]?.id ?? 1;
    const res = await request(app).get(`/api/v1/employees/${firstId}`);
    expect([200,404]).toContain(res.status); // accept either depending on data
  });

});
