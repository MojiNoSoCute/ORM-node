// import Sequelize and DataTypes
import { Sequelize, DataTypes } from "sequelize";

// DB connection
// db_name , user, password, { configulation option }
const sequelize = new Sequelize("postgres_db", "dev_user", "dev_password", {
  host: "localhost",
  port: 5432,
  dialect: "prostgres",
  loggin: false,
});

// define databse schema
// จากตาราง Product และต้องกำหนดทุกอันให้ถูก
const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

// connect to DB
const connectDB = async () =>{
    // try catch เพื่อจับ error
    try {
        // รอ ให้เชื่อม database
        await sequelize.authenticate();
        // แสดงให้ดูว่าเชื่อมแล้ว
        console.log("Connected to PostgresSQL!")
        // ให้ table sync กัน
        await sequelize.sync({alter: true});
        console.log("Table synchronize!")
    } catch (error) {
        console.error("Connection failed!", error);
        process.exit(1)
    }
};
export { sequelize, Product, connectDB };