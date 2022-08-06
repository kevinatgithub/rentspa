import { Button, Grid } from "@mui/material"
import FormLayout from "./FormLayout"

function IsValid() {
    return (
        <FormLayout
            description="Disable submit when not valid, however on page load, it is valid, so submit is enabled"
            submit={(formik) => {
                return <Grid container pt={2}>
                    <Button 
                        variant="contained" 
                        onClick={() => formik.submitForm()}
                        disabled={!formik.isValid}>Submit</Button>
                </Grid>
            }}
        />
    )
}

export default IsValid