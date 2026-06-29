import "dotenv/config";
import express from "express";

import connectDb from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import musicRoute from "./routes/musicRoute.js";

const app = express();
connectDb();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/create", musicRoute);
app.get("/sher", (req, res) => {
  res.send("sher");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
