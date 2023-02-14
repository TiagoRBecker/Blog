import { useState, useContext,useEffect} from "react";
import { AuthContext } from "../context/Auth/AuthContex";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Button from "../components/Button";
import { Loading } from "../components/Loading";
import Image from "next/image";

const Login = () => {
  const { signIn, loading,errors,setErros } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 useEffect(()=>{
     setErros('')
 },[email,password])
  
 
 
 

  const handleLogin = async (e: any) => {
    e.preventDefault();
    signIn(email,password)
    
   
  };
  console.log(errors)
  
  return (
    <section className=" relative w-full h-screen flex  items-center justify-center ">
        { loading && 
        <Loading 
         title="Carregando" 
          className=" absolute bg-black text-white text-xl w-full  h-full z-50  flex flex-col items-center justify-center" 
        
        size={250}
        />
      }
        
   
       
        
        <div className="bg-login ">
        
        <form className="formLogin flex flex-col px-3 py-3">
           <h1   className="text-5xl text-gray-400 text-center py-5">BlOG SYSTEM</h1>
              <div className="w-full flex items-center justify-center">
              {errors &&<span className="text-red-500 font-bold">{errors}</span>}
              </div>
              <div className="w-full h-12 relative flex items-center justify-center">
                <input
                
                  type="text"
                  placeholder="Digite seu E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <AiOutlineMail
                  size={20}
                  color={"#ccc"}
                  className="absolute left-12"
                />
              </div>
              <div className="w-full h-12 relative flex  items-center justify-center">
                <input
                  type="password"
                  placeholder="Digite seu Password"
                  value={password}
                  
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <AiOutlineLock
                  size={20}
                  color={"#ccc"}
                  className="absolute  left-12 "
                />
              </div>
              <div className=" w-full flex items-center justify-center mt-10 ">
                <Button
                  title="LOGIN"
                  className="btn"
                  click={handleLogin}
                />
              </div>
            </form>
        
        </div>
        
      
    </section>
  );
};
export default Login;
