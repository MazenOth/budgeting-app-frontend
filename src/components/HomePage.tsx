import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideDrawer from "./SideDrawer";

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
      <Show above="lg">
        <GridItem area="aside">
          <SideDrawer></SideDrawer>
        </GridItem>
      </Show>
      <GridItem area="main">Main</GridItem>
    </Grid>
  );
};

export default HomePage;
