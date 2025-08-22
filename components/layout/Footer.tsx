import Image from "next/image";

export function Footer({
  logoSrc = "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_dark_clr_74x24px.svg",
}: {
  logoSrc?: string;
}) {
  return (
    <footer className="mt-8 border-t border-border/80 bg-background/80">
      <div className="mx-auto max-w-3xl px-6 py-6 text-center">
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <a
            className="hover:underline"
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <span>•</span>
          <a
            className="hover:underline"
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
          <Image src={logoSrc} alt="Google" width={74} height={24} />
          <span>Forms</span>
        </div>
      </div>
    </footer>
  );
}
