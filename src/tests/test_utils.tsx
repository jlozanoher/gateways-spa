import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Props {
  children: any;
}

export const WithDnDContext = (props: Props) => (
  <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
);
