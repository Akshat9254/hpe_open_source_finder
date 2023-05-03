import React from "react";
import { IRepository } from "../../types";
import { Stack, Heading, Text, useColorMode } from "@chakra-ui/react";
import { formatDate } from "../../utils";

type RepositoryInfoProps = {
  repo: IRepository;
};

const RepositoryInfo: React.FC<RepositoryInfoProps> = ({ repo }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack>
      <Heading>{repo.name}</Heading>
      <Text fontSize={"lg"}>{repo.description}</Text>
      <Text
        fontSize={"sm"}
        color={colorMode === "dark" ? "gray.300" : "gray.700"}
      >{`Latest Release - ${repo.latest_release_number} Updated on ${formatDate(
        repo.latest_release_published_at
      )}`}</Text>
    </Stack>
  );
};
export default RepositoryInfo;
