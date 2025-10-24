import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime(), timestamp: Date.now(), version: "1.0.0" });
});

export default app;
