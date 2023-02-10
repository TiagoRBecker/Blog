export type Props ={
    className:string
    title?:string
}

export const Adverts = ({className, title}:Props)=>{
    return(
        <div className={className}>
           <h1>{title}</h1>
        </div>
    )
}