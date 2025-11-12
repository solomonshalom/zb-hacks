import Image from "next/image";

import Up from "@/animations/up";
import { Button, Link } from "@/ui";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { getAvatarUrl } from "@/lib/avatar";
import { useMemo } from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  
  const avatarUrl = useMemo(() => {
    return user ? getAvatarUrl(user.uid) : "";
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
        {user && (
          <div className="flex items-center space-x-3">
            <Up>
              <div className="flex items-center space-x-3">
                <Image
                  src={avatarUrl}
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt={user.displayName || "User"}
                />
                <p className="hidden md:block">{user.displayName}</p>
              </div>
            </Up>
            <Up delay={0.2}>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">|</span>
                <Button onClick={handleLogout}>Sign out</Button>
              </div>
            </Up>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
