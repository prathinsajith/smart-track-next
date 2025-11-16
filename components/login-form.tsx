"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/auth";
import { setAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { AxiosError } from "axios";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    // Clear any previous server error
    setServerError(null);

    try {
      const res = await api.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
          "x-skip-redirect": "true",
        },
      });

      const { token, refresh_token } = res.data;

      // Store access token in memory
      setAccessToken(token);

      // Store refresh token in HTTP-only cookie
      await fetch("/api/auth/store-refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refresh_token }),
      });

      // Show success message
      toast.success("Login successful!");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as AxiosError<{
        message?: string;
        errors?: Record<string, string>;
      }>;

      // Field-specific validation errors
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setError(field as keyof LoginSchema, {
              message: message as string,
            });
          }
        );
      } else {
        // Generic error
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        setServerError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        {/* Server Error Display */}
        {serverError && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/10 dark:text-red-400"
          >
            {serverError}
          </div>
        )}

        {/* Username */}
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register("username")}
          />
          <FieldError errors={errors.username ? [errors.username] : []} />
        </Field>

        {/* Password */}
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} />
          <FieldError errors={errors.password ? [errors.password] : []} />
        </Field>

        {/* Submit Button */}
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                Logging in <Spinner />
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        {/* GitHub Login */}
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12..."
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
