import { Grid, TextField } from "@mui/material"
import { FC } from "react"

const GridTextField:FC<{label: string, name: string, f: any, xs?: number, pt?: number}> = ({label,name,f,xs,pt}) => {
    return <Grid item xs={xs ?? 4} pt={pt ?? 0}>
        <TextField
            label={label}
            {...(f.errors[name] ? {error:true} : {})}
            name={name}
            value={f.values[name]}
            onChange={f.handleChange}
            {...(f.errors[name] ? {helperText: f.errors[name]} : {})}
            onBlur={f.handleBlur}
        />
    </Grid>
}

export default GridTextField