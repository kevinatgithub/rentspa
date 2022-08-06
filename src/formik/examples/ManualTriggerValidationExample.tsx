import { Button, Grid } from "@mui/material"
import { Form, Formik } from "formik"
import { useState } from "react"
import { BasicInfo, initialValues, validate, validationSchema } from "./shared/models"
import MyGridField from "./shared/MyGridField"
import Output from "./shared/Output"
import SubmitButton from "./shared/SubmitButton"
const ManualTriggerValidationExample = () => {
    const [formValues, setFormValues] = useState<BasicInfo>()

    return <Formik initialValues={initialValues} validate={validate} validationSchema={validationSchema} onSubmit={(values:any) => setFormValues(values)}>
        {formik => <Form>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <MyGridField label="First Name" name="firstName" />
                        <MyGridField label="Middle Name" name="middleName" />
                        <MyGridField label="Last Name" name="lastName" />
                        <MyGridField label="Email" name="email" pt={2} />
                    </Grid>
                    <Grid container spacing={2} pt={2}>
                        <Grid item xs={4}>
                            <Button variant="contained" color="success" onClick={() => formik.validateField("firstName")}>Validate First Name</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="success" onClick={() => formik.setFieldTouched("firstName",true)}>Visit First Name</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="success" onClick={() => formik.validateField("email")}>Validate Email</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="success" onClick={() => formik.setFieldTouched("email",true)}>Visit Email</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="success" onClick={() => formik.validateForm()}>Validate All</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="success" onClick={() => formik.setTouched({ firstName: true, middleName: true, lastName: true, email: true})}>Visit All</Button>
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

export default ManualTriggerValidationExample