import express from "express"
import productRouter from "./src/routes/productRoutes"
import cartRoutes from "./src/routes/cartRoutes"  
import mongoose from "mongoose"
import orderRoutes from "./src/routes/orderRoutes"
import userRouter from "./src/routes/UserPath"
import dotenv from "dotenv";
import {connectDB} from "./src/config/db"

dotenv.config();

const port = process.env.PORT;
const app = express()
app.use(express.json())

connectDB();

app.use("/products",productRouter)
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRouter);

app.listen(port ,()=>{
  console.log(`your server is up and running on port : ${port}`)
});