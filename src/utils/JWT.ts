import jwt from "jsonwebtoken";

const JWT = {
 sign(payload: object): string {
  return jwt.sign(
   payload, 
   process.env.JWT_TOKEN as string, 
   {expiresIn: "30d"}
  );
 },

 decode: (token: string) => jwt.decode(token),
};

export default JWT;