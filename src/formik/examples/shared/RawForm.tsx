import { Grid, TextField } from "@mui/material"
import { FC } from "react"

const RawForm:FC<any> = (props) => {
    const {f} = props
    return <>
        <Grid container>
            <Grid item xs={4}>
                <TextField
                    label="First Name"
                    {...(f.errors.firstName ? {error:true} : {})}
                    name="firstName"
                    value={f.values.firstName}
                    onChange={f.handleChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    label="Middle Name"
                    {...(f.errors.middleName ? {error:true} : {})}
                    name="middleName"
                    value={f.values.middleName}
                    onChange={f.handleChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    label="Last Name"
                    {...(f.errors.lastName ? {error:true} : {})}
                    name="lastName"
                    value={f.values.lastName}
                    onChange={f.handleChange}
                />
            </Grid>
        </Grid>
    </>
}

export default RawForm