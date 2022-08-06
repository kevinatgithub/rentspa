import { Button, Grid } from "@mui/material"
import FormLayout from "./FormLayout"

function WhenSubmittingWithValidate() {

    const validate = async () => {
        const errors = {}
        
        await new Promise(r => setTimeout(r, 2000));

        return errors
    }

    return (
        <>
            <FormLayout 
                validate={validate}
                description="Disable submit when submitting, using validate attribute with 2 seconds delay, after validate, formik automatically set it back to isSubmitting=false"
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

export default WhenSubmittingWithValidate