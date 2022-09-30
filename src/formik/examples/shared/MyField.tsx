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
    InputLabelProps?: any,
    onChange?: Function
}

const MyField:FC<MyFieldProps> = ({fieldProps, ...otherProps}) => {
    const {field, meta} = fieldProps
    return <TextField 
        {...field} 
        {...otherProps}
        {...(meta.error && meta.touched ? {error:true} : {})}
        {...(meta.error && meta.touched ? {helperText: meta.error} : {})}
    />
}

export default MyField