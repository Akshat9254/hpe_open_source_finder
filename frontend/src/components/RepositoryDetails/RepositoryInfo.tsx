import React, { useState } from "react";
import { IRepository } from "../../types";
import {
  Stack,
  Heading,
  Text,
  useColorMode,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { formatDate } from "../../utils";
import { BsBookmark } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { authModalAtom } from "../../atoms";
import { AddIcon } from "@chakra-ui/icons";
import {
  addProjectRepository,
  createNewProject,
  deleteProjectRepository,
  getAllProjectsByOwnerId,
} from "../../http";
import { IProject } from "../../types/auth";

type RepositoryInfoProps = {
  repo: IRepository;
};

const RepositoryInfo: React.FC<RepositoryInfoProps> = ({ repo }) => {
  const { colorMode } = useColorMode();
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const { user } = authModalState;

  const handleSave = async () => {
    if (!projectName || !user) return;
    try {
      await createNewProject(projectName, user.id);
      const { data } = await getAllProjectsByOwnerId(user.id);
      setAuthModalState((prev) => ({
        ...prev,
        user: { ...user, projects: data },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setProjectName("");
      setIsModalOpen(false);
    }
  };

  const toggleProject = async (project: IProject) => {
    if (!user) return;
    const isBookmarked = Boolean(
      user.projects
        .find((p) => p.id === project.id)
        ?.repositories.find((r) => r.id === repo.id)
    );

    if (isBookmarked) {
      await deleteProjectRepository(project.id, repo.id);
    } else {
      await addProjectRepository(project.id, repo.id);
    }

    const { data } = await getAllProjectsByOwnerId(user.id);
    setAuthModalState((prev) => ({
      ...prev,
      user: { ...user, projects: data },
    }));
  };

  return (
    <>
      <Stack>
        <Heading>{repo.name}</Heading>
        <Text fontSize={"lg"}>{repo.description}</Text>
        <HStack justifyContent={"space-between"}>
          <Text
            fontSize={"sm"}
            color={colorMode === "dark" ? "gray.300" : "gray.700"}
          >{`Latest Release - ${
            repo.latest_release_number
          } Updated on ${formatDate(repo.latest_release_published_at)}`}</Text>
          {user && (
            <Menu closeOnSelect={false}>
              <MenuButton>
                <IconButton aria-label="save" icon={<BsBookmark />} />
              </MenuButton>
              <MenuList>
                {user.projects.map((project) => (
                  <MenuItem key={project.id}>
                    <Checkbox
                      onChange={() => toggleProject(project)}
                      isChecked={Boolean(
                        user.projects
                          .find((p) => p.id === project.id)
                          ?.repositories.find((r) => r.id === repo.id)
                      )}
                    >
                      {project.name}
                    </Checkbox>
                  </MenuItem>
                ))}
                <MenuItem>
                  <HStack>
                    <Button
                      leftIcon={<AddIcon fontSize={"2xs"} />}
                      size={"sm"}
                      variant={"unstyled"}
                      onClick={() => setIsModalOpen(true)}
                    >
                      {"New Project"}
                    </Button>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Stack>
      <Modal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"New Project"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>{"Project Name"}</FormLabel>
              <Input
                placeholder="hpe"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RepositoryInfo;
