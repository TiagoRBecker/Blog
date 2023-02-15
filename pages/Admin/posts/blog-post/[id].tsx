import Image from "next/image";
import Router from "next/router";
import { GetStaticProps } from "next";
import { useContext, useState, useEffect } from "react";
import { ParsedUrlQuery } from "querystring";
import { AuthContext } from "../../../../context/Auth/AuthContex";
import { LayoutAdmin } from "../../../../components/LayoutAdmin";
import {AiFillEdit, AiFillDelete,AiOutlineSave,AiOutlineEye,AiFillLike,AiFillDislike,AiFillCloseSquare} from "react-icons/ai";
import { Loading } from "../../../../components/Loading";
import { Modal } from "../../../../components/Modal";
import { categories } from "../../../../utils/navlink";
import Lottie from "lottie-react";
import sucess from "../../../../components/Lottie/sucess.json";
import Button from "../../../../components/Button";
import api from "../../../../utils/api";


const Id = ({ posts }: any) => {

  const { user } = useContext(AuthContext);
  const [showModalDel, setShowModalDel] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lottie, setLottie] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [title, setTitle] = useState(posts.title);
  const [content, setContent] = useState(posts.content);
  const [selectValue, setSelectValue] = useState<any>(0);
  const [perfil, setPerfil] = useState();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [scrool, setScrollUp] = useState(false);

  const formatDate = (data: Date) => {
    return new Date(data).toLocaleDateString("pt-br");
  };
  const handleDelete = (id: number) => {
    alert(`Post ${posts.title} deletado com sucesso`);
    setShowModalDel(false);
    Router.push("/Admin/posts/blog-post");
  };
  const handleSave = () => {
    alert("Post aqruivado com sucesso");
    setShowModalSave(false);
  };

  const openModalDelete = () => {
    setShowModalDel(true);
  };
  const openModalSave = () => {
    setShowModalSave(true);
  };
  const handleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const handleCloseModal = () => {
    setShowModalEdit(false);
    setShowModalDel(false);
    setShowModalSave(false);
  };
  const handleEditPost = async () => {
    if( !perfil){
        alert("Necessario escolher uma imagem !")
    }
    setLoading(true)
    const updatePost = await api.updatePost(posts.id,title,content, perfil as any)
    .then((response)=>{
         if(response){
            setLoading(false)
            setLottie(true)
         }
    })
    .catch((e)=>{
        console.log(e)
        setLoading(false)
    })
    
   
  };
