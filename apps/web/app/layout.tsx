import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "TSL Kit Engine Playground",
  description: "Persistent canvas shell for the TSL engine-first website.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
