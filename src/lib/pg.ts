import {Pool} from "pg";

const {DB_NAME, DB_PORT, DB_USER, DB_HOST, DB_PWD} = process.env;

const pg = new Pool({
 host: DB_HOST,
 port: Number(DB_PORT),
 user: DB_USER,
 password: DB_PWD,
 database: DB_NAME,
 ssl: {
  rejectUnauthorized: false,
  ca: `MIIEQTCCAqmgAwIBAgIUXJAJZsdIf/G1bSjL3QYtUR/njUwwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZGUwYjIxMWUtYzNlZC00NDM3LWI3ZGUtMjk5MTMxZjJk
MThiIFByb2plY3QgQ0EwHhcNMjQwNzE2MDcxMjE4WhcNMzQwNzE0MDcxMjE4WjA6
MTgwNgYDVQQDDC9kZTBiMjExZS1jM2VkLTQ0MzctYjdkZS0yOTkxMzFmMmQxOGIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKaXW5Jh
sjnrOinv16Eu28IAjoFKbCImltZEobFW2vuK6izDIIYx2v3XHL0WImUe4TFuHnr7
G8Tx+67fKoLQXj0q18vog6QoSCPyv9mCNby9TAJHOD9ZkpQPj/n3eFFOERRlGbSz
Qr2Cd4QCDXNoiK5//r1kwbOPZxuCzbttzdRkm4cGAIisez4gedi6otSI8yjk1CKm
RbVjsMdaGIbM/3r9TAFGWpntoHlpouaKnem3SLgS6S9+1LKXyrH4NgkMsPSLSN8H
MRO3emLQuOLKu1wrdRTIg7+jjmEzhsFvjsTBOKls7PQpue0/dL8ub+wJOwPni/2R
PY+zyVB4gllg5qbKKBBmClBQXzlFCqWRwGJ+k8jGwn6F7sT1HXq1JUae7qMK25ey
d1VNvTbJZD7vtuMpSqX1csp86rbt/JfbyMg8boyUxCkfiAPJUYCSzlVC5da+Hpeg
Jsqm4CArbl3RW95TZkd7eWJUDw/18zzy2zNX//+8DBIa5Eu2ut9JpdEc3wIDAQAB
oz8wPTAdBgNVHQ4EFgQUjB/CQ0smcDMzkp9mLi8HUEmVMNQwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACDeokvEqzh70nHy
jYNNgXap9s/jnjTLu5bF/XA2SXM5SMOOWcpPgZ+1gFP3p40lrwAT5XTvsBC7P547
b+8k7XODqpRlFTigNvgS6YjRvlp82zsi3ZkvYQc3OVEKdVBtIAcyMJrk4Qq4J4ov
5C+tz06UlKh+ObTQ6jMLDcA+qkadMnND5dF6kzV+toVW+K7EvEfyE6Vn9LF3NI8G
9Fhgi5vYA35AWLKvIUR+DOElyvZJek/3YKwSY4KCJKFpWq/sxjNQ8Rxq6AoOtzqp
0U2rUhZZREcwOmcCI+Iyy33ozM2BXyE+C4vbKFlLfqinXle+usOJrdMlR45okeNL
7HhC7BdYcEnVZ3ztZOog3FPNUWZq1mFTReh0ezYqp6wKG9e05kPAb73pE4WaWO1R
lPzD9J0O4FulSagGDnw5V3+uvIxwj/VZ5RSnO6rJQXCBn7ceD/mH50Pj+yfoMhJH
sbrKY5a7bAOoEMBbs2EDpa8kY/ml0UKZEMrGt3GkzOav+wrYsg==`
 }
});

pg.on("connect", () => console.log("DB_CONNECTED"));

pg.on("error",(err) => console.log(err));

export default pg;