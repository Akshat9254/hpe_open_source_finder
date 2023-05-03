import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { formatLargeNumber } from "../../utils";

type StatsProps = {
  title: string;
  number: number;
};

const Stats: React.FC<StatsProps> = ({ title, number }) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Text fontWeight={"semibold"}>{title}</Text>
      <Text>{formatLargeNumber(number)}</Text>
    </HStack>
  );
};
export default Stats;
