import { DataSource } from "typeorm";
import config from ".";

const dataSource = new DataSource({
    type: "postgres",
    url: config.databaseUrl,
    synchronize: true,
    logging: true,
    entities: []

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