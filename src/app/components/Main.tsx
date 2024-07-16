"use client";

import {useState,FormEvent,useEffect,ChangeEvent} from "react";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import {useAppDispatch} from "@/lib/redux";
import {login} from "@/redux/slices/userSlice";
import {API} from "@/lib/API";
import {useRouter} from "next/navigation";

const Main = () => {
 const [user,setUser] = useState({email: "",password: ""});
 const [showPwd,setShowPWd] = useState<boolean>(false);
 const [error,setError] = useState<string>("");

 const dispatch = useAppDispatch();
 const {push} = useRouter();

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 },[error]);

 const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const {email,password} = user;
  if(!email || !password) return setError("All fields are required");

  try {
   const res = await API.post("/auth/login", user);
   if(res.status === 200) {
    const {name} = await res.data;
    localStorage.setItem("netflix-user", JSON.stringify({name, email}));
    dispatch(login({name, email}));
    push("/home");
   }
   
   if(res.status === 404) return setError("No email found");
   if (res.status === 400) return setError("Wrong password");
  } catch (error: any) {
   setError(error.response.data.message);
  }
 };

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUser((p) => ({...p,[e.target.name]: e.target.value}));
 };

 return (
  <main
   className="h-screen w-full grid place-items-center"
   style={{
    backgroundImage: "url(https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
   }}
  >
   <form
    className="bg-[rgba(0,0,0,0.8)] w-[95%] xs:w-[330px] flex flex-col p-5 py-6 gap-6 shadow-xl xxl:scale-150"
    onSubmit={handleLogin}
   >
    <h1 className="text-center text-[red] font-lora text-5xl font-semibold">Login</h1>
    <input
     className="border-none font-medium outline-none p-2.5 text-[16px] text-black w-[95%] xs:w-full"
     placeholder="Email"
     onChange={handleChange}
     name="email"
    />
    <div className="relative">
     <input
      type={showPwd ? "text" : "password"}
      className="border-none font-medium xs:w-full outline-none p-2.5 text-[16px] text-black pr-10 w-[95%]"
      placeholder="Password"
      onChange={handleChange}
      name="password"
     />
     <span 
      className="absolute top-0 right-0 w-10 cursor-pointer h-full grid place-items-center z-50"
      onClick={() => setShowPWd(!showPwd)}
     >
      {showPwd ? <AiFillEyeInvisible size={26} color="#555" /> : <AiFillEye size={26} color="#555" />}
     </span>
    </div>
    {error && <p className="text-red-600 text-sm -my-3 font-semibold">{error}</p>}
    <button className="bg-[red] text-white border-none font-lora outline-none p-2.5 font-bold">
     Login
    </button>
    <p className="-my-2 text-center text-sm text-white">
     <span className="mr-2 text-white/80">Don&apos;t have an Account?</span>
     <Link href={"/register"} className="underline hover:text-red-500">
      Register
     </Link>
    </p>
   </form>
  </main>
 );
};

export default Main;
