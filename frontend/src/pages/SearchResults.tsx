import {
  RepositoryContainer,
  SearchOptions,
} from "../components/SearchResults";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

type SearchResultsProps = {};

const SearchResults: React.FC<SearchResultsProps> = () => {
  return (
    <SimpleGrid py={6} columns={{ base: 1, lg: 3 }} spacing={4}>
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <RepositoryContainer />
      </GridItem>
      <GridItem colSpan={1}>
        <SearchOptions />
      </GridItem>
    </SimpleGrid>
  );
};
export default SearchResults;
