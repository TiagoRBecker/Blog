import { useState } from "react";
import { parseCookies } from "nookies";
import { LayoutAdmin } from "../../../../components/LayoutAdmin";
import Button from "../../../../components/Button";
import api from "../../../../utils/api";
import axios from "axios";

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

  const handlePerfil = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", perfil as any);
    formData.append("name", name);
    formData.append("email", email);

    try {
      const userProfiler = await axios.post(
        "http://localhost:8080/upload",
        formData,

        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (userProfiler.status === 200) {
        return console.log(userProfiler.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error);
      } else {
        console.log("Tente novamente mais tarde");
      }
    }
  };

  return (
    <LayoutAdmin>
      <div className=" w- full py-10 flex items-center justify-center   flex-col  rounded-md shadow-2xl border border-gray-300  ">
        <h1 className="w-full  text-center  px-4 py-5 text-gray-600 text-2xl font-bold  border-gray-500">
          Dados Cadastrados
        </h1>

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
            <div className="py-5 w-full flex items-center justify-center">
              <label
                htmlFor="file_input"
                className="bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal cursor-pointer hover:bg-blue-700 "
              >
                {" "}
                Escolha imagen
              </label>
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
  console.log(token);

  const user = await api.getUser(token);

  const userDados = user.userDados;

  return {
    props: {
      userDados,
    },
  };
};
