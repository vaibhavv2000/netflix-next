"use client";

import {useState, useEffect} from "react";
import type {FormEvent, ChangeEvent} from "react";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import {useAppDispatch} from "@/lib/redux";
import {login} from "@/redux/userSlice";
import {API} from "@/lib/API";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";
import {validateEmail} from "@/lib/emailValidator";

const Main = () => {
 const [user,setUser] = useState({email: "",password: ""});
 const [showPassword,setShowPasssword] = useState(false);
 const [error,setError] = useState("");
 const [loading, setLoading] = useState(false);

 const dispatch = useAppDispatch();
 const {push} = useRouter();

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 },[error]);

 const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if(loading) return;
  let {email,password} = user;

  email = email.trim();
  password = password.trim();
  
  if(!email || !password) return setError("All fields are required");
  if(!validateEmail(email)) return setError("Enter a valid email");
  if(password.length < 8) return setError("Password should be minimum 8 characters");
  if(password.includes(" ")) return setError("Password should not contain spaces");

  setLoading(true);

  try {
   const res = await API.post("/auth/login", user);
   localStorage.setItem("netflix-auth", "true");
   dispatch(login(res.data));
   push("/home");
  } catch (error: any) {
   setError(error?.response?.data?.message);
  } finally {
   setLoading(false); 
  };
 };

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUser(prev => ({...prev, [e.target.name]: e.target.value}));
 };

 return (
  <form
   className="bg-[rgba(0,0,0,0.8)] w-[95%] max-w-[340px] flex flex-col p-5 py-6 gap-6 shadow-xl xxl:scale-150"
   onSubmit={handleLogin}
  >
   <h1 className="text-center text-[red] font-lora text-5xl font-semibold">Login</h1>
   <input
    className="border-none font-medium outline-none p-3 text-[14px] text-black w-[95%] xs:w-full"
    placeholder="Email"
    onChange={handleChange}
    name="email"
   />
   <div className="relative">
    <input
     type={showPassword ? "text" : "password"}
     className="border-none font-medium xs:w-full outline-none p-3 text-[14px] text-black pr-10 w-[95%]"
     placeholder="Password"
     onChange={handleChange}
     name="password"
    />
    <span 
     className="absolute top-0 right-0 w-10 cursor-pointer h-full grid place-items-center z-50"
     onClick={() => setShowPasssword(prev => !prev)}
    >
     {showPassword ? <AiFillEyeInvisible size={22} color="#555" /> : <AiFillEye size={22} color="#555" />}
    </span>
   </div>
   {error && <p className="text-red-600 text-sm -my-3 font-semibold">{error}</p>}
   <button className="bg-[red] hover:bg-red-600 text-white border-none font-lora flex items-center outline-none p-2.5 font-bold justify-center gap-2">
    Login {loading && <span className="scale-50"><Loader color="#fff" scale={0.4} /></span>}
   </button>
   <p className="-my-2 text-center text-sm text-white">
    <span className="mr-2 text-white/80">Don&apos;t have an Account?</span>
    <Link href={"/register"} className="underline hover:text-red-500">
     Register
    </Link>
   </p>
  </form>
 );
};

export default Main;