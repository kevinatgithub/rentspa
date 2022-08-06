import { Grid } from "@mui/material"
import { useState } from "react"
import Config, { Configuration } from "./Config"
import FormOutput from "./FormOutput"
import LabForm from "./LabForm"
import { initialValues } from "../shared/models"

const Lab = () => {
    const [configuration,setConfiguration] = useState<Configuration>({
        initialValues
    })

    return <Grid container spacing={2}>
        <Grid item xs={7}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <LabForm initialValues={initialValues} />
                </Grid>
                <Grid item xs={12} pt={2}>
                    <FormOutput />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={5}>
            {JSON.stringify(configuration)}
            <Config configuration={configuration} setConfiguration={v => setConfiguration({initialValues: v})} />
        </Grid>
    </Grid>
}

export default Lab