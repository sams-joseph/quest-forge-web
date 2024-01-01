import React, { type ReactElement } from "react";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { useRouter } from "next/router";
import Typography from "@/ui/Typography";
// import Image from "next/image";

const NavLink = ({
  to,
  // src,
  children,
}: {
  to: string;
  src?: string;
  children: ReactElement | string;
}) => {
  const router = useRouter();

  const isActive = router.asPath === to;

  const classNames = cx(
    isActive && "bg-black-800",
    !isActive && "bg-black-900",
    "px-4 py-1 rounded-md flex items-center gap-2 hover:bg-black-800",
  );

  return (
    <Link href={to} className={classNames}>
      {/* {src && (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/${src}`}
          alt="Nav Item Icon"
          height={30}
          width={30}
        />
      )} */}
      <Typography variant="subtitle2">{children}</Typography>
    </Link>
  );
};

export default NavLink;
