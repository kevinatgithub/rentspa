import { Grid } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import { BasicInfo } from "../shared/models"
import MyGridField from "../shared/MyGridField"

interface LabFormProps {
    initialValues: BasicInfo
}
const LabForm:FC<LabFormProps> = ({initialValues}) => {
    const [formValues, setFormValues] = useState<BasicInfo>()
    
    const onSubmit = (values:BasicInfo) => setFormValues(values)
    
    return <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
            <Grid container spacing={2}>
                <MyGridField label="First Name" name="firstName" />
            </Grid>
        </Form>
    </Formik>
}

export default LabForm