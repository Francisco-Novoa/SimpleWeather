import * as React from "react";
import {
  Paper,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import AnimatedCell from "./animated/tableCell";
import AnimatedRow from "./animated/TableRow";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const styles = {
  mainStyle: {
    overflow: "visible",
    color: "#01cdfe",
    minWidth: "650px",
    border: 0,
  },
  tableHead: {
    backgroundColor: "details",
  },
};

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={styles.mainStyle}>
      <Table>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ name, calories, fat, carbs, protein }) => (
            <AnimatedRow key={name}>
              <AnimatedCell align="left">{name}</AnimatedCell>
              <AnimatedCell>
                <Typography>{calories}</Typography>
              </AnimatedCell>
              <AnimatedCell>
                <Typography>{fat}</Typography>
              </AnimatedCell>
              <AnimatedCell>
                <Typography>{carbs}</Typography>
              </AnimatedCell>
              <AnimatedCell>
                <Typography>{protein}</Typography>
              </AnimatedCell>
            </AnimatedRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
