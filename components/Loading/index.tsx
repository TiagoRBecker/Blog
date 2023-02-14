import { HtmlProps } from "next/dist/shared/lib/html-context";
import RingLoader from "react-spinners/RingLoader";
type Props = {
    size:number,
    className:string
    title:string
}
export interface Span {
    span:HtmlProps
}
export const Loading  = ({size,className, title}:Props)=>{
    return (
       <section className={className}>
        <RingLoader
        
        color="#36d7b7" size={size} />
        <p className="text-center">{title}</p>
        </section>
    )
}

