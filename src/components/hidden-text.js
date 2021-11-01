import React from "react";
import { Box } from "@material-ui/core";

const HiddenText = ({show = true, children, length = 8}) => {
  return (
    <React.Fragment>
      { show 
        ? children
        : `${"*".repeat(length)}`
      }
    </React.Fragment>
  );
};

export default HiddenText