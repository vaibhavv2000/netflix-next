import {Pool} from "pg";

const dev = process.env.NODE_ENV === "development";

const local = {
 port: 5432,
 password: process.env.LOCAL_DB_PASSWORD,
 database: "netflix",
 user: "postgres",
 host: "localhost"
};

const prod = {
 connectionString: process.env.POSTGRES_URL,
 ssl: {rejectUnauthorized: false}  
};

const config = dev ? local : prod;

const pg = new Pool(config);

pg.connect();

pg.on("error",(err) => console.log(err));

export default pg;