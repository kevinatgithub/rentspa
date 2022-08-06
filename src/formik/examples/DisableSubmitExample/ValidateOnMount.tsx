import { Button, Grid } from "@mui/material"
import FormLayout from "./FormLayout"

function ValidateOnMount() {
    return (
        <>
            <FormLayout 
                // Attribute validateOnMount
                description="Disable submit when not valid, using validateOnMount, so submit is disabled on page load, not Ideal if form fields with validation are many"
                validateOnMount 
                submit={(formik) => {
                    return <Grid container pt={2}>
                        <Button 
                            variant="contained" 
                            onClick={() => formik.submitForm()}
                            disabled={!formik.isValid}>Submit</Button>
                    </Grid>
                }}
            />
        </>
    )
}

export default ValidateOnMount