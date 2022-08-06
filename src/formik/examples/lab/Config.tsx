import { Grid } from "@mui/material"
import { Form, Formik } from "formik"
import { FC } from "react"
import MyGridField from "../shared/MyGridField"
import SubmitButton from "../shared/SubmitButton"

export interface Configuration{
    initialValues: any
}
interface ConfigProps{
    configuration: Configuration,
    setConfiguration: (config: Configuration) => void
}
const Config:FC<ConfigProps> = ({configuration, setConfiguration}) => {
    const {initialValues} = configuration
    const onSubmit = (values: Configuration) => {
        setConfiguration(values)
    }
    return <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {formik => <Form>
            <Grid container spacing={2}>
                <MyGridField label="Initial value First Name" name="initialValues.firstName" xs={12} />
            </Grid>
            <SubmitButton handleSubmit={() => formik.submitForm()} />
        </Form>}
    </Formik>
}

export default Config