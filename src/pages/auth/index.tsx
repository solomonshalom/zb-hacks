import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Button } from "@/ui";
import { Github } from "@/ui/icons";
import { toast } from "sonner";
import Up from "@/animations/up";
import { useAuth } from "@/lib/auth-context";
import Loading from "@/components/loading";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/app");
    }
  }, [user, authLoading, router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/app");
    } catch (error) {
      toast.error("Unable to log in. Please try again later.");
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Auth - Zerobase</title>
      </Head>
      <div className="grid h-screen md:grid-cols-2">
        {/* Left side - Sign in form */}
        <div className="flex flex-col items-center justify-center px-6">
          <Up>
            <h1 className="mb-4 text-2xl font-medium">
              {loading ? "Logging in..." : "Sign in to continue"}
            </h1>
          </Up>
          <Up delay={0.2}>
            <Button
              icon={<Github width={20} />}
              onClick={handleLogin}
              loadingstatus={loading}
            >
              <span>Continue with Github</span>
            </Button>
          </Up>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block relative h-full w-full">
          <Image
            src="/images/sunset-mountains.jpg"
            alt="Sunset over Mountains"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Auth;
