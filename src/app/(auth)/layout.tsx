
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (

          <div className="w-full max-w-[1920px]  flex shadow-2xl flex-col h-screen overflow-hidden"
          >
            {children}
          </div>

  );
}
