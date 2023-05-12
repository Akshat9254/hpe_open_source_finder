import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authModalAtom } from "../atoms";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type MyProjectsProps = {};

const MyProjects: React.FC<MyProjectsProps> = () => {
  const { user } = useRecoilValue(authModalAtom);
  const navigate = useNavigate();

  const [selectedProjectId, setSelectedProjectId] = useState(
    user?.projects[0].id
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  if (!user) return <Text>Login to view your projects!!!</Text>;

  const repositories = user.projects.find(
    (p) => p.id === selectedProjectId
  )?.repositories;
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} columnGap={6} rowGap={4}>
      <GridItem colSpan={1}>
        <Card variant={"outline"}>
          <CardHeader backgroundColor={"gray.700"}>
            <Heading size={"md"}>{"My Projects"}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />}>
              {user.projects.map((project) => (
                <Box
                  key={project.id}
                  _hover={{ backgroundColor: "gray.700" }}
                  borderRadius={4}
                  py={1}
                  px={2}
                >
                  <Text
                    cursor={"pointer"}
                    onClick={() => setSelectedProjectId(project.id)}
                    fontWeight={
                      selectedProjectId === project.id ? "bold" : "normal"
                    }
                    fontSize={selectedProjectId === project.id ? "lg" : "md"}
                  >
                    {project.name}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
        <Card variant={"outline"}>
          <CardHeader backgroundColor={"gray.700"}>
            <Heading size={"md"}>{"Repositories"}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />}>
              {repositories?.map((repo, index) => (
                <Box key={index} borderRadius={4} py={1} px={2}>
                  <Text
                    cursor={"pointer"}
                    onClick={() => navigate(`/repository/${repo.id}`)}
                  >
                    {repo.name}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
    </SimpleGrid>
  );
};
export default MyProjects;
