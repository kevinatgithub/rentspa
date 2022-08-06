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
    maxRows?: number
}

const MyField:FC<MyFieldProps> = ({label, fieldProps, fullWidth, ...otherProps}) => {
    const {field, meta} = fieldProps
    return <TextField 
        {...otherProps}
        fullWidth={fullWidth}
        label={label}
        {...(meta.error && meta.touched ? {error:true} : {})}
        {...(meta.error && meta.touched ? {helperText: meta.error} : {})}
        {...field}
    />
}

export default MyField