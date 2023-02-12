import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/Auth/AuthContex";
import { MdCloudUpload } from "react-icons/md";
import { LayoutAdmin } from "../../../../components/LayoutAdmin/index";
import { categories } from "../../../../utils/navlink";
import Button from "../../../../components/Button";
import axios from "axios";
import sucess from "../../../../components/Lottie/sucess.json";
import Router from "next/router";
import Lottie from "lottie-react";
import { Loading } from "../../../../components/Loading";

const Posts = () => {
  
  const { user } = useContext(AuthContext);
  const [lottie, setLottie] = useState(false)
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState(user?.name);
  const [content, setContent] = useState("");
  const [selectValue, setSelectValue] = useState<any>(0);
  const [ loading ,setLoading] = useState(false)

  useEffect(() => {}, []);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (Number(selectValue) === 0) {
      setError(true);
      alert("Necessario escolher uma categoria");
      return;
    }
    setLoading(true)
    //title,content,authorId,authorName,categoriesId,url
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorId", user?.id as any);
    formData.append("authorName", autor as any);
    formData.append("categoriesId", selectValue);
    formData.append("file", image);
    const createNewPost = axios
      .post("https://https://blog-uuxg.vercel.app/posts", formData)
      .then((response) => {
        if(response.data ===200){
          setLoading(false)
          setLottie(true)
          setTitle('')
          setContent('')
        }
        
      })
      .catch((error: any) => {
        if (error.response) {
         setError(error.response.data.msg)
         setLoading(false)
        } else {
          Router.push('/500');
        }
      });
  };
  const handleAddPost= ()=>{
    Router.push("/Admin/posts/add-new-post")
    setLottie(false)
   
    
  }
  const handlePost = ()=>{
    Router.push('/Admin/posts/blog-post')
  }

  return (
    <LayoutAdmin>
      <div className="w-full relative  ">
        {loading && <Loading size={150} className="text-black"/>}
        <h1 className=" px-5 py-5 text-2xl text-gray-600 ">Criar Novo Post</h1>
        <div className="flex px-5 ">
          <form
            className="w-full -h-full flex"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="w-4/5 py-5  bg-white ">
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
            <div className="w-1/5 flex h-full items-center flex-col">
              <div className="pb-5">
                <h2 className="text-2xl text-gray-600">Categorias</h2>
              </div>
              <div className="pb-5">
                <select
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  className={
                    error
                      ? "border-2 border-red-600"
                      : "border-2 border-gray-400"
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
              <div className=" w-full pb-5 flex flex-col">
                <div className="w-full">
                  <div className="w-full h-40 flex items-center justify-center cursor-pointer border-2 border-gray-500 border-dashed">
                    {!image ? (
                      <label htmlFor="file_input">
                        <MdCloudUpload size={50} color={"#4169E1"} />
                      </label>
                    ) : (
                      <Image
                        className=" h-full"
                        src={URL.createObjectURL(image as any)}
                        width={200}
                        height={250}
                        alt="Upload"
                      />
                    )}
                  </div>

                  <input
                    id="file_input"
                    name="file"
                    type={"file"}
                    hidden
                    onChange={(e: any) => setImage(e.target.files[0])}
                  />
                  <div className="flex items-center justify-center bg-blue-600 mt-2 py-2 text-white text-xs px-2 rounded-md font-normal cursor-pointer hover:bg-blue-700">
                    <label htmlFor="file_input">Selcionar Imagem</label>
                  </div>
                </div>
              </div>
              <div className="">
                <Button
                  click={handleClick}
                  title="Publicar"
                  className="w-32 py-1 bg-gray-700 mt-10 rounded-md text-white"
                />
              </div>
            </div>
          </form>
        </div>
        <div className={lottie?"lottiePosition lottie":"hidden"}>
          <div className="w-96 h-96">
            
            <Lottie className="-pl-5"   animationData={sucess} loop={true} />
            <div className=" w-full flex items-center justify-center gap-5">
              <Button title="Visualizar" className=" w-36 bg-blue-600 mt-2 py-2 text-white text-xs px-2 rounded-md font-normal cursor-pointer hover:bg-blue-700" click={handlePost}/>
              <Button title="Adicionar Novo" className="w-36 bg-blue-600 mt-2 py-2 text-white text-xs px-2 rounded-md font-normal cursor-pointer hover:bg-blue-700" click={handleAddPost}/>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default Posts;
