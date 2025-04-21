"use client"
import RecoilProvider from "@/components/Modals/RecoilProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <RecoilProvider>
        {children}
        </RecoilProvider>
  );
}
