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
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      setBackendData(res.data);
    });
  }, []);

  return (
    <>
      {console.log(backendData)}
      <Signup></Signup>
    </>
  );
}

export default App;
