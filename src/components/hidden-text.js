import React from "react";
import { Box } from "@material-ui/core";

const HiddenText = (props) => {
  const { show, text } = props;
  return (
    <React.Fragment>
      { show 
        ? text
        : (text && `${"*".repeat(text.length)}`)
      }
    </React.Fragment>
  );
};

export default HiddenText