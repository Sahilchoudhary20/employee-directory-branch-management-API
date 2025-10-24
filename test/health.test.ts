import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/health", () => {
  it("return 200 OK and basic structure", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(typeof res.body.uptime).toBe("number");
    expect(typeof res.body.timestamp).toBe("number");
    expect(typeof res.body.version).toBe("string");
  });
});
