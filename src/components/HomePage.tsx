import { Grid, GridItem, Show, IconButton } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideDrawer from "./SideDrawer";
import FetchTransactions from "./transactions/FetchTransactions";
import { AddIcon } from "@chakra-ui/icons";
import AddTransaction from "./transactions/AddTransaction";
import { SimpleGrid } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Grid templateColumns="repeat(20, 1fr)">
      <GridItem as="aside" colSpan="1" minHeight="100vh" p="20px">
        <SideDrawer></SideDrawer>
      </GridItem>
      <GridItem as="main" colSpan="19" p="20px">
        <NavBar />
        <FetchTransactions />{" "}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
