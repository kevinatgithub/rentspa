import { Grid } from "@mui/material"
import { Formik } from "formik"
import { useState } from "react"
import MyGridField from "./shared/MyGridField"
import Output from "./shared/Output"
import SubmitButton from "./shared/SubmitButton"

const NestedObjects = () => {
    const [values,setValues] = useState()
    const initialValues = {
        fullName : "",
        address : {
            house : "", street : "", city : "", province : "", region : ""
        },
    }
    
    const onSubmit = (values:any) => setValues(values)
    
    return <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik:any) => <>
                <Grid container>
                    <Grid item xs={9}>
                        <Grid container>
                            <MyGridField label="Full Name" name="fullName" xs={12} />
                        </Grid>
                        <Grid container pt={2}>
                            
                            <MyGridField label="House #" name="address.house" />

                            <MyGridField label="Street" name="address.street" />
                            
                            <MyGridField label="City" name="address.city" />
                            
                            <MyGridField label="Province" name="address.province" pt={2} />
                            
                            <MyGridField label="Region" name="address.region" pt={2} />

                        </Grid>
                        <SubmitButton handleSubmit={() => formik.submitForm()} />
                    </Grid>
                    <Grid item xs={3}>
                        <Output f={formik} formValues={values} />
                    </Grid>
                </Grid>
            </>}
        </Formik>
    </>
}

export default NestedObjects