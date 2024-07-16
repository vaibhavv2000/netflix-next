"use client";

import {useState,FormEvent,useEffect,ChangeEvent} from "react";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import {useAppDispatch} from "@/lib/redux";
import {login} from "@/redux/slices/userSlice";
import {API} from "@/lib/API";
import {useRouter} from "next/navigation";

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Main = () => {
 const [user,setUser] = useState({email: "",password: "",name: ""});
 const [showPwd,setShowPWd] = useState<boolean>(false);
 const [error,setError] = useState<string>("");

 const dispatch = useAppDispatch();
 const {push} = useRouter();

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 },[error]);

 const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(regex);
 };

 const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const {email,password,name} = user;
  if(!user || !email || !password) return setError("All fields are required");
  if(!validateEmail(email)) return setError("Enter a valid email");
  if(password.length < 6) return setError("Password should be minimum 6 characters");

  try {
   const res = await API.post("/auth/register", user);
   if(res.status === 201) {
    localStorage.setItem("netflix-user", JSON.stringify({name, email}));
    dispatch(login({name, email}));
    push("/home");
   } else {
    setError(res.data.message);
   }
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
    <h1 className="text-center text-[red] font-lora text-5xl font-semibold">Register</h1>
    <input
     className="border-none font-medium outline-none p-2.5 text-[16px] text-black w-[95%] xs:w-full rounded-sm"
     placeholder="Name"
     onChange={handleChange}
     name="name"
    />
    <input
     className="border-none font-medium outline-none p-2.5 text-[16px] text-black w-[95%] xs:w-full rounded-sm"
     placeholder="Email"
     onChange={handleChange}
     name="email"
    />
    <div className="relative">
     <input
      type={showPwd ? "text" : "password"}
      className="border-none font-medium xs:w-full outline-none p-2.5 text-[16px] text-black pr-10 w-[95%] rounded-sm"
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
     Register
    </button>
    <p className="-my-2 text-center text-sm text-white">
     <span className="mr-2 text-white/80">Already have an Account?</span>
     <Link href={"/"} className="underline hover:text-red-500">
      Login
     </Link>
    </p>
   </form>
  </main>
 );
};

export default Main;
