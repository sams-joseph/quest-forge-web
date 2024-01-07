import React, { type ReactElement } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Typography from "@/ui/Typography";
import UserMenu from "@/components/UserMenu";
import { cx } from "class-variance-authority";
import useCreateGame from "@/hooks/useCreateGame";
import { useRouter } from "next/router";
import Image from "next/image";
import JoinCampaignModal from "../JoinCampaignModal";
import useToggle from "@/hooks/useToggle";

const Appheader = () => {
  const router = useRouter();
  const createGame = useCreateGame();
  const joinToggle = useToggle();

  const handleCreateGame = async () => {
    const response = await createGame.mutateAsync({
      name: "New Campaign",
    });

    void router.push(`/campaigns/${response.id}`);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex items-center gap-2">
        {/* <div className="h-[40px] w-[40px] rounded-full bg-primary-500"></div> */}
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/quest-forge-mark.png`}
          alt="Quest Forge"
          height={40}
          width={40}
          className="rounded-full"
        />
        <Typography variant="subtitle">QuestForge</Typography>
      </div>
      <NavigationMenu.Root className="relative z-[1] flex flex-1">
        <NavigationMenu.List className="m-0 flex list-none rounded-[6px] p-2">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none text-white no-underline outline-none hover:bg-black-800"
              href="/"
            >
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none text-white outline-none hover:bg-black-800">
              Campaigns{" "}
              <CaretDownIcon
                className="relative top-[1px] text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 w-full sm:w-auto">
              <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                <li className="row-span-3 grid">
                  <NavigationMenu.Link asChild>
                    <Link
                      className="relative flex h-full w-full select-none flex-col
                    justify-end overflow-hidden rounded-[6px] bg-gradient-to-b from-primary-500 to-black-800 p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-primary-500"
                      href="/campaigns"
                    >
                      <div className="absolute bottom-0 left-0 right-0 top-0">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/underground-ruins.jpg`}
                          layout="fill"
                          objectFit="cover"
                          alt="campaigns"
                        />
                      </div>
                      <div className="z-10">
                        <Typography variant="headline">Campaigns</Typography>
                        <Typography variant="body1">
                          The abandoned Mage Tower awaits
                        </Typography>
                      </div>
                    </Link>
                  </NavigationMenu.Link>
                </li>
                <ListItem title="My Campaigns" href="/campaigns">
                  <Typography variant="caption" color="muted">
                    View a list of all campaigns you are a part of
                  </Typography>
                </ListItem>
                <ListItem title="Create" href="" onClick={handleCreateGame}>
                  <Typography variant="caption" color="muted">
                    Start a new adventure
                  </Typography>
                </ListItem>
                <ListItem title="Join" href="" onClick={joinToggle.toggleOn}>
                  <Typography variant="caption" color="muted">
                    Join an existing adventure
                  </Typography>
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none text-white outline-none hover:bg-black-800">
              Library{" "}
              <CaretDownIcon
                className="relative top-[1px] text-white transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 w-full sm:w-auto">
              <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[1fr_1fr]">
                <ListItem title="Spells" href="/spells">
                  <Typography variant="caption" color="muted">
                    View a list of all your spells
                  </Typography>
                </ListItem>
                <ListItem title="Equipment" href="/items">
                  <Typography variant="caption" color="muted">
                    View a list of all your equipment
                  </Typography>
                </ListItem>
                <ListItem title="Classes" href="/classes">
                  <Typography variant="caption" color="muted">
                    View a list of all classes
                  </Typography>
                </ListItem>
                <ListItem title="Races" href="/races">
                  <Typography variant="caption" color="muted">
                    View a list of all races
                  </Typography>
                </ListItem>
                <ListItem title="Monsters" href="/monsters">
                  <Typography variant="caption" color="muted">
                    View a list of all monsters
                  </Typography>
                </ListItem>
                <ListItem title="Characters" href="/characters">
                  <Typography variant="caption" color="muted">
                    View a list of all characters
                  </Typography>
                </ListItem>
                <ListItem title="NPC" href="/npc">
                  <Typography variant="caption" color="muted">
                    View a list of all your NPCs
                  </Typography>
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
            <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-black-900" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="perspective-[2000px] absolute left-0 top-full flex w-full px-2">
          <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] border border-black-800 bg-black-900 shadow-lg shadow-black-950 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenu.Root>
      <UserMenu />
      <JoinCampaignModal toggle={joinToggle} />
    </div>
  );
};

type ListItemProps = {
  className?: string;
  children: ReactElement;
  title: string;
  href?: string;
  onClick?: () => void;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    { className, children, title, href, onClick, ...props }: ListItemProps,
    ref,
  ) => {
    if (onClick) {
      return (
        <li onClick={onClick}>
          <NavigationMenu.Link asChild>
            <div
              className={cx([
                "block cursor-pointer select-none rounded-[6px] border border-black-900 p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-black-800",
                className,
              ])}
              {...props}
            >
              <div className="mb-[5px] font-medium leading-[1.2] text-white">
                {title}
              </div>
              {children}
            </div>
          </NavigationMenu.Link>
        </li>
      );
    }

    return (
      <li>
        <NavigationMenu.Link asChild>
          <Link
            href={href ?? "/"}
            className={cx([
              "block select-none rounded-[6px] border border-black-900 p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-black-800",
              className,
            ])}
            {...props}
            ref={ref}
          >
            <div className="mb-[5px] font-medium leading-[1.2] text-white">
              {title}
            </div>
            {children}
          </Link>
        </NavigationMenu.Link>
      </li>
    );
  },
);

export default Appheader;
