import Image from "next/image";
import React, { type ReactNode } from "react";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div
        className="flex w-1/4 flex-col items-center justify-around bg-cover p-8"
        style={{ backgroundImage: `url('./assets/images/login-bkg.jpg')` }}
      >
        <Image
          src="/assets/images/login-mark.png"
          width={150}
          height={150}
          alt="Character"
        />
        {children}
        <Image
          src="/assets/images/logo-horizontal.jpg"
          width={250}
          height={100}
          alt="Character"
        />
      </div>
      <div
        className="flex-1 bg-cover"
        style={{
          backgroundImage: `url('./assets/images/quest-forge-bg-1.jpg')`,
        }}
      ></div>
    </div>
  );
};

export default GuestLayout;
