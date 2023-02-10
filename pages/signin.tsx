import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContex";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Button from "../components/Button";
import { Loading } from "../components/Loading";

const Login = () => {
  const { signIn, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e: any) => {
    e.preventDefault();
    signIn(email,password)
    
   
  };
  
  return (
    <section className=" relative w-full h-screen flex  items-center justify-center ">
        { !loading && <Loading/>}
        
   
        
        
        <div className="bg-login ">
        <form className="formLogin flex flex-col px-3 py-3">
          <h1 className="w-full text-center text-xl text-white py-5 uppercase">
            Blog Company
          </h1>
              <div className="w-full h-12 relative flex items-center justify-center">
                <input
                
                  type="text"
                  placeholder="Digite seu E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
