import React from "react";

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