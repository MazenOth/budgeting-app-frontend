import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import FetchWallets from "./FetchWallets";

const MyWallets = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="main">
        <FetchWallets />
      </GridItem>
    </Grid>
  );
};

export default MyWallets;
