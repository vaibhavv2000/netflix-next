import type {HTMLAttributes} from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
 color?: string;
 scale?: number;
};

const Loader = (props: props) => {
 const {color = "red", scale = 1, style,...other} = props;

 return (
  <div className="loader" style={{transform: `scale${scale}`}} {...other}>
   <style jsx>
    {`
     .loader {
      height: 32px;
      width: 32px;
      border: 4px solid ${color};
      border-top: 4px solid transparent;
      border-radius: 50%;
      transform: scale(${scale});
      -webkit-transform: scale(${scale});
      animation: loading 0.8s linear infinite;
     }

     @keyframes loading {
      from {transform: rotate(0deg);}
      to {transform: rotate(360deg);}
     }
    `}
   </style> 
  </div>
 );
};

export default Loader;