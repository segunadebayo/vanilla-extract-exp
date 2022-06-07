import type { NextPage } from "next";
import { Text } from "../dist/text";
import { Box } from "../dist/box";

const Home: NextPage = () => {
  return (
    <div>
      <Text variant="h1">Hello World</Text>
      {/* @ts-ignore */}
      <Box margin={{ xs: "4x", lg: "32x" }} width="16px">
        welcome
      </Box>
    </div>
  );
};

export default Home;
