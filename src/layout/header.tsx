import Image from "next/image";

import { Link } from "@/ui";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 block w-full bg-neutral-900/80 py-4 px-5 font-medium text-gray-200">
      <div className="flex items-center justify-between">
        <Link href="/" underline={false}>
          <div className="flex items-center space-x-3 transition-all duration-100 hover:text-white">
            <Image
              src="/images/phck.svg"
              width={40}
              height={40}
              alt="Zerobase Logo"
            />
            <p className="hidden md:block">Zerobase</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
