import { Grid, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { initialValues, validate, validationSchema } from "./shared/models";
import MyGridField from "./shared/MyGridField";
import Output from "./shared/Output";
import SubmitButton from "./shared/SubmitButton";

const FieldRenderPropExample:FC = () => {
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
                                                <Field name="firstName">
                                                    {(fieldProps:any) => {
                                                        const {field, meta} = fieldProps
                                                        return <TextField
                                                            label="First Name"
                                                            {...(meta.error ? {error:true} : {})}
                                                            {...(meta.error ? {helperText: meta.error} : {})}
                                                            {...field}
                                                        />
                                                    }}
                                                </Field>
                                            </Grid>

                                            <MyGridField label="Middle Name" name="middleName" />

                                            <MyGridField label="Last Name" name="lastName" />

                                        </Grid>
                                        <Grid container pt={2}>
                                            <MyGridField label="Email" name="email" />
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

export default FieldRenderPropExample