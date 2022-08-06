import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import GridTextField from "./shared/GridTextField";
import { initialValues, validate, validationSchema } from "./shared/models";
import Output from "./shared/Output";
import SubmitButton from "./shared/SubmitButton";

const ComponentsExample:FC = () => {
    const [formValues, setFormValues] = useState<any>()

    const onSubmit = (values:any) => setFormValues(values)

    return <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} validationSchema={validationSchema}>
                {formik => {
                    const f = formik
                    return <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>

                                <GridTextField label="First Name" name="firstName" f={f} />

                                <GridTextField label="Middle Name" name="middleName" f={f} />

                                <GridTextField label="Last Name" name="lastName" f={f} />

                                <GridTextField label="Email" name="email" f={f} pt={2} />

                            </Grid>
                            <SubmitButton handleSubmit={() => f.submitForm()} />
                        </Grid>
                        <Grid item xs={6}>
                            <Output f={f} formValues={formValues} />
                        </Grid>
                    </Grid>
                    </Form>
                }}
            </Formik>
    </>
}

export default ComponentsExample