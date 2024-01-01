import React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cx } from "class-variance-authority";
import Image from "next/image";

interface IAvatarProps {
  imageSrc?: string;
  alt: string;
  classes?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>(
  ({ imageSrc, alt, classes, ...rest }: IAvatarProps, ref) => {
    const classNames = cx([
      "bg-[#2A2C3F] border relative border-black-800 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-md align-middle",
      classes,
    ]);

    const src = imageSrc ?? "/assets/images/default-user-icon.png";

    return (
      <RadixAvatar.Root ref={ref} className={classNames} {...rest}>
        <Image className="object-cover" fill src={src} alt={alt} />
      </RadixAvatar.Root>
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
