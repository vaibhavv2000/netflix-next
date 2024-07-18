import {Client} from "pg";

const {DB_URL} = process.env;

const pg = new Client({
 connectionString: DB_URL,
 ssl: {
  rejectUnauthorized: false
 }
});

pg.connect();

pg.on("error",(err) => console.log(err));

export default pg;