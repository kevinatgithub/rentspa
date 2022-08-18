import { TextField } from "@mui/material";
import { FC } from "react";

interface MyFieldProps {
    label: string,
    fieldProps: any,
    fullWidth?: boolean,
    type?: any,
    InputProps?: any,
    multiline?: boolean,
    rows?: number,
    maxRows?: number,
    value?: any,
    defaultValue?: any,
    InputLabelProps?: any
}

const MyField:FC<MyFieldProps> = ({fieldProps, ...otherProps}) => {
    const {field, meta} = fieldProps
    return <TextField 
        {...otherProps}
        {...(meta.error && meta.touched ? {error:true} : {})}
        {...(meta.error && meta.touched ? {helperText: meta.error} : {})}
        {...field} 
    />
}

export default MyField