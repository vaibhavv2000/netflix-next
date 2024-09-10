import Cover from "../../assets/Images/cover.jpg";

const Layout = ({children}: {children: React.ReactNode}) => {
 return (
  <main className="h-screen w-full grid place-items-center"
   style={{
    backgroundImage: `url(${Cover.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
   }}>
   {children}
  </main>  
 );
};

export default Layout;