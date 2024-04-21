import { Typography } from "@material-ui/core";
import React from "react";

const CommonHeader = ({title}) => {
  return (
    <div>
      <div
       
      >
        <Typography className="text-dark text-center py-12" variant="h6">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default CommonHeader;
