import { Alert, Button, Card, CardContent, Grid, Snackbar } from '@mui/material';
import { Form, Formik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import RoomForm from './RoomForm';

const CreateRoom:FC = () => {
    const { id } = useParams()
    const editing = id ? true : false
    const [initialValues, setInitialValues] = useState({
        name: "", monthlyRate: "", remarks: ""
    })
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if ( id ){
            API.get(`/Rooms/${id}`).then(r => {
                if (r.data){
                    const {name, pricePerMonth, remarks} = r.data
                    setInitialValues({
                        name, remarks, monthlyRate: pricePerMonth
                    })
                }
            })
        }
    }, [id])

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter room name/number"),
        monthlyRate: Yup.number().required("Please enter room rate per month")
    })

    const handleSubmit = (values:any) => {
        setDisabled(true)
        if ( !id ){
            API.post("/Rooms",{
                id:0,
                name: values.name,
                pricePerMonth: values.monthlyRate*1,
                remarks: values.remarks
            }).then(result => {
                navigate("/rooms")
            })
        } else {
            API.put(`/Rooms`, {
                id, name: values.name, pricePerMonth: values.monthlyRate*1, remarks: values.remarks
            }).then(_ => {
                navigate(`/rooms/${id}`)
            })
        }
        setOpen(true);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => <Form>
            <Card>
                <CardContent>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                        </Alert>
                    </Snackbar>
                    <RoomForm editing={id ? true : false} />
                        
                    <Grid container p={2} rowSpacing={2} spacing={2}>
                        <Grid item xs={6} md={2}>
                            <Button variant='contained' size='large' fullWidth onClick={e => formik.submitForm()} disabled={disabled}>Save</Button>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Link to="/rooms"><Button variant='contained' color='secondary' size='large' fullWidth disabled={disabled}>Cancel</Button></Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Form>}
    </Formik>
  )
}

export default CreateRoom