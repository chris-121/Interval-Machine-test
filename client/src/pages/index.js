import React, { useEffect } from "react";
import CreateTaskComponent from "../components/CreateTaskComponent";
import TasksLists from "../components/TasksList";
import { Box } from "@mui/material";

const sxStyles = {
  root: {
    margin: 0,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    width: "100%",
    background: "#1a354a",
  },
};
export default function Home() {
  useEffect(() => {});
  return (
    <Box sx={sxStyles.root}>
      <CreateTaskComponent />
      <TasksLists />
    </Box>
  );
}
