import React from "react";
import { Dialog, Link, Box, Typography } from "@mui/material";
import { DateTime } from "luxon";

function ShowTask({ task, open, handleClose, deleteTask }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ display: "flex", padding: 4, gap: 2 }}>
        <Box>
          <Typography variant={"h5"}>{task.name}</Typography>
          <p>{task.description}</p>
          <p>Date: {DateTime.fromISO(task.date).toFormat("dd/mm/yyyy")}</p>
          <p>Time:{DateTime.fromISO(task.time).toFormat("hh:mm a")}</p>
          {task.priority} priority
          <br />
          <br />
          <Link onClick={handleClose}>hide task</Link>
        </Box>
        <Box sx={{ display: "flex", height: 200 }}>
          {task.image ? <img alt={"No Image"} src={task.image} /> : null}
        </Box>
      </Box>
    </Dialog>
  );
}

export default ShowTask;
