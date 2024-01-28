import { ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";
import Markdown, { Components } from "react-markdown";

export const md_components = {
  ul: ({ children, ...props }) => (<UnorderedList {...props}>{children}</UnorderedList>),
  ol: ({ children, ...props }) => (<OrderedList {...props}>{ children }</OrderedList>),
  li: ({ children, ...props }) => (<ListItem {...props}>{ children }</ListItem>),
} as Partial<Components>;
