import Image from "next/image";
import { FcLike, FcDislike } from "react-icons/fc";
import { DataPosts } from "../../utils/Types/data";
import Button from "../Button";
export const LikePosts = ({
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
  const handleClick = () => {
    console.log("ok");
  };
  return (
  
      <div className="flex items-center justify-center flex-col py-4">
        <div className=" py-5 font-bold text-lg">
          <h1>{title}</h1>
        </div>
        <div className="px-2">
          <Image
            src={url as string}
            width={500}
            height={500}
            alt={title as string}
          />
        </div>
        <div className=" flex items-center justify-center py-2">
          <p className=" flex items-center justify-center gap-2  mx-2">
            <FcLike size={35} />
            {like}
          </p>
          <p className=" flex items-center justify-center gap-2">
            <FcDislike size={35} />
            {deslike}
          </p>
        </div>
        <div className="">
          <Button
            className="bg-white w-32 py-1 rounded-lg text-gray-900 font-bold mt-3"
            title="Saiba mais ..."
            click={handleClick}
          />
        </div>
      </div>
  
  );
};
