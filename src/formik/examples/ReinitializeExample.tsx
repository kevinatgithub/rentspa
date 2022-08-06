import { Button, Grid } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { BasicInfo, initialValues } from './shared/models'
import MyGridField from './shared/MyGridField'
import Output from './shared/Output'
import SubmitButton from './shared/SubmitButton'

function ReinitializeExample() {
    const [formValues, setFormValues] = useState<BasicInfo | null>()

    const handleLoadData = () => setFormValues({
        firstName: 'kevin', middleName: 'des', lastName: 'cainday', email: 'test@ey.com'
    })

    const handleReset = (formik: FormikProps<any>) => {
        setFormValues(null)
        formik.resetForm()
    }

    return <Formik
        // use formValues if not null otherwise use initial values
        initialValues={formValues ?? initialValues}
        // using enableReinitialize
        enableReinitialize
        onSubmit={() => { }}>
        {formik => <Form>
            <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <MyGridField label="First name" name="firstName" />
                        <MyGridField label="Middle name" name="middleName" />
                        <MyGridField label="Last name" name="lastName" />
                        <MyGridField label="Email" name="email" />
                    </Grid>
                    <SubmitButton handleSubmit={values => setFormValues(values)} />
                    <Grid container spacing={2} rowSpacing={2}>
                        <Grid item xs={12} mt={2}>
                            <Button variant="contained" color="success" onClick={handleLoadData}>Load Data</Button>
                            <Button variant="contained" color="error" style={{ marginLeft: 5 }} onClick={() => handleReset(formik)}>Reset</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Output f={formik} formValues={formValues} />
                </Grid>
            </Grid>
        </Form>}
    </Formik>
}

export default ReinitializeExample