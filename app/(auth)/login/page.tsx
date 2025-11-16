"use client";

import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import { COMPANY_NAME } from "@/lib/constant";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const loading = useRedirectIfAuthenticated();

  if (loading) {
    return (
      <div className="grid min-h-svh place-items-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 size-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <GalleryVerticalEnd className="size-4" /> */}
            </div>
            {COMPANY_NAME}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/next.svg"
          alt="Login Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
