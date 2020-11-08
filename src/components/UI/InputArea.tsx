import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
  placeholder?: string | undefined
  value?: string | undefined,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
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

export default function InputArea({
  fullWidth,
  marginHorizontal,
  marginVertical,
  placeholder,
  value,
  onChange,
  className,
}: Props) {
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
      <textarea value={value} onChange={onChange} placeholder={placeholder}  rows={4} cols={50} className={classes.input} />
    </div>
  );
}
