import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

const StyledButton = styled(Button)(({ theme: { palette } }) => {
  return {
    minWidth: "100px",
    height: "38px",
    padding: "8",
    marginRight: "2px",
    marginLeft: "2px",
    borderRadius: "15px",
  };
});

export default function CustomizedButtons({ children, onClick, ...props }) {
  return (
    <StyledButton
      {...props}
      onClick={onClick}
      variant="outlined"
      component={motion.div}
      disableRipple
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </StyledButton>
  );
}
