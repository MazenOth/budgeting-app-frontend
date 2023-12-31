import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import FetchWalles from "./FetchWallets";

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
        <FetchWalles />
      </GridItem>
    </Grid>
  );
};

export default MyWallets;
