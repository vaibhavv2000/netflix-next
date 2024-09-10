import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "@/lib/Provider";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
 title: "Netflix",
 description: "Stream your favorite movies and TV shows on Netflix. Watch anytime, anywhere.",
 keywords: "Netflix, streaming, movies, TV shows, entertainment",
};

interface props {
 children: React.ReactNode;
};

function RootLayout({children}: Readonly<props>) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <Provider>
     <AppRouterCacheProvider>
      {children}
     </AppRouterCacheProvider>
    </Provider>
   </body>
  </html>
 );
};

export default RootLayout;