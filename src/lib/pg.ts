import {Client,Pool} from "pg";

const {DB_NAME,DB_PORT,DB_USER,DB_HOST,DB_PWD} = process.env;

let local = {
 host: "postgres",
 port: 5432,
 database: "netflix",
 user: "postgres",
 password: "vaibhavk15"
};

const prod = {
 host: "postgresql://netflix:29nzrH5cyeVXJFjBls7HflufRVS20rsd@dpg-cqbmjkuehbks73dquro0-a/netflix_j4a2",
 port: 5432,
 user: "netflix",
 password: '29nzrH5cyeVXJFjBls7HflufRVS20rsd',
 database: 'netflix_j4a2',
 connectionString: "postgresql://netflix:29nzrH5cyeVXJFjBls7HflufRVS20rsd@dpg-cqbmjkuehbks73dquro0-a.oregon-postgres.render.com/netflix_j4a2"
};

const pg = new Client({
 ...prod,
 ssl: {rejectUnauthorized: false}
});

pg.connect(() => {
 console.log("CONNECTED_TO_PG");
});

pg.on("error",(err) => console.log(err));

export default pg;