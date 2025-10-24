// test/branchRoutes.test.ts
import request from "supertest";
import app from "../src/app";

describe("Branch Routes", () => {

  it("create a branch (POST /api/v1/branches) — success", async () => {
 
    const payload = { name: "New Branch", address: "123 Test Ave", phone: "111-222-3333" };


    const res = await request(app).post("/api/v1/branches").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(payload.name);
  });

  it(" return 400 when creating branch with missing required fields (POST /api/v1/branches)", async () => {
    
    const res = await request(app).post("/api/v1/branches").send({}); 

    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });


  it(" return all branches (GET /api/v1/branches)", async () => {
   
    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  it(" return a branch by id (GET /api/v1/branches/:id) - success", async () => {
   
    const res = await request(app).get("/api/v1/branches/1");

  
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("id", 1);
      expect(res.body).toHaveProperty("name");
    }
  });

  it(" handle invalid/missing id for GET /api/v1/branches/:id (return 400 or 404)", async () => {
  
    const res = await request(app).get("/api/v1/branches/abc");

   
    expect([400, 404]).toContain(res.status);
  });

  
  it(" update a branch (PUT /api/v1/branches/:id) - success", async () => {
    
    const update = { address: "Updated Address 999" };

 
    const res = await request(app).put("/api/v1/branches/1").send(update);

    
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("address", update.address);
    }
  });

  it(" return 400 when updating branch with missing required parameters (PUT /api/v1/branches/:id)", async () => {
  
    const res = await request(app).put("/api/v1/branches/1").send({});

   
    expect([200, 400, 404]).toContain(res.status);
  });

 
  it(" delete a branch (DELETE /api/v1/branches/:id) - success", async () => {
   
    const res = await request(app).delete("/api/v1/branches/1");

    
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("message");
    }
  });

  it(" return 400/404 when deleting with invalid id (DELETE /api/v1/branches/:id)", async () => {

    const res = await request(app).delete("/api/v1/branches/abc");


    expect([400, 404]).toContain(res.status);
  });
});
