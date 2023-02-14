import  Router from "next/router";
import { useState } from "react";
import { parseCookies } from "nookies";
import { LayoutAdmin } from "../../../../components/LayoutAdmin";
import axios from "axios";
import Button from "../../../../components/Button";
import api from "../../../../utils/api";

import Lottie from "lottie-react";
import sucess from "../../../../components/Lottie/sucess.json";
import { Loading } from "../../../../components/Loading";

export type User = {
  name: string;
  email: string;
};
export type Dados = {
  dados: [];
};
export type Props = {
  userDados: User;
  credentials: Dados[];
};

const Update = ({ userDados }: Props) => {

  const { ["blogCookie"]: token } = parseCookies();
  const [email, setEmail] = useState(userDados.email);
  const [name, setName] = useState(userDados.name);
  const [pass, setPass] = useState("*******************");
  const [perfil, setPerfil] = useState<any>("");
  const [msg, setMsg] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iste exercitationem asperiores iure optio inventore ex. Iste accusantium, ipsa similique quia ipsam sequi fugiat maiores nobis dignissimos excepturi! Aspernatur, nesciunt."
  );
  const [error, setError] = useState("");
  const [lottie ,setLottie] = useState(false)
  const [loading ,setLoading] = useState(false)
  const handlePerfil = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();

    /*formData.append("file", perfil);
    formData.append("name", name);
    formData.append("email", email);*/
    const testes = await api.updateProfile(name,email,perfil,token)
      .then((response) => {
        setLoading(false)
        setLottie(true)
        return console.log(response);
      })
      .catch((e) => {
        if (e.response) {
          setError(e.response.data.msg);
        } else {
          Router.push("/500");
        }
      });
  };
  const handlePushPerfil = () => {
    setLottie(false)
    Router.push("/Admin/user/perfil")
    
   
  };

  return (
    <LayoutAdmin>
      <div className=" relative w- full py-10 flex items-center justify-center   flex-col  rounded-md shadow-2xl border border-gray-300  ">
        <h1 className="w-full  text-center  px-4 py-5 text-gray-600 text-2xl font-bold  border-gray-500">
          Dados Cadastrados
        </h1>
        {lottie &&  <div className=" lottiePosition">
          <div className="w-80 h-80  ">
            <Lottie
              height={150}
              width={150}
              animationData={sucess}
              loop={true}
            />
          </div>
          <span className="text-white text-xl">Perfil atualizado sucesso</span>
          
          <div className="">
            <Button
              click={handlePushPerfil}
              title="Atualizar"
              className="w-36 bg-blue-600 mt-12 py-2 text-white text-xs px-2 rounded-md font-normal cursor-pointer hover:bg-blue-700"
            />
          </div>
        </div> }
        { loading &&
        <div className=" lottiePosition">
        <Loading className="absolute " size={150} title="Carregando"/>
        </div>
        } 
       
        <form
          method="POST"
          encType="multipart/form-data"
          className="w-6/12 h-full flex flex-col px-5 py-5  mx-auto border border-gray-200 rounded-sm tablet:w-full"
        >
          <div className=" w-full flex items-center flex-col px-4 mb-4">
            <div className="w-40 h-40 flex items-center justify-center border-2 border-gray-500 border-dashed rounded-full ">
              <div className="">
                {perfil ? (
                  <img
                    className="rounded-full"
                    src={URL.createObjectURL(perfil)}
                    width={150}
                    height={150}
                    alt="Perfil"
                  />
                ) : (
                  <img
                    src="/perfil.jpg"
                    width={150}
                    height={150}
                    alt="Perfil"
                  />
                )}
              </div>

              <input
                id="file_input"
                defaultValue={perfil}
                name="file"
                type={"file"}
                hidden
                onChange={(e: any) => setPerfil(e.target.files[0])}
              />
            </div>
            <div className="py-5 w-full flex flex-col items-center justify-center">
              <label
                htmlFor="file_input"
                className="bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal cursor-pointer hover:bg-blue-700 "
              >
                {" "}
                Escolha imagen
              </label>
              {error && <span className="text-lg text-red-600">{error}</span>}
            </div>
          </div>

          <div className="w-full flex flex-col px-4 mb-4">
            <label className="font-normal py-2  text-lg">Nome</label>
            <input
              className="outline-none border border-gray-300  rounded-sm px-3 py-2 "
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between  px-4 mb-4 tablet:flex-col">
            <div className="flex flex-col w-customW tablet:w-full ">
              <label className="font-normal py-2 text-lg tablet:w-full">
                E-mail
              </label>
              <input
                className="outline-none border border-gray-300  rounded-sm px-3 py-2 "
                type={"text"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" flex flex-col w-customW tablet:w-full">
              <label className="font-normal py-2 text-lg">Password</label>
              <input
                className="outline-none border border-gray-300  rounded-sm px-3 py-2 "
                type={"text"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full px-4 mb-4">
            <label className="font-normal py-2 text-lg">Descrição</label>
            <textarea
              value={msg}
              className="outline-none border border-gray-300  h-32 px-3 py-2 "
              placeholder="...."
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <div className="mt-5 mb-5 px-4 flex items-center justify-center">
            <Button
              title="Alterar Dados"
              className="bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal hover:bg-blue-700"
              click={handlePerfil}
            />
          </div>
        </form>
        
      </div>
    </LayoutAdmin>
  );
};
export default Update;
export const getServerSideProps = async (ctx: any) => {
  const { blogCookie: token } = parseCookies(ctx) as any;
  const user = await api.getUser(token);

  const userDados = user.userDados;

  return {
    props: {
      userDados,
    },
  };
};
