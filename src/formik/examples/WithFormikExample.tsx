import { Button, Grid } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

function WithFormikExample() {
    const initialValues = {
        firstName: "", middleName: "", lastName: "", email: ""
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is Required!"),
        lastName: Yup.string().required("Last name is Required!"),
        email: Yup.string().required("email is Required!").email("email is Invalid")
    })

    const handleSubmit = (values: any) => alert(JSON.stringify(values))

    return <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => <Form>
            <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={4}>
                    <label>First Name</label><br/>
                    <Field name="firstName" /><br/>
                    <ErrorMessage name="firstName" component={Error} />
                </Grid>
                <Grid item xs={4}>
                    <label>Middle Name</label><br/>
                    <Field name="middleName" /><br/>
                    <ErrorMessage name="middleName" component={Error} />
                </Grid>
                <Grid item xs={4}>
                    <label>Last Name</label><br/>
                    <Field name="lastName" /><br/>
                    <ErrorMessage name="lastName" component={Error} />
                </Grid>
                <Grid item xs={4}>
                    <label>Email</label><br/>
                    <Field name="email" /><br/>
                    <ErrorMessage name="email" component={Error} />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => formik.submitForm()}>Submit</Button>
                </Grid>
            </Grid>
        </Form>}
    </Formik>
}

export default WithFormikExample

const Error = (props:any) => <div style={{color:'red'}}>{props.children}</div>