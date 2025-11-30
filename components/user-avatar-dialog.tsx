"use client";

import * as React from "react";
import {
  IconLogout,
  IconUserCircle,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/auth-store";

interface UserAvatarDialogProps {
  user: {
    fullName: string;
    avatar: string | null;
    isOnline: boolean;
    userTypeName: string | null;
    email: string | null;
    username: string;
  } | null;
}
export function UserAvatarDialog({ user }: UserAvatarDialogProps) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-10 w-10 rounded-full p-0 transition-all duration-200 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none data-[state=open]:bg-accent/50"
        >
          <div className="relative">
            <Avatar className="h-9 w-9 border border-border/50 shadow-sm transition-all duration-200 hover:border-border">
              <AvatarImage
                src={user?.avatar}
                alt={user?.fullName ?? "User Avatar"}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                {user?.fullName
                  ? user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : ""}
              </AvatarFallback>
            </Avatar>
            {/* Online status indicator */}
            {user?.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background ring-1 ring-background"></div>
            )}
          </div>
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0" align="end" sideOffset={8}>
        {/* User Info Header */}
        <DropdownMenuLabel className="p-0">
          <div className="flex items-start gap-4 px-4 py-4 bg-muted/50">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                <AvatarImage src={user?.avatar} alt={user?.fullName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                  {user?.fullName
                    ? user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : ""}
                </AvatarFallback>
              </Avatar>
              {user?.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background"></div>
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base leading-tight">
                  {user?.fullName}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {user?.userTypeName}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <IconMail className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <IconPhone className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="text-sm">{user?.username}</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Account Section */}
        <div className="p-2">
          <DropdownMenuItem asChild>
            <Link
              href="/account"
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-colors hover:bg-accent focus:bg-accent"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <IconUserCircle className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span>Account Settings</span>
                <span className="text-xs text-muted-foreground">
                  Manage your profile and preferences
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out Section */}
        <div className="p-2">
          <DropdownMenuItem
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-colors text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10">
              <IconLogout className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex flex-col">
              <span>Sign out</span>
              <span className="text-xs text-muted-foreground">
                Sign out of your account
              </span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
