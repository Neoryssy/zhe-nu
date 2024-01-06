'use client'

import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

const NextAuthLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
     <SessionProvider>
        {children}
      </SessionProvider> 
    </>
  );
}

export default NextAuthLayout