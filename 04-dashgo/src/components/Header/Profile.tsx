import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData=true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>João Maroeli</Text>
          <Text color="gray.300" fontSize="sm">
            maroelijoao@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="João Maroeli" src="https://github.com/JohnMaroe.png" />
    </Flex>
  );
}