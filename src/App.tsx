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
import Signin from "./components/Signin";

interface User {
  _id: number;
  email: string;
}

function App() {
  return (
    <>
      {/* <Signin></Signin> */}
      <Signup></Signup>
    </>
  );
}

export default App;
