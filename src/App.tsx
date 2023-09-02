import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid templateAreas={'"main"'}>
      <GridItem area="main" bg="green">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
