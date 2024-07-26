import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react"

const ColorModeSwitch = () => {
  
    const { colorMode, toggleColorMode } = useColorMode();

    return (
    <>
        <HStack justifyContent={"end"} px={'5'}>
            <Switch 
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
            />
            <Text whiteSpace={'nowrap'}>{colorMode === 'dark'? <SunIcon/> : <MoonIcon/>}</Text>
        </HStack>
    </>
  )
}

export default ColorModeSwitch