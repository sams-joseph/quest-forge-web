import React from "react";
import Typography from "@/ui/Typography";
import Pane from "@/ui/Pane";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grid w-full p-4">
      <Pane>
        <div className="flex flex-col items-start gap-4 p-4">
          <div>
            <Typography variant="headline">Page not found</Typography>
            <Typography variant="subtitle2">
              This page needs some style
            </Typography>
          </div>
          <Link
            className="text-md rounded-md bg-primary-500 p-2 font-bold"
            href="/"
          >
            Take me back to town
          </Link>
        </div>
      </Pane>
    </div>
  );
};

export default NotFound;
