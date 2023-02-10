import { useEffect, useState } from "react";
import { LayoutAdmin } from "../../components/LayoutAdmin";
import api from "../../utils/api";
import { ChartJs } from "../../components/Chartjs";

const Admin = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [viewCountDados, setViewCountDados] = useState([]);
  const [like, setLike] = useState([]);
  const [deslike, setDeslike] = useState([]);
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
        data: [allPosts],
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
        data: [like],
        borderColor: "rgba(77,166,253,0.85)",
        backgroundColor: "#4169E1",
        borderWidth: 1,
      },
      {
        label: "Deslike",
        data: [deslike],
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
      <div className="w-full h-full overflow-auto pb-20 relative  ">
        
        <h1 className="px-5 py-5 text-2xl text-gray-600">Relátorio Posts</h1>
      <div className="absolute w-full ">
      <div className="px-5  pb-20 w-full">
          <ChartJs dataChart={data as any} optionsChart={options as any} />
      </div>
      <div className="px-5 pb-20 w-full">
          <ChartJs
            dataChart={data_doug as any}
            optionsChart={options_doug as any}
          />
      </div>


      </div>
        
      </div>
    </LayoutAdmin>
  );
};

export default Admin;
