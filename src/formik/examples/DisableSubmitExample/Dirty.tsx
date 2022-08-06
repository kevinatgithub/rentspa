import { Button, Grid } from "@mui/material"
import FormLayout from "./FormLayout"

function Dirty() {
    return (
        <>
            <FormLayout 
                description="Disable submit when not valid and not dirty, not ideal if form has initial values or editing a record"
                submit={(formik) => {
                    return <Grid container pt={2}>
                        <Button 
                            variant="contained" 
                            onClick={() => formik.submitForm()}
                            disabled={!(formik.dirty && formik.isValid)}>Submit</Button>
                    </Grid>
                }}
            />
        </>
    )
}

export default Dirty