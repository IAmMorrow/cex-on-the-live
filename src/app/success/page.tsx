import Link from "next/link";

const SuccessPage = () => {
  return (<>
  <div className="flex flex-col items-center absolute w-343 h-204 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
   <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width="64" height="64" rx="32" fill="white" fillOpacity="0.05"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M45.8334 24.0721L30.8987 42L19.8335 33.1461L22.0471 30.5959L30.4007 37.2781L43.1356 22L45.8334 24.0721Z" fill="#5F9954"/>
   </svg>
   <div className="text-center">
    <h1 className="font-semibold text-2xl mt-10">Congratulations!</h1>
    <h2 className="font-semibold text-2xl">You secured your crypto.</h2>
   </div>
    <p className="font-regular text-sm leading-4 text-neutral-500 mt-2 text-center">We’ll notify you when your funds are secured on your Ledger Stax</p>
  </div>
    <Link href="/" className="text-black font-semibold p-1 mt-10 mb-10 text-center p-2 gap-2 bg-white rounded-md absolute bottom-10 left-1/2 transform -translate-x-1/2" >Transfer another asset</Link>
  </>)
};

export default SuccessPage;
