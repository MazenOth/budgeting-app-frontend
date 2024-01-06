import { Grid, GridItem, Show } from "@chakra-ui/react";
import FetchWallets from "./FetchWallets";
import WalletNavBar from "./WalletNavBar";

const MyWallets = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <WalletNavBar />
      </GridItem>
      <GridItem area="main">
        <FetchWallets />
      </GridItem>
    </Grid>
  );
};

export default MyWallets;
