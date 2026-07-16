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