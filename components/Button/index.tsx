
export type ButtonProps ={
    title?:string,
    click?:(e:any)=> void;
    className?:string
    
}

const Button = ({title, className, click}:ButtonProps) =>{
    return(
        <button className={className} onClick={click}>{title}</button>
    )
}
export default Button;
