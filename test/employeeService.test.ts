import * as service from "../src/api/v1/services/employeeService";

describe("Employee service (Firestore)", () => {
  it("createEmployee should return created object", async () => {
    const payload = { name:"A", position:"T", department:"D", email:"a@a.com", phone:"123", branchId: "1" };
    const created = await service.createEmployee(payload as any);
    expect(created).toBeDefined();
  });

  it("getAllEmployees should return array", async () => {
    const list = await service.getAllEmployees();
    expect(Array.isArray(list)).toBe(true);
  });
});
