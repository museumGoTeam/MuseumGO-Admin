import React from "react";
import { default as MuiButton, ButtonProps as MuiButtonProps }from "@material-ui/core/Button";

type ButtonProps = {
  label: string;
};

export default function Button({
  label,
  ...muiButtonProps
}: ButtonProps & MuiButtonProps) {
  return (
    <MuiButton
      variant="contained"
      disableElevation
      {...muiButtonProps}
    >
      {label}
    </MuiButton>
  );
}
