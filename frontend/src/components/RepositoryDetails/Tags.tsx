import React from "react";
import { Stack, Heading, HStack, Tag, Text } from "@chakra-ui/react";

type TagsProps = {
  title: string;
  tags: string[];
};

const Tags: React.FC<TagsProps> = ({ title, tags }) => {
  return (
    <Stack>
      <Heading fontSize={"lg"} fontWeight={"semibold"}>
        {title}
      </Heading>

      <HStack>
        {tags.map((keyword, index) => (
          <Tag key={index} borderRadius={"full"} cursor={"default"}>
            <Text align={"center"}>{keyword}</Text>
          </Tag>
        ))}
      </HStack>
    </Stack>
  );
};
export default Tags;
