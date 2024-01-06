import { Grid, GridItem, Show } from "@chakra-ui/react";
import CategoryNavBar from "./CategoryNavBar";
import FetchCategories from "./FetchCategories";

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
      <GridItem area="main">
        <FetchCategories />
      </GridItem>
    </Grid>
  );
};

export default MyCategories;
