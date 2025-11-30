import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconExclamationCircle } from "@tabler/icons-react";

import { api } from "@/lib/axios";
import { loginSchema, LoginSchema } from "@/schemas/auth";
import { useAuthStore } from "@/stores/auth-store";
import { LoginResponse, UserResponse, ApiErrorResponse } from "@/types/api";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const { setToken, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema): Promise<void> => {
    setServerError(null);

    try {
      // Login request with proper typing
      const res = await api.post<LoginResponse>("/api/login", data);
      const { token, refresh_token } = res.data;

      // Save access token in store
      setToken(token);

      // Save refresh token in HTTP-only cookie
      await fetch("/api/auth/store-refresh", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token }),
      });

      // Fetch user details
      const userRes = await api.get("/api/user/me");

      const rawUser = userRes.data?.user || [];

      const user = {
        ...rawUser,
        fullName: rawUser.fullName || 'User'
      };

      setUser(user);

      toast.success(`Welcome back, ${user.fullName}!`);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      // Comprehensive error handling for production
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ApiErrorResponse | undefined;

        // Field-level validation errors from backend
        if (errorData?.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            // Validate field exists in schema before setting error
            if (field in loginSchema.shape) {
              const errorMessage = Array.isArray(message) ? message[0] : message;
              setError(field as keyof LoginSchema, {
                message: errorMessage,
              });
            }
          });
          return;
        }

        // Server error messages
        if (errorData?.message) {
          setServerError(errorData.message);
          toast.error(errorData.message);
          return;
        }

        // Network timeout errors
        if (err.code === "ECONNABORTED") {
          const msg = "Request timeout. Please check your connection and try again.";
          setServerError(msg);
          toast.error(msg);
          return;
        }

        // Network errors (no response from server)
        if (!err.response) {
          const msg = "Network error. Please check your internet connection.";
          setServerError(msg);
          toast.error(msg);
          return;
        }

        // HTTP error codes
        if (err.response.status >= 500) {
          const msg = "Server error. Please try again later.";
          setServerError(msg);
          toast.error(msg);
          return;
        }
      }

      // Fallback for unexpected errors
      const msg = "An unexpected error occurred. Please try again.";
      setServerError(msg);
      toast.error(msg);
      console.error("Login error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        {/* Header removed as it is handled by the page layout */}

        {serverError && (
          <Alert>
            <IconExclamationCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
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
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password")} />
          <FieldError errors={errors.password ? [errors.password] : []} />
        </Field>

        {/* Submit */}
        <Field>
          <Button type="submit" disabled={isSubmitting} className="w-full font-bold">
            {isSubmitting ? (
              <>
                Logging in <Spinner />
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button">
            GitHub Login
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

