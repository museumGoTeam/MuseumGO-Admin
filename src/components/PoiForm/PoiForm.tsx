import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Form from '../Form/Form'
import Button from '../UI/Button'
import ImageUploader from '../UI/ImageUploader'
import Input from '../UI/Input'
import InputArea from '../UI/InputArea'
import {useLocation} from 'react-router-dom'
import { IPOI } from '../Canvas/types'
import classes from '*.module.css'


const useStyles = makeStyles(theme => ({
    button: {
        marginRight: 4,
        marginLeft: 4
    },
    buttonError: {
        backgroundColor: "red",
        color: 'white'
    }
}))


export default function PoiForm() {
    const classes = useStyles()
    const poi = useLocation<IPOI>().state

    return (
        <Form title={`Details of the point of interest ${poi.name}`}>
            <ImageUploader name="image" onUpload={() => {}} />
            <Input placeholder="name" marginVertical={8} />
            <InputArea placeholder="description" marginVertical={8} />
            <Grid item container justify="center">
                <Button label="Save" color="primary" className={classes.button}  /> 
                <Button label="Delete" className={`${classes.button} ${classes.buttonError}`} /> 
            </Grid>
        </Form>
    )
}
