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
    <div className="flex min-h-svh flex-col items-center justify-center bg-gray-50 p-6 md:p-10 dark:bg-gray-900">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
              <span className="text-lg font-bold">M</span>
            </div>
            {COMPANY_NAME}
          </div>
          <p className="text-muted-foreground text-sm">
            Central Hub for Personal Customization
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-950 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <LoginForm />
        </div>

        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Plans</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
