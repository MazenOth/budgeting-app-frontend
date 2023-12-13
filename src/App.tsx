import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import axios from "axios";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface User {
  _id: number;
  email: string;
}

function App() {
  return (
    <>
      <Signup></Signup>
    </>
  );
}

export default App;
