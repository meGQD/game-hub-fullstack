import { HStack, Switch, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <HStack>
        <Text whiteSpace="nowrap">Dark mode</Text>
        <Switch.Root
          colorPalette="cyan"
          checked={colorMode === "dark"}
          onChange={toggleColorMode}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </HStack>
    </div>
  );
};

export default ColorModeSwitch;
