import { SvgIcon, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import React from "react";

interface QuestionMarkToolTipProps {
  tooltipText: string;
}

export function QuestionMarkToolTip(props: QuestionMarkToolTipProps) {
  const { tooltipText } = props;
  return (
    <Tooltip title={tooltipText} placement="right">
      <SvgIcon color="primary">
        <HelpOutlineIcon />
      </SvgIcon>
    </Tooltip>
  );
}
