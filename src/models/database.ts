import { Sequelize } from "sequelize-typescript";
import { Product} from "./Product";

require('dotenv').config({path:'.env'});



const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});

sequelize.addModels([Product]);

export const initDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
};

export { Product }