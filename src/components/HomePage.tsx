import { Grid, GridItem, Show, IconButton } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideDrawer from "./SideDrawer";
import FetchTransactions from "./transactions/FetchTransactions";
import { AddIcon } from "@chakra-ui/icons";
import AddTransaction from "./transactions/AddTransaction";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show>
        <GridItem area="aside">
          <SideDrawer></SideDrawer>
        </GridItem>
      </Show>
      <GridItem area="main">
        <FetchTransactions />{" "}
        <IconButton
          colorScheme="green"
          aria-label="Search database"
          icon={<AddIcon />}
        />
        <AddTransaction />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
