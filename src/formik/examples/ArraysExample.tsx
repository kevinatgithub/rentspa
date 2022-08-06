import { Grid } from "@mui/material"
import { Form, Formik } from "formik"
import { useState } from "react"
import MyGridField from "./shared/MyGridField"
import Output from "./shared/Output"
import SubmitButton from "./shared/SubmitButton"

const ArraysExample = () => {
    const [formValues,setFormValues] = useState()
    
    const initialValues = {
        fullName: '', emails: ['', '']
    }

    const onSubmit = (values:any) => setFormValues(values)

    return <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {formik => {
                return <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                
                                <MyGridField label="Full Name" name="fullName" xs={12} />
                                <MyGridField label="Work Email" name="emails[0]" xs={6} pt={2} />
                                <MyGridField label="Personal Email" name="emails[1]" xs={6} pt={2} />

                                <SubmitButton handleSubmit={() => formik.submitForm()} />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Output f={formik} formValues={formValues} />
                        </Grid>
                    </Grid>
                </Form>
            }}
        </Formik>
    </>
}

export default ArraysExample