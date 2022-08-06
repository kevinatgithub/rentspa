import { Button, Grid } from "@mui/material"
import { FormikHelpers } from "formik";
import FormLayout from "./FormLayout"

function WhenSubmittingIsDone() {

    // onSubmit props, has 2nd parameter for onSubmitProps
    const handleSubmit = async (values:any, onSubmitProps: FormikHelpers<any>) => {
        
        await new Promise(r => setTimeout(r, 2000));

        // set submitting to false and reset form to accommodate next record
        onSubmitProps.resetForm()
        onSubmitProps.setSubmitting(false)
    }

    return (
        <>
            <FormLayout 
                description="Disable submit when submitting, delay for 2 seconds, after actual submit, manually set isSubmitting=false"
                // onSubmit props, has 2nd parameter for onSubmitProps
                onSubmit={handleSubmit}
                submit={(formik) => {
                    return <Grid container pt={2}>
                        <Button 
                            variant="contained" 
                            onClick={() => formik.submitForm()}
                            // using the isSubmitting to disable the submit button
                            disabled={formik.isSubmitting}>Submit</Button>
                        <Button variant="contained" color="success" onClick={() => formik.resetForm()} style={{marginLeft:5}}>
                           Reset 
                        </Button>
                    </Grid>
                }}
                output={(formik) => {
                    return <>
                        <Grid item xs={12}>
                            {JSON.stringify({isSubmitting: formik.isSubmitting})}
                        </Grid>
                    </>
                }}
            />
        </>
    )
}

export default WhenSubmittingIsDone