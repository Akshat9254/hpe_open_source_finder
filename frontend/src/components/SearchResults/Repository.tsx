import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IRepository } from "../../types";
import { formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";

type RepositoryProps = {
  repo: IRepository;
};

const Repository: React.FC<RepositoryProps> = ({ repo }) => {
  const navigate = useNavigate();
  return (
    <Card
      variant={"elevated"}
      cursor={"pointer"}
      onClick={() => navigate(`/repository/${repo.name}`)}
    >
      <CardHeader>
        <Heading size="md">{repo.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text noOfLines={2}>{repo.description}</Text>
      </CardBody>
      <CardFooter>
        <Text fontSize={"sm"}>{`Latest Stable Release ${
          repo.latest_release_number
        } - Updated ${formatDate(
          repo.latest_stable_release_published_at
        )}`}</Text>
      </CardFooter>
    </Card>
  );
};
export default Repository;
