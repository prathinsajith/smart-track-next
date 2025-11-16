import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="flex flex-col sm:flex-row sm:h-14 items-center justify-between px-4 lg:px-6 py-3 sm:py-0 gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 Smart Tracking. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Separator orientation="vertical" className="hidden sm:block h-4" />
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Separator orientation="vertical" className="hidden sm:block h-4" />
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
