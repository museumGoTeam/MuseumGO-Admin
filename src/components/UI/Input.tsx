import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CharacterCounter from "./CharacterCounter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.05)",
    border: `2px solid rgba(0,0,0,0.05)`,
    borderRadius: "0.4rem",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    "&:focus-within": {
      outline: "none",
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  input: {
    flexGrow: 1,
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
  },
  fullWidth: {
    width: "100%",
  },
  margin: {
    marginTop: 8,
    marginBottom: 8,
  },
}));

type Props = {
  withCounter?: boolean;
  maxCount?: number;
  currentCount?: number;
  fullWidth?: boolean;
  marginHorizontal?: number;
  marginVertical?: number;
  className?: string;
};

const setMarginHorizontal = (value: number | undefined) => ({
  marginleft: value,
  marginRight: value,
});
const setMarginVertical = (value: number | undefined) => ({
  marginTop: value,
  marginBottom: value,
});

const Input: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ({
  withCounter,
  maxCount,
  currentCount,
  fullWidth,
  marginHorizontal,
  marginVertical,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.root} ${className} ${
        fullWidth && classes.fullWidth
      }`}
      style={
        marginHorizontal
          ? setMarginHorizontal(marginHorizontal)
          : marginVertical
          ? setMarginVertical(marginVertical)
          : {}
      }
    >
      <input {...props} className={classes.input} />
      {withCounter && maxCount && currentCount !== undefined && (
        <CharacterCounter maxCount={maxCount} currentCount={currentCount} />
      )}
    </div>
  );
};

export default Input;
