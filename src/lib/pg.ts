import {Client} from "pg";

const {MODE} = process.env;

let config = {} as any;

if(MODE === "dev") {
 const {DB_NAME,DB_PORT,DB_USER,DB_HOST,DB_PWD,} = process.env;

 config = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PWD
 };
};

if(MODE === "prod") {
 const {DB_URL} = process.env;

 config = {
  connectionString: DB_URL,
  ssl: {rejectUnauthorized: false,}
 };
};

const pg = new Client(config);

pg.on("error",(err) => console.log(err));

export default pg;