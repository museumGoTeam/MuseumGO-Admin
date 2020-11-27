import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useUploadImage from "../hooks/useUploadImage";
import axios from "axios";
import QRCode from "qrcode.react";
import Form from "../components/Form/Form";
import { message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { IPOI } from "../components/Canvas/types";
import { APIRes } from "../type";
import ImageUploader from "../components/UI/ImageUploader";
import Input from "../components/UI/Input";
import InputArea from "../components/UI/InputArea";
import Grid from "@material-ui/core/Grid";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import useDownloadImg from "../hooks/useDownloadImg";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: 4,
    marginLeft: 4,
  },
  buttonError: {
    backgroundColor: "red",
    color: "white",
  },
  qrCode: {
    [theme.breakpoints.down("sm")]: {
      width: "64px!important",
      height: "64px!important",
    },
  },
}));

interface PoiPS {
  loading: boolean;
  data: IPOI | undefined;
}
const initialState = {
  loading: true,
  data: undefined,
};

export default function PoiP() {
  const classes = useStyles();
  const routeParams = useParams<{ id: string }>();
  const history = useHistory();
  const uploadImage = useUploadImage();
  const downloadImg = useDownloadImg()
  const anchorRef = React.useRef<HTMLAnchorElement>(null)
  const [form, setForm] = React.useState<PoiPS>(initialState);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchPoi = async () => {
      console.log(routeParams.id);
      const fetchedPoi = (await axios.get<APIRes>(`/poi/${routeParams.id}`))
        .data;
      if (!fetchedPoi.success) {
        message.error(fetchedPoi.message);
        return;
      }
      setForm({ loading: false, data: fetchedPoi.data });
    };
    fetchPoi();
  }, [routeParams.id]);

  const handleChange = (name: string, value: File | string) => {
    form &&
      form.data &&
      setForm({ ...form, data: { ...form.data, [name]: value } });
  };

  const onSubmit = async () => {
    let imageUrl;
    message.loading("The point of interest is updating ...");
    if (form.data) {
      if (form.data.image) {
        imageUrl = await uploadImage(form.data.image as File);
      }
      const res = (
        await axios.put<APIRes>("/poi", { ...form.data, image: imageUrl })
      ).data;
      if (res.success) {
        message.success(res.message);
        return;
      }
      message.error(res.message);
    }
  };

  const onDelete = async () => {
    const deletedPoi = (await axios.delete<APIRes>(`/poi/${form.data?._id}`))
      .data;
    if (!deletedPoi.success) {
      message.error(deletedPoi.message);
      return;
    }
    message.warning(deletedPoi.message);
    history.push("/");
  };

  const onDownload = () => {
    if (form.data) {
      downloadImg({ref: anchorRef, documentID: form.data._id, fileName: `point-of-interes-${form.data._id}`})
    }
  }

  const onModalOpen = () => setModalOpen(true);
  const onModalClose = () => setModalOpen(false);

  if (form.loading) return <p>Loading ...</p>;
  if (!form.data) return <p>Error</p>;

  return (
    <Form title={`Details of the point of interest ${form.data.name}`}>
      <Modal
        open={modalOpen}
        onClose={onModalClose}
        title="Are you sure to delete the point of interest ?"
        text="The action is irreversible"
        onYes={onDelete}
        onNo={onModalClose}
      />
      <QRCode
        id={form.data._id}
        value={form.data._id}
        level="H"
        includeMargin={true}
        className={classes.qrCode}
      />
      <ImageUploader
        name="image"
        value={form.data.image as string}
        onUpload={(name, value) => handleChange(name, value)}
      />
      <Input
        placeholder="name"
        value={form.data.name}
        onChange={(e) => handleChange("name", e.target.value)}
        marginVertical={8}
      />
      <InputArea
        placeholder="description"
        value={form.data.description ? form.data.description : ""}
        onChange={(e) => handleChange("description", e.target.value)}
        marginVertical={8}
      />
      <Grid item container justify="center">
        <Button
          label="Save"
          color="primary"
          onClick={onSubmit}
          className={classes.button}
        />
        <Button
          label="Delete"
          className={`${classes.button} ${classes.buttonError}`}
          onClick={onModalOpen}
        />
        <Button 
        label="Download QR code"
        className={classes.button}
        onClick={onDownload} />
        <a style={{display: "none"}} ref={anchorRef} href="http://google.com">Download</a>
      </Grid>
    </Form>
  );
}
