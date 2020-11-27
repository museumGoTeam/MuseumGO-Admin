import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Form from '../components/Form/Form'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import QRCode from 'qrcode.react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { IRoom } from '../components/Canvas/types'
import { APIRes } from '../type'
import { message } from 'antd'
import useDownloadImg from '../hooks/useDownloadImg'


const useStyles = makeStyles(() => ({
    button: {
        marginRight: 4,
        marginLeft: 4
    },
    buttonError: {
        backgroundColor: "red",
        color: "white"
    }
}))


export default function RoomP() {
    const classes = useStyles()
    const routeParams = useParams<{id: string}>()
    const history = useHistory()
    const downloadImg = useDownloadImg()
    const anchorRef = React.useRef<HTMLAnchorElement>(null)
    const [form, setForm] = React.useState<{loading: Boolean, data: IRoom | undefined}>({
        loading: true,
        data: undefined
    })


    React.useEffect(() => {
        (async () => {
            message.loading("Loading ...")
            const fetchedRoom = (await axios.get<APIRes>(`/rooms/${routeParams.id}`)).data
            if (!fetchedRoom.success) {
                message.error(fetchedRoom.message)
                return
            }
            setForm({loading: false, data: fetchedRoom.data})
        })()
    }, [routeParams])


    const handleChange = (name: string, value: string) => {
        form && form.data && setForm({...form, data: {...form.data, [name]: value}})
    }

    const onSubmit = async () => {
        message.loading("The room is updating ...")
        if (form.data) {
            const res = (await axios.put<APIRes>("/rooms", form.data)).data
            if (res.success) {
                message.success(res.message)
                return
            }
            message.error(res.message)
        }
    }

    if (form.loading)  {
        return <></>
    }
    if (!form.data) return <></>

    const deleteRoom = async  () => {
        const deleedRoom = (await axios.delete<APIRes>(`/rooms/${form.data?._id}`)).data
        if (!deleedRoom.success) {
          message.error(deleedRoom.message)
          return
        }
        message.warning(deleedRoom.message)
        history.push("/")
    }

    const downloadQRCode = () => {
        if (form.data) {
            downloadImg({ref: anchorRef, documentID: form.data._id, fileName: `qr-code-room-${form.data._id}`})
        }
    }

    return (
        <Form title={`Details of the room ${form.data.label}`}>
            <QRCode id={form.data._id} value={form.data._id} size={290} level="H" includeMargin={true}   />
            <Input placeholder="label" value={form.data.label} onChange={e => handleChange("label", e.target.value)} marginVertical={8} />
            <Grid item container justify="center">
                <Button label="save" color="primary" onClick={onSubmit} className={classes.button} />
                <Button label="delete" onClick={deleteRoom} className={`${classes.button} ${classes.buttonError}`} />
                <Button label="Downlad QR code" color="primary" onClick={downloadQRCode} className={`${classes.button}`} />
                <a style={{display: "none"}} ref={anchorRef} href="http://google.com">Download</a>
            </Grid>
        </Form>
    )
}
