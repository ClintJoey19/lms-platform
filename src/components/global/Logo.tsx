import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-4 px-4">
      <Image src="/logo.svg" alt="logo" height={40} width={40} />
      <p className="text-blue-500 font-bold text-lg">LMS</p>
    </div>
  );
};

export default Logo;