const handleRefresh = ()=>{
    Router.reload()
    setShowModalEdit(false)
    setLottie(false)
}
  return (
    <LayoutAdmin>
      <section className="w-full pb-44 relative flex items-center justify-center flex-col   ">
        <h1 className="px-5 py-5 text-2xl text-gray-600">{posts.title}</h1>
        <div className="flex flex-col">
          <div className=" w-full flex items-center justify-center mb-4">
            <Image
              src={posts.url}
              alt={posts.title}
              width={900}
              height={500}
              className="rounded-md"
            />
          </div>
          <div className=" w-full px-8 py-5">
            <h1 className="py-5 text-2xl text-gray-600">Sinopse</h1>
            <p className="text-lg text-gray-600">{posts.content}</p>
          </div>
          <div className="px-8 py-5">
            <h1 className="text-lg text-gray-400 mb-2 font-bold">
              Autor {user?.name}
            </h1>
            <span>Publicado {formatDate(posts.creatdate)}</span>
          </div>
          <div className="w-full flex items-center justify-center px-8">
            <button className="px-1">
              <AiFillEdit size={35} color={"#1E90FF"} onClick={handleModalEdit} />
            </button>
            <button className="px-1" onClick={openModalDelete}>
              <AiFillDelete size={35} color={"red"} />
            </button>
            <button className=" px-1">
              <AiOutlineSave size={35} color={"#40E0D0"} onClick={openModalSave} />
            </button>
          </div>
          {/*Modal Edit*/}
          <div
            className={
              showModalEdit ? "desktop: w-full  top-2/4  bg-gray-300 absolute tablet:top-0 " : "hidden"
            }
          >
            <div
              className="w-full py-3 flex items-center justify-start pl-3 cursor-pointer"
              onClick={handleCloseModal}
            >
              <AiFillCloseSquare size={25} color={"red"} />
            </div>
            <div className="w-full relative  ">
              {loading && (
                <Loading
                  className="absolute top-5 w-full h-full flex items-center justify-center flex-col  bgGlobal "
                  size={150}
                  title="Carregando"
                />
              )}
              {lottie && (
                <div className="absolute top-5 w-full h-full flex items-center justify-center flex-col  bgGlobal  ">
                  <span className="text-white text-xl">
                    Post editado com sucesso
                  </span>
                  <div className="w-80 h-80">
                    <Lottie
                      height={150}
                      width={150}
                      animationData={sucess}
                      loop={true}
                    />
                  </div>
                  <div className="">
                    <Button title="Atualizar" className="w-36 bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal cursor-pointer hover:bg-blue-700" click={handleRefresh}/>
                    </div>
                </div>
              )}

              <div className=" desktop: w-full flex px-5 gap-5 tablet:flex-col ">
                <form
                  className="w-full  gap-2 flex tablet:flex-col "
                  method="POST"
                  encType="multipart/form-data"

                >
               
                  <div className="w-3/5 py-3 px-3 rounded-sm shadowBox tablet:w-full ">
                    <div className="px-2 p-2 w-full">
                      <input
                        type="text"
                        placeholder="Titulo do Post"
                        className="w-full h-12 rounded-md pl-5 border border-gray-400 outline-none "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="px-2 h-80 py-2 w-full">
                      <textarea
                        placeholder="Digite o texto do Post"
                        className="w-full h-full pl-5 py-5 border border-gray-400 rounded-md outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value) as any}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-2/5  px-3 tablet:w-full ">
                    <div
                      className={
                        errorFile
                          ? "w-full flex h-full items-center justify-between flex-col rounded-sm shadowBox bg-white border border-red-500"
                          : "w-full flex h-full items-center justify-between flex-col rounded-sm shadowBox bg-white  "
                      }
                    >
                      <div className=" w-full flex flex-col border ">
                        <div className="w-full h-96 flex items-center justify-center">
                          {perfil ? (
                            <Image
                              className="w-full "
                              src={window.URL.createObjectURL(perfil)}
                              width={150}
                              height={150}
                              alt="Not Found"
                            />
                          ) : (
                            <img
                              src="/notfound.webp"
                              width={150}
                              height={150}
                              alt="Perfil"
                            />
                          )}
                          <input
                            id="file_input"
                            defaultValue={perfil}
                            name="file"
                            type={"file"}
                            hidden
                            onChange={(e: any) => setPerfil(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="py-5 w-full flex flex-col items-center justify-center">
                        <label
                          htmlFor="file_input"
                          className="bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal cursor-pointer hover:bg-blue-700 "
                        >
                          {" "}
                          Escolha imagen
                        </label>
                      </div>
                    </div>
                  </div>
                
                </form>
              </div>
              <div className="w-full flex items-center justify-center py-3">
                <Button
                  click={handleEditPost}
                  title="Editar"
                  className="w-36 bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal cursor-pointer hover:bg-blue-700"
                />
              </div>
            </div>
          </div>
          {/*Final */}
        </div>
      </section>
    </LayoutAdmin>
  );
};
export default Id;
export const getStaticPaths = async () => {
  const response = await api.getAllPost();
  const data = await response.post;

  const paths = data.map((item: any) => ({
    params: {
      id: item.id.toString(),
    },
  }));

  return { paths, fallback: false };
};
export interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const response = await api.getOnePost(id);

  return {
    props: {
      posts: response.getOne,
    },
  };
};
