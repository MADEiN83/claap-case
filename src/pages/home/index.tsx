import React from "react";

import { Button } from "components";

interface Props {}

const Home: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Button>Invite teammates</Button>
    </div>
  );
};

export default Home;
