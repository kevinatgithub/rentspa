import { Button, Grid } from "@mui/material";
import { FC } from "react";

const SubmitButton:FC<{handleSubmit:(values:any) => void}> = ({handleSubmit}) => {
    return <Grid container pt={2}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Grid>
}

export default SubmitButton