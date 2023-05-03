import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { repositoryAtom } from "../atoms";
import {
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import {
  Link,
  RepositoryInfo,
  Stats,
  Tags,
} from "../components/RepositoryDetails";

type RepositoryDetailsProps = {};

const RepositoryDetails: React.FC<RepositoryDetailsProps> = () => {
  const { name: repoName } = useParams();
  const { allRepositories } = useRecoilValue(repositoryAtom);

  const repo = allRepositories.find((r) => r.name === repoName);
  if (!repo) return <Heading>Loading...</Heading>;

  return (
    <SimpleGrid columns={{ base: 1, lg: 5 }} py={10} spacing={4}>
      <GridItem colSpan={{ base: 1, lg: 3 }} mb={8}>
        <Stack divider={<StackDivider />} spacing={4}>
          <RepositoryInfo repo={repo} />

          {repo.keywords?.length > 0 && (
            <Tags title={"Keywords"} tags={repo.keywords} />
          )}

          {repo.normalized_licenses?.length > 0 && (
            <Tags title={"Licenses"} tags={repo.normalized_licenses} />
          )}

          <HStack spacing={6}>
            {repo.homepage && <Link href={repo.homepage} title={"Home Page"} />}

            {repo.package_manager_url && (
              <Link href={repo.package_manager_url} title={repo.platform} />
            )}

            {repo.latest_download_url && (
              <Link href={repo.latest_download_url} title={"Download"} />
            )}
          </HStack>
        </Stack>
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <Stack divider={<StackDivider />} spacing={4}>
          <Heading
            fontWeight={"semibold"}
            fontSize={"3xl"}
          >{`Rank ${repo.rank}`}</Heading>
          <Stack px={6}>
            {repo.stars && <Stats title={"Stars"} number={repo.stars} />}
            {repo.forks && <Stats title={"Forks"} number={repo.forks} />}
            {repo.dependents_count && (
              <Stats
                title={"Dependent Packages"}
                number={repo.dependents_count}
              />
            )}
          </Stack>
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};
export default RepositoryDetails;
