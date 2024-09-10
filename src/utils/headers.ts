import {cookies, headers} from "next/headers";

const getToken = () => {
 return cookies().get("netflix-user")?.value || headers().get('Authorization')?.split(" ")[1] as string;
};

export default getToken;