import { Button, Stack, Box } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ 
  isCurrent = false, 
  number, 
  onPageChange 
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button 
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: "default"
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button 
      size="sm"
      fontSize="xs"
      w="4"
      bgColor="gray.700"
      hover={{
        bg: 'gray.500'
      }}
      onCLick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}