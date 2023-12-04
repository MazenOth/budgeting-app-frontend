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
import { Text } from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/xusers")
      .then((res) => setUsers(res.data))
      .catch((err) => setErrors(err.message));
  }, []);
  return (
    <>
      {errors && <Text color="tomato">{errors}</Text>}
      <UnorderedList mb={3}>
        {users.map((user) => (
          <ListItem key={user.id}>{user.name}</ListItem>
        ))}
      </UnorderedList>
      <Signup></Signup>
    </>
  );
}

export default App;
