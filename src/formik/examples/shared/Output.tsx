import { Typography } from "@mui/material"
import { FC } from "react"

interface OutputProps {
    f: any,
    formValues: any
}

const Output:FC<OutputProps> = ({f, formValues}) => {
    return <>
        <Typography variant="caption" display="block" gutterBottom>
            {JSON.stringify(f.values)}
            <hr />
            {JSON.stringify(f.errors)}
            <hr />
            {JSON.stringify(f.touched)}
        </Typography>
        <hr />
        <Typography variant="caption" display="block" gutterBottom>
            {JSON.stringify(formValues)}
        </Typography>
    </>
}

export default Output