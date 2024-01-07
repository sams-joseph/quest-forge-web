import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import Typography from "@/ui/Typography";
import Button from "@/ui/Button";
import Pane from "@/ui/Pane";

const Home = () => {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div className="grid w-full">
      <Pane>
        <div className="flex flex-col items-start gap-4 p-4">
          <div>
            <Typography variant="subtitle">
              &#128075;{` Hi, ${user?.name} welcome back!`}
            </Typography>
            <Typography variant="body1">
              Are you ready to continue your campaign?
            </Typography>
          </div>
          <Button variant="primary" size="medium" rounded="md">
            Let's go!
          </Button>
        </div>
      </Pane>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
