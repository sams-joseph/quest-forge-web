import React, { type ReactElement, useMemo } from "react";
import Icon from "@/ui/Icon";
import Typography from "@/ui/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import useBreadcrumbs from "./useBreadcrumbs";

interface Crumb {
  text: string;
  last: boolean;
  href: string;
}

const Container = ({ children }: { children: ReactElement[] }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

const Crumb = ({ text, href, last = false }: Crumb) => {
  if (last) {
    return <Typography classes="capitalize">{text}</Typography>;
  }

  return (
    <>
      <Link color="inherit" href={href} className="capitalize">
        {text}
      </Link>
      <Icon iconName="ChevronRight" />
    </>
  );
};

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery?.split("/").filter((v) => v.length > 0) ?? [];
};

export default function Breadcrumbs() {
  const router = useRouter();
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs();

  const breadcrumbs = useMemo(() => {
    const asPathNestedRoutes = generatePathParts(router.asPath);
    const pathnameNestedRoutes = generatePathParts(router.pathname);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const param = pathnameNestedRoutes[idx]
        ?.replace("[", "")
        .replace("]", "");

      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const crumb: Omit<Crumb, "last"> = {
        href,
        text: getTextGenerator(param) ?? getDefaultTextGenerator(subpath),
      };
      return crumb;
    });

    return [
      { href: "/", text: "Home", textGenerator: undefined },
      ...crumblist,
    ];
  }, [
    router.asPath,
    router.pathname,
    router.query,
    getTextGenerator,
    getDefaultTextGenerator,
  ]);

  return (
    <Container aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </Container>
  );
}
