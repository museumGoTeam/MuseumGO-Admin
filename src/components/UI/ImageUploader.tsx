import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid, {GridProps} from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'

const useStyles = makeStyles((theme) => ({
  uploadIcon: {
    fontSize: 64,
    color: theme.palette.secondary.main,
  },
  inputFile: {
    display: "none",
  },
  uploadContainer: ({image}: {image: string | undefined}) => ({
    borderColor: "rgba(0,0,0,0.05)",
    borderRadius: "0.4rem",
    borderWidth: 2,
    borderStyle: 'solid',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    height: 230,
    backgroundImage: image ? `url("${image}")` : "",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    "&:hover": {
      cursor: "pointer",
      outline: "none",
    },
  }),
}));

type Props = {
  name: string;
  value?: string | undefined
  onUpload: (name: string, file: File) => void;
};

const ImageUploader: React.FC<Props & GridProps> = ({ name, onUpload, value, ...rest }) => {
  const [image, setImage] = React.useState<string | undefined>(value);
  const classes = useStyles({image});
  const theme = useTheme();
  const inputEl = React.useRef<HTMLInputElement>(null);
  const [dragInfo, setDragInfo] = React.useState<{
    isDragEnter: boolean;
    isDragFinish: boolean;
    hasRightSize: boolean;
    hasRightFormat: boolean;
  }>({
    isDragEnter: false,
    isDragFinish: false,
    hasRightSize: false,
    hasRightFormat: false,
  });

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragInfo({ ...dragInfo, isDragEnter: false });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragInfo({ ...dragInfo, isDragEnter: true });
  };

  const handleUploadclick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputEl && inputEl.current) inputEl.current.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    upload(e.dataTransfer.files[0]);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) upload(e.target.files[0]);
  };

  const upload = (file: File) => {
    const hasRightSize = file.size / 1024 < 2000; //PLus petit que 2MO
    const hasRightFormat =
      file.type === "image/jpeg" || file.type === "image/png"; //JPEG ET PNG
    if (hasRightSize && hasRightFormat) {
      onUpload(name, file);
      setImage(URL.createObjectURL(file));
    }
    setDragInfo({
      isDragEnter: false,
      isDragFinish: true,
      hasRightSize,
      hasRightFormat,
    });
  };

  return (
    <Grid item container justify="center">
      <input
        type="file"
        ref={inputEl}
        onChange={handleFileSelected}
        className={classes.inputFile}
      />
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.uploadContainer}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onClick={handleUploadclick}
        style={{
          border: dragInfo.isDragEnter
            ? `2px dotted ${theme.palette.primary.main}`
            : dragInfo.isDragFinish
            ? dragInfo.hasRightFormat && dragInfo.hasRightSize
              ? `2px solid ${theme.palette.primary.main}`
              : `2px dotted ${theme.palette.error.main}`
            : "",
        }}
      >
        {!dragInfo.hasRightFormat &&
          !dragInfo.hasRightFormat &&
          !dragInfo.isDragFinish && 
          !image && (
            <React.Fragment>
              <CloudUploadIcon className={classes.uploadIcon} />
              <Typography variant="body1" align="center">
                Drag and drop an image from your computer
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                style={{
                  color:
                    dragInfo.isDragFinish && !dragInfo.hasRightSize
                      ? theme.palette.error.main
                      : "",
                }}
              >
                The file must not excess 2 Mb.
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                style={{
                  color:
                    dragInfo.isDragFinish && !dragInfo.hasRightFormat
                      ? theme.palette.error.main
                      : "",
                }}
              >
                Type file allowed : JPEG | PNG
              </Typography>
            </React.Fragment>
          )}
      </Grid>
    </Grid>
  );
};

export default ImageUploader;
