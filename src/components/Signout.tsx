import { Button } from "@chakra-ui/react";

const Signout = () => {
  const handleClick = () => {
    window.location.reload();
  };
  return <Button onClick={handleClick}>Sign out</Button>;
};

export default Signout;