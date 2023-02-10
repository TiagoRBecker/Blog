import { useState } from "react";
import Button from "../../../../components/Button";
import { LayoutAdmin } from "../../../../components/LayoutAdmin/index";
import { categories } from "../../../../utils/navlink";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [content, setContent] = useState("");
  const [imagem, setImagem] = useState("");
  const [selectValue, setSelectValue] = useState<any>(0);
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log(title, content ,selectValue, imagem);
  };

  return (
    <LayoutAdmin>
      <div className="w-full h-full  overflow-auto ">
        <h1 className=" px-5 py-5 text-2xl text-gray-600 ">Criar Novo Post</h1>
        <div className="flex px-5 ">
          <form className="w-full -h-full flex" method="POST" encType="multipart/form-data">
            <div className="w-4/5 py-5  bg-white border border-gray-400 rounded-md">
              <div className="px-10 p-2 w-full">
                <input
                  type="text"
                  placeholder="Titulo do Post"
                  className="w-full h-12 rounded-md pl-5 border border-gray-400 outline-none "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="px-10 h-80 py-2 w-full">
                <textarea
                  placeholder="Digite o texto do Post"
                  className="w-full h-full pl-5 py-5 border border-gray-400 rounded-md outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="w-1/5 flex h-full bg-red-100  items-center flex-col">
              <div className="pb-5">
                <h2 className="text-2xl text-gray-600">Categorias</h2>
              </div>
              <div className="pb-5">
                <select
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  className=""
                >
                  <option  selected>Selecione a Categoria</option>
                  {categories.map((category: any, indice: number) => (
                    
                    <option key={indice} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pb-5 flex flex-col">
                <h2 className="text-2xl text-gray-600 text-center pb-5">Imagem</h2>
                <input type="file" className="w-full h-9 rounded-md pl-5 border border-gray-400 outline-none" />
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
      </div>
    </LayoutAdmin>
  );
};
export default Posts;
