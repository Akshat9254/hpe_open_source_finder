import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, RepositoryDetails, SearchResults } from "./pages";
import { Container } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { platformAtom, repositoryAtom, searchAtom } from "./atoms";
import { getRepositories } from "./http";
import { useEffect } from "react";
import useDebounce from "./hooks/useDebounce";

function App() {
  const { keyword } = useRecoilValue(searchAtom);
  const { selectedPlatforms, loading: platformLoading } =
    useRecoilValue(platformAtom);
  const { loading: repositoryLoading } = useRecoilValue(repositoryAtom);
  const setRepositoryState = useSetRecoilState(repositoryAtom);

  const onSearch = async () => {
    if (platformLoading || repositoryLoading) return;
    const platform = Array.from(selectedPlatforms).map((p) => p.name);
    setRepositoryState((prev) => ({ ...prev, loading: true }));

    try {
      const { data } = await getRepositories(keyword.split(" "), platform);
      setRepositoryState((prev) => ({
        ...prev,
        allRepositories: data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      setRepositoryState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    onSearch();
  }, [selectedPlatforms]);

  useDebounce(keyword, onSearch);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxW={"container.xl"} mt={8}>
        <Routes>
          <Route path={"/"} element={<SearchResults />} />
          <Route path={"/repository/:name"} element={<RepositoryDetails />} />
          <Route path={"/search"} element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
