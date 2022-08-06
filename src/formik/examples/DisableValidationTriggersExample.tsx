import { Grid } from "@mui/material"
import { Form, Formik } from "formik"
import { useState } from "react"
import { initialValues, validate, validationSchema } from "./shared/models"
import MyGridField from "./shared/MyGridField"
import Output from "./shared/Output"
import SubmitButton from "./shared/SubmitButton"

const DisableValidationTriggersExample = () => {
    const [formValues, setFormValues] = useState()

    const onSubmit = (values:any) => setFormValues(values)

    return <Formik 
            initialValues={initialValues} 
            validate={validate} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit} 
            validateOnChange={false}
            validateOnBlur={false}>
        {formik => 
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <MyGridField label="First Name" name="firstName" />
                            <MyGridField label="Middle Name" name="middleName" />
                            <MyGridField label="Last Name" name="lastName" />
                            <MyGridField label="Email" name="email" pt={2} />

                        </Grid>
                        <SubmitButton handleSubmit={() => formik.submitForm()} />
                    </Grid>
                    <Grid item xs={6}>
                        <Output f={formik} formValues={formValues} />
                    </Grid>
                </Grid>
            </Form>
        }
    </Formik>
}

export default DisableValidationTriggersExample