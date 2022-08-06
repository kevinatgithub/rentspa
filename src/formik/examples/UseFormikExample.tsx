import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import GridTextField from "./shared/GridTextField";
import { BasicInfo, initialValues } from "./shared/models";
import Output from "./shared/Output";
import SubmitButton from "./shared/SubmitButton";

const UseFormikExample:FC = () => {
    const [formValues, setFormValues] = useState<any>()

    const onSubmit = (values:any) => setFormValues(values)

    const f = useFormik<BasicInfo>({
        initialValues, onSubmit
    })

    return <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <form onSubmit={f.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="First Name"
                                {...(f.errors.firstName ? {error:true} : {})}
                                name="firstName"
                                value={f.values.firstName}
                                onChange={f.handleChange}
                            />
                        </Grid>

                        <GridTextField label="Middle Name" name="middleName" f={f} />

                        <GridTextField label="Last Name" name="lastName" f={f} />

                        <GridTextField label="Email" name="email" f={f} pt={2} />

                    </Grid>
                    <SubmitButton handleSubmit={() => f.submitForm()} />
                </form>
            </Grid>
            <Grid item xs={6}>
                <Output f={f} formValues={formValues} />
            </Grid>
        </Grid>
    </>
}

export default UseFormikExample