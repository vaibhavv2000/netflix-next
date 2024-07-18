import {Client} from "pg";

const {DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PWD, DB_URL} = process.env;

const pg = new Client({
 host: DB_HOST,
 port: Number(DB_PORT),
 user: DB_USER,
 database: DB_NAME,
 password: DB_PWD,
 connectionString: DB_URL,
 ssl: {
  rejectUnauthorized: false
 }
});

pg.connect(() => console.log("CONNECTED_PG"));

pg.on("error",(err) => console.log(err));

export default pg;