import { createEmployeeSchema } from "../src/api/v1/validation/employeeSchema";
import Joi from "joi";

describe("Employee validation schema", () => {
  it("validates a correct employee payload", () => {
    const payload = {
      name: "Test",
      position: "Teller",
      department: "Operations",
      email: "t@example.com",
      phone: "123456",
      branchId: 1
    };
    const { error } = createEmployeeSchema.validate(payload);
    expect(error).toBeUndefined();
  });

  it("rejects missing required fields", () => {
    const payload = { name: "X" };
    const { error } = createEmployeeSchema.validate(payload);
    expect(error).toBeDefined();
  });
});
