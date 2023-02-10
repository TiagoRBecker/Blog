import Image from "next/image";
import { DataPosts } from "../../utils/Types/data";
import Button from "../Button";
import { FcLike, FcDislike } from "react-icons/fc";
import axios from "axios";
import Router from "next/router";

const handleClick = () => {
  console.log("ok");
};

const Posts = ({
  title,
  content,
  creatdate,
  url,
  categorie,
  id,
  viewCount,
  like,
  deslike,
  
}: DataPosts) => {
  const handleLike = async () => {
    const like = await axios.put("http://localhost:8080/posts/2/like");
    Router.push("/blog/home");
  };
  const handleDeslike = async () => {
    const Deslike = await axios.put("http://localhost:8080/posts/2/like");
    Router.push("/blog/home");
  };
  return (
   
      <div className="flex w-full h-full flex-col">
        <div className="w-full h-full flex py-10 px-2  items-center justify-center">
          <div className="w-2/4 h-1/5  ">
            <Image
              className="w-full h-72"
              src={url as string}
              width={450}
              height={250}
              alt={title as string}
            />
          </div>
          <div className="w-3/6  h-full flex items-center justify-around flex-col">
            <div className="flex items-center justify-center py-4 h-full">
              Publicado : {creatdate as any}
            </div>
            <div className="text-center text-lg font-bold text-black ">
              <h1>{title}</h1>
            </div>
           
            <div className="py-3">
              <p>Categoria : {categorie as any}</p>
            </div>
            <div className=" flex w-full items-center justify-around ">
              <span>Visualizações {viewCount}</span>
              <div className="flex w-1/4 items-center justify-around my-3">
                <button onClick={handleLike}>
                  <p className=" flex items-center justify-center gap-2  mx-2">
                    <FcLike size={20} />
                    {like}
                  </p>
                </button>
                <button onClick={handleDeslike}>
                  <p className=" flex items-center justify-center gap-2">
                    <FcDislike size={20} />
                    {deslike}
                  </p>
                </button>
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-2 ">
              <Button
                className="bg-gray-900 text-white w-36 py-1 rounded-lg"
                title="Ler mais"
                click={handleClick}
              />
            </div>
          </div>
        </div>
        <span className="w-96 h-0.5 bg-gray-900 my-5 mx-auto"></span>
      </div>
   
  );
};

export default Posts;
