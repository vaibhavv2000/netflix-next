import {Client, Pool} from "pg";

const {DB_URL, LOCAL_DB_PASSWORD} = process.env;

const dev = process.env.NODE_ENV === "development";

const local = {
 port: 5432,
 password: LOCAL_DB_PASSWORD,
 database: "netflix",
 user: "postgres",
 host: "localhost"
};

const prod = {
 connectionString: DB_URL,
 ssl: {rejectUnauthorized: false}  
};

const config = dev ? local : prod;

const pg = new Pool(config);

pg.connect();

pg.on("error",(err) => console.log(err));

export default pg;