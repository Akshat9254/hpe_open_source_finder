import { Link } from "@chakra-ui/react";
import React from "react";

type LinkProps = {
  href: string;
  title: string;
};

const Link_: React.FC<LinkProps> = ({ href, title }) => {
  return (
    <Link href={href} target="_blank">
      {title}
    </Link>
  );
};
export default Link_;
