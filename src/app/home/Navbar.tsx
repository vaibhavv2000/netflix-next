import {Typography} from "@mui/material";
import Image from "next/image";
import {useEffect,useState} from "react";
import {FiSearch} from "react-icons/fi";
import {IoNotificationsOutline} from "react-icons/io5";
import {AiFillCaretDown} from "react-icons/ai";
import {logout} from "@/redux/userSlice";
import {API} from "@/lib/API";
import {useAppDispatch} from "@/lib/redux";
import {useRouter} from "next/navigation";

const navOptions = ["Home","Movies","Anime","Try Kids","My List"];

const Navbar = () => {
 const [showAuth,setShowAuth] = useState<boolean>(false);
 const [scrolled,setScrolled] = useState<boolean>(false);

 const {push} = useRouter();

 const dispatch = useAppDispatch();

 useEffect(() => {
  function scrollDetect() {
   const y = window.scrollY;
   if(y === 0) setScrolled(false);
   else setScrolled(true);
  }

  window.addEventListener("scroll",scrollDetect);

  return () => {
   window.removeEventListener("scroll",scrollDetect);
  };
 },[]);

 const handleLogout = async () => {
  try {
   const res = await API.delete("/auth/logout");
   if(res.data.success) {
    dispatch(logout());
    localStorage.removeItem("netflix-auth");
    window.location.reload();
   };
  } catch (error) {
   dispatch(logout());
   localStorage.removeItem("netflix-auth");
   location.reload(); 
  };
 };

 return (
  <nav className={`navbar ${scrolled ? "bg-black" : "bg-[rgba(0,0,0,0.0155555)]"}`}>
   <div className="flex items-center space-x-5 z-[83838833]">
    <Image
     src={"https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"}
     alt={"Official Logo"}
     width={160}
     className="cursor-pointer"
     height={10}
     style={{height: "80px"}}
     quality={1}
    />
    <ul className="hidden md:!flex items-center space-x-4">
    {navOptions.map((path,index) => (
     <Typography variant="body2" className={'link'} key={`${path}-${index}`}>
      {path}
     </Typography>
    ))}
    </ul>
   </div>
   <div className="flex items-center space-x-4">
    <FiSearch size={25} color="#fff" />
    <div className="relative hidden lg:!block">
     <IoNotificationsOutline size={25} color="#fff" />
     <span className="absolute bg-[red] text-white rounded-full text-[9px] grid place-items-center -top-1 -right-1 h-4 w-4 pt-0.5">
      3
     </span>
    </div>
    <p className="text-white font-medium hidden lg:!block">DVD</p>
    <div className="relative flex items-center space-x-2">
     <Image
      src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5VvVLHprgZYPxX0ILhu6DjZynAsT31gfClQyhtO3bQ&usqp=CAU&ec=48665698"}
      alt="DVD"
      height={40}
      width={40}
     />
     <AiFillCaretDown
      size={22}
      color="#fff"
      className="cursor-pointer"
      onClick={() => setShowAuth(!showAuth)}
     />
     {showAuth && (
     <div className="absolute flex flex-col w-16 shadow-xl bg-[#151515] p-1.5 space-y-2 top-8 -right-3">
      <Typography variant="subtitle2" className={'auth-link'} onClick={handleLogout}>
       Logout
      </Typography>
     </div>
     )}
    </div>
   </div>
  </nav>
 );
};

export default Navbar;