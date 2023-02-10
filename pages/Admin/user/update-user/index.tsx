import {useState} from "react"
import { parseCookies } from "nookies";
import { LayoutAdmin } from "../../../../components/LayoutAdmin"
import Button from "../../../../components/Button";
import api from "../../../../utils/api";
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
  
const Update = ({userDados}:Props)=>{
const [email, setEmail] = useState(userDados.email);
const [name, setName]   = useState(userDados.name);
const [pass, setPass]   = useState("*******************");
const handleDados = ()=>{
    console.log(!"ok")
}
    return(
        <LayoutAdmin>
           
          <div className="w-full h-full pb-30 " >
            <div className=" w- full h-full flex justify-start pt-2 flex-col  rounded-md shadow-2xl border border-gray-300 tablet:h-screen ">
                
                <h1 className="w-full  text-center  px-4 text-gray-600 text-2xl font-bold  border-gray-500">
                  Dados Cadastrados
                </h1>
              <form className="w-6/12 flex flex-col px-5  mx-auto border border-gray-200 rounded-sm tablet:w-full">
                <div className="w-full flex flex-col px-4 mb-4">
                  <label className="font-normal py-2  text-lg">Nome</label>
                  <input
                    className="outline-none border border-gray-300  rounded-sm px-3 py-2 bg-[#ccc]"
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between  px-4 mb-4 tablet:flex-col">
                  <div className="flex flex-col w-customW tablet:w-full ">
                    <label className="font-normal py-2 text-lg tablet:w-full">E-mail</label>
                    <input
                      className="outline-none border border-gray-300  rounded-sm px-3 py-2 bg-[#ccc] tablet:w"
                      type={"text"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" flex flex-col w-customW tablet:w-full">
                    <label className="font-normal py-2 text-lg">Password</label>
                    <input
                      className="outline-none border border-gray-300  rounded-sm px-3 py-2 bg-[#ccc]"
                      type={"text"}
                      value={"****************"}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full px-4 mb-4">
                  <label className="font-normal py-2 text-lg">Descrição</label>
                  <textarea
                    value={
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iste exercitationem asperiores iure optio inventore ex. Iste accusantium, ipsa similique quia ipsam sequi fugiat maiores nobis dignissimos excepturi! Aspernatur, nesciunt."
                    }
                    className="outline-none border border-gray-300  h-32 px-3 py-2 bg-[#ccc]"
                    placeholder="...."
                  ></textarea>
                </div>
                <div className="mt-5 mb-5 px-4 flex items-center justify-center">
                  <Button
                    title="Alterar Dados"
                    className="bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal hover:bg-blue-700"
                    click={handleDados}
                  />
                </div>
              </form>
            </div>
        </div>
        

        </LayoutAdmin>
    )
}
export default Update;
export const getServerSideProps: any = async (ctx: any) => {
    const { blogCookie: token } = parseCookies(ctx) as any;
  
    if (!token) {
      return true;
    }
  
    const user = await api.getUser(token);
    
    const userDados = user.user;
  
    return {
      props: {
        userDados,
        
      },
    };
  };
  