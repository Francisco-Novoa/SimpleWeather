import * as React from "react";
import { TableRow } from "@mui/material";
import { motion } from "framer-motion";

const styles = {
  mainStyle: {
    margin: "10px",
    overflow: "hidden",
    backgroundColor: "#4c213d",
    color: "#01cdfe",
  },
};

export default function AnimatedRow({ children }) {
  return (
    <TableRow
      sx={styles.mainStyle}
      component={motion.tr}
      whileHover={{
        backgroundColor: "#FF71CE",
        color: "#FFFFFF",
        scale: 1.1,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </TableRow>
  );
}
