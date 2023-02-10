import RingLoader from "react-spinners/RingLoader";

export const Loading  = ()=>{
    return (
       <section className="w-full h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-50 bg-loading">
        <RingLoader color="#36d7b7" size={250} />
        <p className="text-white text-2xl">Carregando</p>
       </section>
    )
}

