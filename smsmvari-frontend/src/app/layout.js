import { Mukta } from "next/font/google";
import "./globals.css";

const muktaSans = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Sahyadri Manav Seva Manch Vari Trust",
  description:
    "Providing basic medical and healthcare services to people in remote areas who lack easy access.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${muktaSans.variable} text-base md:text-lg font-medium tracking-wide h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
