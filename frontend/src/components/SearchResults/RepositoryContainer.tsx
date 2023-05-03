import { Heading, Stack } from "@chakra-ui/react";
import Repository from "./Repository";
import { useRecoilValue } from "recoil";
import { repositoryAtom } from "../../atoms";

type RepositoryContainerProps = {};

const RepositoryContainer: React.FC<RepositoryContainerProps> = () => {
  const { allRepositories, loading } = useRecoilValue(repositoryAtom);

  // useEffect(() => {
  //   const fetchRepositories = async () => {
  //     try {
  //       const { data } = await getRepositories(["jackson-annotations"], "npm");

  //       setReposiories(data);
  //     } catch (error) {}
  //   };
  //   fetchRepositories();
  // }, []);
  if (allRepositories.length === 0)
    return <Heading>Search for Repositories...</Heading>;

  if (loading) return <Heading>Loading...</Heading>;
  return (
    <Stack spacing={4}>
      {allRepositories.map((repo, index) => (
        <Repository key={index} repo={repo} />
      ))}
    </Stack>
  );
};
export default RepositoryContainer;
