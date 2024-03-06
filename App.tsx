import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from 'axios';

// Define TypeScript type for the objects in the 'names' array
type NameObject = {
  name: string;
}

// Define the App component
function App() {
  // State hook for storing the list of names fetched from the API
  const [names, setNames] = useState<NameObject[]>([]);
  // State hook for storing the current value of the input field
  const [inputName, setInputName] = useState<string>("");

  // Effect hook to fetch the list of names from the API when the component mounts
  useEffect(() => {
    axios.get("http://localhost:3020/names").then((response) => {
      setNames(response.data);
    });
  }, []);

  // Handler for input field changes, updates the inputName state with the new value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  }

  // Handler for the button click, sends a POST request to the API to add a new name
  // and updates the list of names with the response
  const handleClick = async () => {
    const response = await axios.post("http://localhost:3020/name", {
      name: inputName,
    });
    setNames(response.data);
  };

  // Render method for the App component
  return (
    <>
      {/* Flex container for input and button */}
      <Flex gap={4} m={20}>
        {/* Input field for typing a name */}
        <Input placeholder='Type in your name...' onChange={handleChange} />
        {/* Button to trigger the POST request */}
        <Button colorScheme="purple" onClick={handleClick}>
          Click here...
        </Button>
      </Flex>

      {/* Box containing the list of names */}
      <Box>All Names:</Box>
      {/* Mapping over the 'names' state to display each name */}
      {names.map((name: NameObject, index: number) => (
        <Text key={`${name.name}-${index}`}>{name.name}</Text>
      ))}
    </>
  );
}

// Export the App component as the default export
export default App;
