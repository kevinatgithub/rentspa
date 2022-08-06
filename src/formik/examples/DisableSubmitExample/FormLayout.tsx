import { Divider, Grid, Typography } from '@mui/material';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { FC, useState } from 'react'
import { BasicInfo, initialValues, validate, validationSchema } from '../shared/models';
import MyGridField from '../shared/MyGridField';

interface FormLayoutProps{
    description: string,
    submit: (formik:FormikProps<BasicInfo>, formValues: any) => any,
    output?: (formik:FormikProps<BasicInfo>, formValues: any) => any,
    validateOnMount?: boolean,
    initialValues?: any,
    validate?: (values:any) => void,
    onSubmit?: (values:any, onSubmitProps: any) => void
}

const FormLayout:FC<FormLayoutProps> = ({description, submit, output, ...formikAttributes}) => {
    const [formValues, setFormValues] = useState<FormikValues>();
    const attrbs = formikAttributes ?? {}
    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            validationSchema={validationSchema}
            onSubmit={(values:FormikValues) => setFormValues(values)}
            {...attrbs}
            >
            {
                formik => <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant="body2" pt={2} pb={4} gutterBottom>
                                {description}
                            </Typography>
                            <Grid container spacing={2} rowSpacing={2}>
                                <MyGridField label="First Name" name="firstName" />
                                <MyGridField label="Middle Name" name="middleName" />
                                <MyGridField label="Last Name" name="lastName" />
                                <MyGridField label="Email" name="email" />
                            </Grid>
                            {submit(formik, formValues)}
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container rowSpacing={2}>
                                {output && output(formik, formValues)}
                                { !output && <>
                                    <Grid item xs={12}>
                                        {JSON.stringify(formik.errors)}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                        {JSON.stringify({ isValid: formik.isValid, dirty: formik.dirty })}
                                    </Grid>
                                </>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            }
        </Formik>
    )
}

export default FormLayout