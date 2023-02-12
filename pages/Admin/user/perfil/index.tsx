import Link from "next/link";
import { LayoutAdmin } from "../../../../components/LayoutAdmin";
import { parseCookies } from "nookies";
import api from "../../../../utils/api";
import Button from "../../../../components/Button";
export type User = {
  name: string;
  email: string;
  avatar: string;
  posts: [];
};
export type Dados = {
  dados: [];
};
export type Props = {
  credentials: User;
};

const UserDados = ({ credentials }: Props) => {
  const teste = () => {
    if (!credentials.avatar) {
      console.log("NAo tem ");
    } else {
      console.log("tem avatar");
    }
  };
  teste();
  return (
    <LayoutAdmin>
      <div className="w-full  bg-gray-100 overflow-auto    ">
        <h1 className="px-5 py-5 text-2xl text-gray-600 ">Perfil Usuário</h1>

        <div className="flex gap-5 px-5 tablet:flex-col ">
          <div className="w-2/5 h-full bg-white rounded-md shadow-2xl border border-gray-300 tablet:w-full ">
            <div className="w-full flex items-center justify-center ">
              {!credentials.avatar ? (
                <img
                  className="w-36 h-36 rounded-full my-8"
                  src={"/perfil.jpg"}
                  alt="alt"
                />
              ) : (
                <img
                  className="w-36 h-36 rounded-full my-8"
                  src={credentials.avatar}
                  alt="alt"
                />
              )}
            </div>
            <div className="w-full flex items-center justify-center flex-col">
              <h1 className="text-gray-600 text-2xl font-bold">Tiago Becker</h1>
              <p className="text-black font-bold">Desenvolvedor</p>
            </div>
            <div className="w-full py-5 mt-6 border-t border-border-gray-300  border-b tablet:hidden"></div>
            <div className="w-full flex items-center justify-center px-3 py-12 flex-col tablet: max-w-xs mx-auto pt-0 pb-5 ">
              <h1 className="text-gray-600 text-2xl font-bold text-left w-full py-5 tablet:text-center">
                Descrição
              </h1>
              <p className="text-justify text-gray-400 text-sm tablet:px-1 py-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iste
                exercitationem asperiores iure optio inventore ex. Iste
                accusantium, ipsa similique quia ipsam sequi fugiat maiores
                nobis dignissimos excepturi! Aspernatur, nesciunt.
              </p>
            </div>
          </div>

          <div
            className={
              "w-6/12  bg-white rounded-md shadow-2xl border border-gray-300 tablet:w-full h-full"
            }
          >
            <h1 className="w-full text-left py-2 px-4 text-gray-600 text-2xl font-bold border-b border-gray-500">
              Dados Cadastrados
            </h1>
            <form>
              <div className=" flex flex-col px-4 mb-4">
                <label className="font-normal py-2  text-lg">Nome</label>
                <input
                  className="outline-none border border-gray-300  rounded-sm px-3 py-2 bg-[#ccc]"
                  type={"text"}
                  value={credentials.name}
                  disabled
                />
              </div>
              <div className="flex items-center justify-between  px-4 mb-4 w-full">
                <div className="flex flex-col perfilAdmin">
                  <label className="font-normal py-2 text-lg ">E-mail</label>
                  <input
                    className="outline-none border border-gray-300  rounded-sm px-3 py-2 bg-[#ccc]"
                    type={"text"}
                    value={credentials.email}
                    disabled
                  />
                </div>
                <div className=" flex flex-col perfilAdmin ">
                  <label className="font-normal py-2 text-lg">Password</label>
                  <input
                    className="outline-none border border-gray-300  rounded-sm px-3 py-2 bg-[#ccc]"
                    type={"text"}
                    value={"****************"}
                    disabled
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
                  disabled
                  placeholder="...."
                ></textarea>
              </div>
              <div className="mt-5 mb-5 px-4 tablet: flex item-center justify-center">
                <Link href={"/Admin/user/update-user"}>
                  <Button
                    title="Alterar Dados"
                    className="bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal hover:bg-blue-700"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default UserDados;

export const getServerSideProps: any = async (ctx: any) => {
  const { blogCookie: token } = parseCookies(ctx) as any;

  if (!token) {
    return true;
  }

  const user = await api.getUser(token);
  const credentials = user.userDados;

  return {
    props: {
      credentials,
    },
  };
};
