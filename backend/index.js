import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/configDb.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: false,
  })
);

connectDb();

const PORT = process.env.PORT || 8000;

// import all routers
import userRouter from "./routes/user.routes.js";
import donationRouter from "./routes/donation.routes.js";

app.use("/api/user", userRouter);
app.use("/api/donation", donationRouter);

//app commmands
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("JeevanSetu Backend is running...");
});
