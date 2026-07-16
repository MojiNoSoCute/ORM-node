// import express and table Product , function connectDB form db.js
import express from "express";
import { Product, connectDB } from "./db.js";

// กำหนดตัวแปร
const app = express();
const PORT = 5000;

// แปลงให้เป็น json
app.use(express.json());

// connect database
connectDB();

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Wellcome to My RESTful API using Sequelize</h1>")
})

// รอฟังที่ PORT และ แสดงว่าโชที่ PORT ไหน
app.listen(PORT, ()=>{
    console.log(`Server is running on: http://localhost:${PORT}`);
});