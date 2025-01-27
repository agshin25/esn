import { DataSource } from "typeorm";
import config from ".";
import { join } from "node:path";


const dataSource = new DataSource({
    type: "postgres",
    url: config.databaseUrl,
    synchronize: true,
    logging: true,
    entities: [join(__dirname, "../models/*.entity.{ts, js}")]

})

dataSource
    .initialize()
    .then(() => {
        console.log(`Database is connected successfully`);
    })
    .catch((err) => {
        console.log(`Database connection failed`, err);
    });

export default dataSource