import { useEffect, useState } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import { ChartJs } from "../../components/Chartjs";
import {
  AiFillBook,
  AiFillEye,
  AiFillLike,
  AiFillDislike,
  AiOutlineDesktop,
  AiOutlineMobile,
  AiOutlineTablet,
} from "react-icons/ai";
import api from "../../utils/api";

const Admin = () => {
  const [allPostCountDados, setAllPosts] = useState([]);
  const [viewCountDados, setViewCountDados] = useState([]);
  const [likeCountDados, setLike] = useState([]);
  const [deslikeCountDados, setDeslike] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPostsDados = async () => {
      const posts = await api.getAllPost();
      const json = await posts.post;

      const views = json.reduce((acc: number, currvalue: any) => {
        return acc + currvalue.viewCount;
      }, 0);
      const likes = json.reduce((acc: number, currvalue: any) => {
        return acc + currvalue.like;
      }, 0);
      const deslikes = json.reduce((acc: number, currvalue: any) => {
        return acc + currvalue.deslike;
      }, 0);
      setAllPosts(json.length);
      setViewCountDados(views);
      setLike(likes);
      setDeslike(deslikes);
      setLoading(false);
    };
    getPostsDados();
  }, []);

  const data = {
    labels: ["Publicados , Views, Likes, Deslikes"],
    datasets: [
      {
        label: "Publicados",
        data: [allPostCountDados],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "	#1E90FF",
        borderWidth: 1,
      },
      {
        label: "Views",
        data: [viewCountDados],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "#40E0D0",
        borderWidth: 1,
      },
      {
        label: "Likes",
        data: [likeCountDados],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "#4169E1",
        borderWidth: 1,
      },
      {
        label: "Deslike",
        data: [deslikeCountDados],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "#FF0000",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Relatorio de dados ",
        font: {
          size: 20,
        },
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 12,
            color: "#fff",
          },
        },
      },
    },
  };
  const data_doug = {
    labels: ["Mobile, Tablet, Pc, teste"],
    datasets: [
      {
        label: "Mobile",
        data: ["290"],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "	#1E90FF",
        borderWidth: 1,
      },
      {
        label: "Tablet",
        data: ["126"],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "#40E0D0",
        borderWidth: 1,
      },
      {
        label: "Pc",
        data: ["590"],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "#4169E1",
        borderWidth: 1,
      },
    ],
  };
  const options_doug = {
    plugins: {
      title: {
        display: true,
        text: "Relátorio Acesso ",
        font: {
          size: 20,
        },
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 12,
          },
        },
      },
    },
  };
  return (
    <LayoutAdmin>
      <div className="w-full flex items-center justify-center flex-col  ">
        <h1 className="px-5 py-5 text-2xl text-gray-600">Relátorio Posts</h1>
        <div className="w-full h-full  grid grid-cols-4 gap-5 px-5 cel:grid-cols-2 minCel:block  ">
          
            <div className=" flex flex-col justify-between  items-center w-full  h-full bg-white borderPosts    rounded-lg py-7 cel:mb-5 ">
              <div className="">
                <h3 className="w-full inline-flex items-center justify-center text-lg text-blueC font-bold">
                  Publicados
                </h3>
                <span className="text-center text-xl text-gray-400 font-bold w-full  inline-flex items-center justify-center">
                  {allPostCountDados}
                </span>
              </div>
              <div className="">
                <AiFillBook size={35} color={"#ccc"} />
              </div>
            </div>
            <div className=" flex flex-col justify-between  items-center w-full h-full bg-white borderViews  rounded-lg py-7 cel:mb-5 ">
              <div className="w-3/5 ">
                <h3 className="w-full inline-flex items-center justify-center text-lg text-greenC font-bold">
                  Visualizados
                </h3>
                <span className="text-center text-xl text-gray-400 font-bold w-full  inline-flex items-center justify-center">
                  {viewCountDados}
                </span>
              </div>
              <div className="w-1/5">
                <AiFillEye size={35} color={"#ccc"} />
              </div>
            </div>
            <div className=" flex flex-col justify-between  items-center w-full bg-white borderLikes  rounded-lg py-7 cel:mb-5 ">
              <div className="">
                <h3 className="w-full inline-flex items-center justify-center text-lg text-blueC2 font-bold">
                  Likes
                </h3>
                <span className="text-center text-xl text-gray-400 font-bold w-full  inline-flex items-center justify-center">
                  {likeCountDados}
                </span>
              </div>
              <div className="">
                <AiFillLike size={35} color={"#ccc"} />
              </div>
            </div>
            <div className=" flex flex-col justify-between  items-center w-full  bg-white borderDeslikes  rounded-lg py-7 cel:mb-5 ">
              <div className="">
                <h3 className="w-full inline-flex items-center justify-center text-lg text-red-600 font-bold">
                  Deslikes
                </h3>
                <span className="text-center text-xl text-gray-400 font-bold w-full  inline-flex items-center justify-center">
                  {deslikeCountDados}
                </span>
              </div>
              <div className="">
                <AiFillDislike size={35} color={"#ccc"} />
              </div>
            </div>
          
        </div>
        <div className="px-5   w-full">
          <ChartJs dataChart={data as any} optionsChart={options as any} />
        </div>
        <h1 className="px-5 py-10 text-2xl text-gray-600">Relatório de Dispositivos</h1>
        <div className="px-5  w-full h-full grid grid-flow-col 2">
       
          <div className="w-full flex tablet:flex-col">

            <div className="w-1/5 h-full flex items-center justify-start flex-col gap-5 px-5 tablet:w-full tflex">

            <div className="flex flex-col gap-5 items-center justify-center h-full tablet:w-full ">
           
              <div className=" flex items-center justify-center w-40 h-12 borderDesk px-1 rounded-lg py-2">
                <AiOutlineDesktop size={34} />
              </div>
              <div className=" flex items-center justify-center w-40 h-12 borderMobile px-1 rounded-lg py-2">
                <AiOutlineMobile size={34} />
              </div>
              <div className=" flex items-center justify-center w-40 h-12  borderTablet px-1 rounded-lg py-2">
                <AiOutlineTablet size={34} />
              </div>
            </div>
            </div>
            <div className="w-4/5 h-full">
              <ChartJs
                dataChart={data_doug as any}
                optionsChart={options_doug as any}
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Admin;
