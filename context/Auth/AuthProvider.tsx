import Router from "next/router";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContex";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "../../utils/api";

type Children = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Children) => {
  const { ["blogCookie"]: token } = parseCookies();
  const [user, setUser] = useState<User >(null!!);
  const [loading, setLoading] = useState(true);
   const [ usersPc, SetUsersPC]= useState (0)
   const [ usersMobile, SetUsersMobile]= useState (0)
 useEffect(()=>{

  const getServer = async () =>{
    const server = await axios.get("https://apiblog-production.up.railway.app/teste")
    .then((res)=>{
      if(res.status === 200){
        return
      }
    })
    .catch((e)=>{
      if(e.code === "ERR_NETWORK"){
        Router.push("/500")
      }
    })
 
    


   
    
    
    
   
  }
  
  
 
      if(token){
        
     
      const userdados = api.getUser(token).then(
        response => setUser(response.user)
         
       
        
        ).then(
          response =>(
          setLoading(false)
        ))
       
    
        
    }
  
   
    getServer()

 },[])
 
 

  const signIn = async (email: string, password: string) => {
    try {
      

      

      const auth = await axios.post("https://apiblog-production.up.railway.app/user/signin", {
        email,
        password,
      });
      const data = auth.data
      
      if (auth.status === 200) {
        setCookie(undefined, "blogCookie", auth.data.token, {
          maxAge: 60 * 60 * 2,
        });
        setUser(data.user)
         
       

      }
      Router.push("/Admin")
      setLoading(false)
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        Router.push("/500");
      
      }
    }
    
  };
  const signUp = async (email: string, password: string, name: string) => {
    const response = await axios.post("http://localhost:8080/signup", {
      email,
      password,
      name,
    });
    if (response.data.token) {
      setCookie(undefined, "blogCookie", response.data.token, {
        maxAge: 60 * 60 * 2,
      });
 
    
    } else {
      alert("Nao foi possivel criar o usuario");
    }
    return;
  };
  const signOut = async () => {
    if (token) {
      destroyCookie(null, "blogCookie");
      
    }
    setLoading(true)
    return Router.push("/signin");
    
  };
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

