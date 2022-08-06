import { Grid } from "@mui/material";
import { Field } from "formik";
import { FC } from "react";
import MyField from "./MyField";

const MyGridField:FC<{label: string, name:string, xs?:number, pt?:number}> = ({label, name,xs,pt}) => {
    return <Grid item xs={xs ? xs : 4} pt={pt ? pt : 0}>
        <Field name={name}>
            {(fieldProps:any) => <MyField label={label} fieldProps={fieldProps} />}
        </Field>
    </Grid>
}

export default MyGridField