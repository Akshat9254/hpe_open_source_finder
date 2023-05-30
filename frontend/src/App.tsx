import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, MyProjects, RepositoryDetails, SearchResults } from "./pages";
import { Container, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { licenseAtom, platformAtom, repositoryAtom, searchAtom } from "./atoms";
import { getRepositories } from "./http";
import { useEffect } from "react";
import useDebounce from "./hooks/useDebounce";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { keyword, ref } = useRecoilValue(searchAtom);
  const { selectedPlatforms, loading: platformLoading } =
    useRecoilValue(platformAtom);
  const { loading: repositoryLoading } = useRecoilValue(repositoryAtom);
  const setRepositoryState = useSetRecoilState(repositoryAtom);
  const { selectedLicenses } = useRecoilValue(licenseAtom);

  const onSearch = async () => {
    if (platformLoading || repositoryLoading) return;
    const platform = Array.from(selectedPlatforms).map((p) => p.name);
    setRepositoryState((prev) => ({ ...prev, loading: true }));
    const licenses = Array.from(selectedLicenses).map((p) => p.name);

    try {
      const { data } = await getRepositories(keyword.split(" "), licenses);
      setRepositoryState((prev) => ({
        ...prev,
        allRepositories: data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      setRepositoryState((prev) => ({ ...prev, loading: false }));
    } finally {
      if (ref?.current) {
        console.log(ref.current);

        ref.current.focus();
      }
    }
  };

  useEffect(() => {
    if (colorMode === "dark") return;
    toggleColorMode();
  }, []);

  useEffect(() => {
    onSearch();
  }, [selectedLicenses]);

  useDebounce(keyword, onSearch);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxW={"container.xl"} mt={8}>
        <Routes>
          <Route path={"/"} element={<SearchResults />} />
          <Route path={"/repository/:id"} element={<RepositoryDetails />} />
          <Route path={"/project/:userId"} element={<MyProjects />} />
          <Route path={"/search"} element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
