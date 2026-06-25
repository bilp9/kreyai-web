import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recover Job",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
