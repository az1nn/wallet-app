import React, { FC } from "react";

const Layout = ({ children }: any) => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-zinc-800">
      {children}
    </div>
  );
};

export default Layout;
