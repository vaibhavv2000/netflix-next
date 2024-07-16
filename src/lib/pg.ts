import {Pool} from "pg";

const pg = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "vaibhavk15",
  database: "netflix",
});

pg.on("connect", () => console.log("DB_CONNECTED"));

pg.on("error",(err) => console.log(err));

export default pg;