import {Pool} from "pg";

const {DB_NAME, DB_PORT, DB_USER, DB_HOST, DB_PWD} = process.env;

const pg = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
});

pg.on("connect", () => console.log("DB_CONNECTED"));

pg.on("error",(err) => console.log(err));

export default pg;