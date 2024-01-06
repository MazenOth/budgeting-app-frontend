import { Grid, GridItem, Show } from "@chakra-ui/react";
import CategoryNavBar from "./CategoryNavBar";

const MyCategories = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <CategoryNavBar />
      </GridItem>
      <GridItem area="main"></GridItem>
    </Grid>
  );
};

export default MyCategories;
