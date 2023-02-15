import Router from "next/router";
import { useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContex";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import api from "../../utils/api";

type Children = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: Children) => {
  const { ["blogCookie"]: token } = parseCookies();
  const [user, setUser] = useState<User>(null!!);
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState("");

  useEffect(() => {
    const getServer = async () => {
      const server = await axios
        .get("https://apiblog-production.up.railway.app/teste")
        .then((res) => {
          if (res.status === 200) {
            return;
          }
        })
        .catch((e) => {
          if (e.code === "ERR_NETWORK") {
            Router.push("/500");
          }
        });
    };
    getServer();
    if (token) {
      const user = async () => {
        setLoading(true);
        const dados = await api
          .getUser(token)
          .then((response) => {
            setUser(response.userDados);
          })
          .then((response) => {
            setLoading(false);
          })

          .catch((e) => {});
      };
      user();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const auth = await api.authenticadet(email, password)
    .then((response)=>{
      if(response){
        setUser(response.user);
        setCookie(undefined, "blogCookie", response.token, {
          maxAge: 60 * 60 * 2,
        });
        setLoading(false);
        Router.push("/Admin");
      }
     })
    .catch((e) => {
        if (e.response) {
          setLoading(false);
          setErros(e.response.data.msg);
        } else {
          Router.push("/500");
          setLoading(false);
        }
      });
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    const createAccount = await api.signup(name,email,password)
    .then((response)=>{
      if(response){
        setLoading(false);
        setCookie(undefined, "blogCookie", response.token, {
        maxAge: 60 * 60 * 2,
      });
      Router.push("/Admin")
      
      }
    })
    .catch((e)=>{
      if(e.response){
        console.log(e.response.data.msg)
      }
      Router.push('/500')
    })
      
  };
  const signOut = () => {
    destroyCookie(null, "blogCookie");
    setLoading(false);

    return Router.push("/signin");
  };
  return (
    <AuthContext.Provider
      value={{ user, errors, setErros, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
