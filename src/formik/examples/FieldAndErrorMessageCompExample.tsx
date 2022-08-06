import { Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { initialValues, validate, validationSchema } from "./shared/models";
import Output from "./shared/Output";
import SubmitButton from "./shared/SubmitButton";

const FieldAndErrorMessageCompExample:FC = () => {
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
                                            <Grid item xs={4}>
                                                <label>First Name</label><br/>
                                                <Field name="firstName" /><br/>
                                                <ErrorMessage name="firstName" />
                                            </Grid>

                                            <GridLabelFieldError label="Middle Name" name="middleName" />
                                            <GridLabelFieldError label="Last Name" name="lastName" />
                                            <GridLabelFieldError label="Email" name="email" pt={2} />
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

export default FieldAndErrorMessageCompExample

const GridLabelFieldError:FC<{label: string, name:string, xs?:number, pt?: number}> = ({label, name,xs,pt}) => {
    return <Grid item xs={xs ? xs : 4} pt={pt ? pt : 0}>
        <label>{label}</label><br/>
        <Field name={name} /><br/>
        <ErrorMessage name={name} />
    </Grid>
}