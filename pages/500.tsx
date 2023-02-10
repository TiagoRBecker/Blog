import Image from "next/image";
import Router from "next/router";
import Button from "../components/Button";

const ErrorPage = () => {
  const handleRedirect = () => {
    Router.push("/signin");
  };
  return (
    <section className="w-full h-screen bg-[#46423e] flex items-center justify-center flex-col ">
      <Image src={"/error.jpg"} width={800} height={800} alt="Error" />
      <Button
        className="mt-5 bg-teal-400 w-64 py-2 px-4 text-white rounded-md"
        click={handleRedirect}
        title="Voltar para página anterior"
      />
    </section>
  );
};
export default ErrorPage;
