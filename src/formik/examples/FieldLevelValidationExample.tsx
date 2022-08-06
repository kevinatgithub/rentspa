import { Grid } from "@mui/material"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { BasicInfo, initialValues } from "./shared/models"
import MyField from "./shared/MyField"
import MyGridField from "./shared/MyGridField"
import Output from "./shared/Output"
import SubmitButton from "./shared/SubmitButton"

const FieldLevelValidationExample = () => {
    const [formValues, setFormValues] = useState<BasicInfo>()

    // add comments field
    const initValues = {...initialValues, comments: ''}

    const validateComments = (value:any) => {
        if (!value)
            return "Comment is required"
        
        if (value.length > 50)
            return "Comment is too long"
    }
    
    return <Formik initialValues={initValues} onSubmit={values => setFormValues(values)}>
        {formik => <Form>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container spacing={2}>

                        <MyGridField label="First Name" name="firstName" />
                        <MyGridField label="Middle Name" name="middleName" />
                        <MyGridField label="Last Name" name="lastName" />
                        <MyGridField label="Email" name="email" pt={2} />

                        <Grid item xs={12} pt={2}>
                            <Field name="comments" validate={validateComments}>
                                {(fieldProps:any) => <MyField label="Comments" fieldProps={fieldProps} />}
                            </Field>
                        </Grid>

                    </Grid>
                    <SubmitButton handleSubmit={() => formik.submitForm()} />
                </Grid>
                <Grid item xs={6}>
                    <Output f={formik} formValues={formValues} />
                </Grid>
            </Grid>    
        </Form>}
    </Formik>
}

export default FieldLevelValidationExample