import * as React from "react";
import TableCell from "@mui/material/TableCell";
import { motion } from "framer-motion";

const styles = {
  mainStyle: {
    backgroundColor: "inherit",
    color: "inherit",
  },
};

export default function AnimatedCell({ align = "right", children }) {
  return (
    <TableCell
      sx={styles.mainStyle}
      align={align}
      component={motion.td}
      whileHover={{}}
    >
      {children}
    </TableCell>
  );
}
