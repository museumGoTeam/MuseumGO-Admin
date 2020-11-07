import React from "react";
import { default as MuiButton } from "@material-ui/core/Button";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties
};

export default function Button({
  label,
  onClick,
  disabled,
  className,
  style
}: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      className={className}
      style={style}
      disableElevation
      disabled={disabled}
    >
      {label}
    </MuiButton>
  );
}
