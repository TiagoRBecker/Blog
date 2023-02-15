import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import {
  MdOutlineLogout,
  MdOutlineVerticalSplit,
  MdNoteAdd,
  MdOutlinePersonPin,
  MdOutlineSearch,
  MdOutlineBorderColor,
  MdMenu,
  MdOutlineArchive,
} from "react-icons/md";
import { AuthContext } from "../../context/Auth/AuthContex";
import { DropDown } from "../DropDown";
import { parseCookies } from "nookies";
import api from "../../utils/api";
export type Children = {
  children: React.ReactNode;
};

export const LayoutAdmin = ({ children }: Children) => {
  const router = useRouter();
  const { ["blogCookie"]: token } = parseCookies();
  const [mobile, setMobile] = useState(false);
  const { signOut, user, loading } = useContext(AuthContext);

  useEffect(() => {
    user;
  }, [user]);
  const Logout = () => {
    signOut();
  };
  const closedMenu = () => {
    setMobile(false);
  };
  const openMobile = () => {
    setMobile(!mobile);
  };
  return (
    <>
      <header className="w-full h-20 border-b border-blueC">
        <div className="w-full h-full  flex items-center   tablet:w-full   ">
          <div className=" w-1/5 h-full  flex  items-center justify-center">
            Logo
          </div>
          <div className="w-3/5 h-full flex items-center justify-end  px-5 relative tablet:hidden">
            <input
              type="text"
              placeholder="Digite uma busca"
              className="outline-none border border-gray-500 rounded-md px-3 py-1 w-3/5 "
            />
            <MdOutlineSearch
              className="absolute top-1.7 right-5 mx-2 "
              size={20}
            />
          </div>

          <div className=" w-1/5 flex  items-center justify-center tablet:hidden  ">
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <span className="w-8 h-8 flex bg-gray-300 rounded-full "></span>
                <p>carregando</p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                {user?.avatar && (
                  <img
                    src={user?.avatar}
                    width={32}
                    height={32}
                    alt="perfil"
                    className="rounded-full"
                  />
                )}
                <DropDown
                  nameDrop={user?.name}
                  nameCreate="Perfil Usuário"
                  nameEdit="Editar Perfil"
                  nameDelete="Logout"
                />
              </div>
            )}
          </div>

          <div
            className="hidden tablet:flex w-full h-full items-center  justify-end cursor-pointer"
            onClick={openMobile}
          >
            <MdMenu size={29} />
          </div>
        </div>
      </header>

      {/*Mobile Menu*/}
      <nav
        className={
          mobile
            ? "bg-white w-full h-screen flex   justify-center absolute top-20 z-50"
            : "hidden"
        }
      >
        <ul className="hidden/ closedMenu tablet: py-11 w-full flex - flex-col item-center  ">
          <li
            className={
              router.pathname === "/Admin"
                ? "mb-5  w-full  text-blue-600  "
                : " w-full hover:text-blue-600"
            }
          >
            <Link href={"/Admin"} onClick={closedMenu}>
              <div className="flex gap-2 mb-5 ">
                <div className="w-14 flex items-start justify-center">
                  <MdOutlineBorderColor size={25} />
                </div>
                <div className="flex items-center justify-start ">
                  <h3>Dashboard</h3>
                </div>
              </div>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/Admin/posts/blog-post" ||
              router.pathname === "/Admin/posts/blog-post/[id]"
                ? "mb-5  w-full   text-blue-600 "
                : " w-full hover:text-blue-600"
            }
          >
            <Link href={"/Admin/posts/blog-post"} onClick={closedMenu}>
              <div className="flex gap-2 mb-5 ">
                <div className="w-14 flex items-start justify-center">
                  <MdOutlineVerticalSplit size={25} />
                </div>
                <div className="flex items-center justify-start">
                  <h3>Blog Posts</h3>
                </div>
              </div>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/Admin/posts/add-new-post"
                ? "mb-5  w-full   text-blue-600 "
                : "pb-5 w-full hover:text-blue-600"
            }
          >
            <Link href={"/Admin/posts/add-new-post"} onClick={closedMenu}>
              <div className="flex gap-2 mb-5">
                <div className="w-14 flex items-center justify-center">
                  <MdNoteAdd size={25} />
                </div>
                <div className=" flex items-center justify-start ">
                  <h3>{"Criar Novo Post"}</h3>
                </div>
              </div>
            </Link>
          </li>
          <li
            className={
              router.pathname === "/Admin/user/perfil"
                ? "mb-5  w-full   text-blue-600 "
                : "pb-5  w-full hover:text-blue-600"
            }
          >
            <Link href={"/Admin/user/perfil"} onClick={closedMenu}>
              <div className="flex gap-2 mb-5">
                <div className="w-14 flex items-start justify-center">
                  <MdOutlinePersonPin size={25} />
                </div>
                <div className="flex items-center justify-start ">
                  <h3>{"Perfil Usuário"}</h3>
                </div>
              </div>
            </Link>
          </li>
          <li className="mb-5  w-full pb-5 cursor-pointer" onClick={Logout}>
            <div className="flex gap-2 mb-5">
              <div className="w-14 flex items-start justify-center">
                <MdOutlineLogout size={25} color={"red"} />
              </div>
              <div className="flex items-center justify-start ">
                <h3>{"Logout"}</h3>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <section className="gridT">
        <aside className="aside tablet:hidden">
          <nav className="w-full flex  items-center justify-center ">
            <ul className="py-20 w-full flex - flex-col item-center   ">
              <li
                className={
                  router.pathname === "/Admin"
                    ? "mb-5  w-full  text-blue-600  "
                    : "pb-5 w-full hover:text-blue-600"
                }
              >
                <Link href={"/Admin"}>
                  <div className="flex gap-2 mb-5 ">
                    <div className="w-14 flex items-start justify-center">
                      <MdOutlineBorderColor size={25} />
                    </div>
                    <div className="flex items-center justify-start ">
                      <h3>Dashboard</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/Admin/posts/blog-post" ||
                  router.pathname === "/Admin/posts/blog-post/[id]"
                    ? "mb-5  w-full   text-blue-600 "
                    : "pb-5  w-full hover:text-blue-600"
                }
              >
                <Link href={"/Admin/posts/blog-post"}>
                  <div className="flex gap-2  mb-5">
                    <div className="w-14 flex items-start justify-center">
                      <MdOutlineVerticalSplit size={25} />
                    </div>
                    <div className="flex items-center justify-start">
                      <h3>Blog Posts</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/Admin/posts/add-new-post"
                    ? "mb-5  w-full   text-blue-600 "
                    : "pb-5  w-full hover:text-blue-600"
                }
              >
                <Link href={"/Admin/posts/add-new-post"}>
                  <div className="flex gap-2 mb-5">
                    <div className="w-14 flex items-center justify-center">
                      <MdNoteAdd size={25} />
                    </div>
                    <div className=" flex items-center justify-start ">
                      <h3>{"Criar Novo Post"}</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/Admin/user/perfil" ||
                  router.pathname === "/Admin/user/update-user"
                    ? "mb-5 w-full   text-blue-600 "
                    : "pb-5 w-full hover:text-blue-600"
                }
              >
                <Link href={"/Admin/user/perfil"}>
                  <div className="flex gap-2 mb-5">
                    <div className="w-14 flex items-start justify-center">
                      <MdOutlinePersonPin size={25} />
                    </div>
                    <div className="flex items-center justify-start ">
                      <h3>{"Perfil Usuário       "}</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/Admin/user/arquivados" 
                    ? "mb-5 w-full   text-blue-600 "
                    : "pb-5 w-full hover:text-blue-600"
                }
              >
                <Link href={"/Admin/posts/archived"}>
                  <div className="flex gap-2 mb-5">
                    <div className="w-14 flex items-start justify-center">
                      <MdOutlineArchive size={25} />
                    </div>
                    <div className="flex items-center justify-start ">
                      <h3>{"Arquivados"}</h3>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main">{children}</main>
      </section>
    </>
  );
};
