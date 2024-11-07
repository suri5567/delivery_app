import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import swaggerDocs from "./swagger.js";

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json()); 

// Initialize Swagger Documentation
swaggerDocs(app);

// Define Routes
app.get('/', (req,res)=>{
  res.send("Hello, Delivery Management System!");
})
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/payments", paymentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
