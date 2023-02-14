import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/Auth/AuthContex";
import { LayoutAdmin } from "../../../../components/LayoutAdmin/index";
import { categories } from "../../../../utils/navlink";
import Lottie from "lottie-react";
import sucess from "../../../../components/Lottie/sucess.json";
import Button from "../../../../components/Button";
import axios from "axios";
import Router from "next/router";
import { Loading } from "../../../../components/Loading";





const Posts = () => {
  const { user } = useContext(AuthContext);
  const [lottie, setLottie] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectValue, setSelectValue] = useState<any>(0);
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState();
  
  useEffect(() => {
      setErrorCategory(false)
  }, [selectValue]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (Number(selectValue) === 0) {
      setErrorCategory(true);
      alert("Necessario escolher uma categoria");
      
      return;
    }
    if(!title || !content || !perfil ){
      return alert("Necessario preencher os campos vaxios ")
    }

    //title,content,authorId,authorName,categoriesId,url
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorId", user?.id as any);
    formData.append("authorName", user?.name as any);
    formData.append("categoriesId", selectValue);
    formData.append("file", perfil as any);
 
    setLoading(true)
    const createPost = await axios.post("https://apiblog-production.up.railway.app/posts",formData)
    .then((response)=>{
      setLoading(false)
      setLottie(true)
       console.log(response)
    })
    .catch((e)=>{
        console.log(e)
        setLoading(false)
        setLottie(false)
        setErrorFile(true)
      
     
    })
   /* const createNewPost = await  axios
      .post("http://localhost:8080/posts", formData)
      .then((response) => {
        if (response.data === 200) {
          console.log(response)
          
         
        }
      })
      .catch((error: any) => {
        if (error.response) {
          setError(error.response.data.msg);
         

        } else {
          
        }*/


  };
  const handleAddPost = () => {
    Router.push("/Admin/posts/add-new-post");
    setTitle("");
    
  };
  const handlePost = () => {
    Router.push("/Admin/posts/blog-post");
  };

  return (
    <LayoutAdmin>
      <div className="w-full relative  ">
     
       {loading && <Loading className="absolute top-5 w-full h-full flex items-center justify-center flex-col  bgGlobal " size={150} title="Carregando"/>}
       {lottie &&  
       <div className="absolute top-5 w-full h-full flex items-center justify-center flex-col  bgGlobal  ">
        <span className="text-white text-xl">Post publicado com sucesso</span>
         <div className="w-80 h-80">
            <Lottie
              height={150}
              width={150}
              animationData={sucess}
              loop={true}
            />
            
            </div>
            <div className=" w-full flex items-center justify-center gap-5">
              <Button
                title="Visualizar"
                className=" w-36 bg-blue-600 mt-2 py-2 text-white text-xs px-2 rounded-md font-normal cursor-pointer hover:bg-blue-700"
                click={handlePost}
              />
              <Button
                title="Adicionar Novo"
                className="w-36 bg-blue-600 mt-2 py-2 text-white text-xs px-2 rounded-md font-normal cursor-pointer hover:bg-blue-700"
                click={handleAddPost}
              />
            </div>
        
        </div>
       }
        <h1 className=" px-5 py-5 text-2xl text-gray-600 ">Criar Novo Post</h1>
        <div className=" w-full flex px-5 gap-5 tablet:flex-col-reverse ">
          <form
            className="w-3/5 -h-full flex tablet:w-full "
            method="POST"
            encType="multipart/form-data"
          >
            <div className="w-full py-3 px-3 rounded-sm shadowBox ">
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
              <div className="px-3 py-3">
                <select
                  
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  className={
                    errorCategory
                      ? "border-2 border-red-600"
                      : "border border-gray-400 outline-none "
                  }
                >
                  <option value={0}>Selecionar categoria</option>
                  {categories.map((category: any, indice: number) => (
                    <option key={indice} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
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
          </form>
          <div className="w-2/5  px-3 tablet:w-full ">
            <div className={errorFile ? "w-full flex h-full items-center justify-between flex-col rounded-sm shadowBox bg-white border border-red-500" :"w-full flex h-full items-center justify-between flex-col rounded-sm shadowBox bg-white  "}>
             
             
              <div className=" w-full flex flex-col border ">
                <div className="w-full h-96 flex items-center justify-center">
                  {perfil ? (
                    <Image
                      className="w-full "
                      src={URL.createObjectURL(perfil)}
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
        </div>
        <div className="w-full flex items-center justify-center py-5">
          <Button
            click={handleClick}
            title="Publicar"
            className="w-36 bg-blue-600 py-2 text-white text-xs px-2 rounded-sm font-normal cursor-pointer hover:bg-blue-700"
          />
        </div>
       
      </div>
    </LayoutAdmin>
  );
};
export default Posts;
