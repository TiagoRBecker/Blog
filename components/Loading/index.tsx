import RingLoader from "react-spinners/RingLoader";
type Props = {
    size:number,
    className:string
}
export const Loading  = ({size,className}:Props)=>{
    return (
       <section className="w-full h-screen absolute top-0 -left-5 right-0 bottom-0 flex flex-col items-center justify-center z-50 bg-loading">
        <RingLoader color="#36d7b7" size={size} />
        <p className={className}>Carregando</p>
       </section>
    )
}

