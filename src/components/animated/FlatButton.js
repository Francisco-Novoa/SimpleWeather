import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

const StyledButton = styled(Button)(({ theme: { palette } }) => {
  return {
    borderColor: "#05ffa1",
    color: "#05ffa1",
    marginRight: "2px",
    marginLeft: "2px",
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
      whileHover={{
        scale: 1.1,
        borderColor: "#05ffa1",
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </StyledButton>
  );
}
