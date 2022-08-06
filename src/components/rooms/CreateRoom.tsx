import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import React, { FC } from 'react'
import { validationSchema } from '../../formik/examples/shared/models';
import * as Yup from 'yup';
import MyField from '../../formik/examples/shared/MyField';
import { Link } from 'react-router-dom';

interface CreateRoomProps{
    editing?: boolean
}

const CreateRoom:FC<CreateRoomProps> = ({editing}) => {
    const initialValues = {
        name: "", monthlyRate: "", remarks: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter room name/number"),
        monthlyRate: Yup.number().required("Please enter room rate per month")
    })

    const handleSubmit = (values:any) => {

    }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => <Form>
            <Grid container p={2} rowSpacing={2} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom component="div" color={"primary"}>
                        {editing ? "Update" : "New"} Room Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Field name="name" >
                        {(fieldProps:any) => <MyField fullWidth label="Room Name/Number" fieldProps={fieldProps} />}
                    </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Field name="monthlyRate" >
                        {(fieldProps:any) => <MyField fullWidth label="Monthly Rate" fieldProps={fieldProps} InputProps={{
                            startAdornment: <InputAdornment position="start">P</InputAdornment>
                        }} />}
                    </Field>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Field name="remarks" >
                        {(fieldProps:any) => <MyField fullWidth label="Remarks" fieldProps={fieldProps} multiline rows={2} maxRows={4} />}
                    </Field>
                </Grid>
            </Grid>    
            <Grid container p={2} rowSpacing={2} spacing={2}>
                <Grid item xs={6} md={2}>
                    <Button variant='contained' size='large' fullWidth>Save</Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Link to="/rooms"><Button variant='contained' color='secondary' size='large' fullWidth>Cancel</Button></Link>
                </Grid>
            </Grid>    
        </Form>}
    </Formik>
  )
}

export default CreateRoom