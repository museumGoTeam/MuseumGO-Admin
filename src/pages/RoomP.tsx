import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Form from '../components/Form/Form'
import Input from '../components/UI/Input'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { IRoom } from '../components/Canvas/types'
import { APIRes } from '../type'
import { message } from 'antd'
import Button from '../components/UI/Button'

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

    return (
        <Form title={`Details of the room ${form.data.label}`}>
            <Input placeholder="label" value={form.data.label} onChange={e => handleChange("label", e.target.value)} marginVertical={8} />
            <Grid item container justify="center">
                <Button label="save" color="primary" onClick={onSubmit} className={classes.button} />
                <Button label="delete" className={`${classes.button} ${classes.buttonError}`} />
            </Grid>
        </Form>
    )
}
