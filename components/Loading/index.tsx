import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
