import React, { PropsWithChildren } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "./Button";

interface ModalProps {
  title: string;
  text?: string;
  open: boolean;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void
}

export default function Modal({ title, text, open, onClose, onYes, onNo }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button variant="text" label="Yes" color="primary" onClick={onYes} />
          <Button variant="text" label="No" color="primary" onClick={onNo} />
      </DialogActions>
    </Dialog>
  );
}
