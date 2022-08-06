import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { BasicInfo, initialValues } from "./shared/models";
import Output from "./shared/Output";
import SubmitButton from "./shared/SubmitButton";

const ValidateExample:FC = () => {
    const [formValues, setFormValues] = useState<any>()

    const validate = (values:any) => {
        const errors: any = {}

        if (!values.firstName)
            errors.firstName = "First name is required"

        if (!values.lastName)
            errors.lastName = "Last name is required"

        if (!values.email.endsWith("@ey.com"))
            errors.email = "Email is not valid"

        return errors;
    }

    const onSubmit = (values:any) => setFormValues(values)

    const f = useFormik<BasicInfo>({
        initialValues, onSubmit, validate
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
                                {...(f.errors.firstName ? {helperText: f.errors.firstName} : {})}
                                onBlur={f.handleBlur}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="Middle Name"
                                {...(f.errors.middleName ? {error:true} : {})}
                                name="middleName"
                                value={f.values.middleName}
                                onChange={f.handleChange}
                                {...(f.errors.middleName ? {helperText: f.errors.middleName} : {})}
                                onBlur={f.handleBlur}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                label="Last Name"
                                {...(f.errors.lastName ? {error:true} : {})}
                                name="lastName"
                                value={f.values.lastName}
                                onChange={f.handleChange}
                                {...(f.errors.lastName ? {helperText: f.errors.lastName} : {})}
                                onBlur={f.handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container pt={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="Email"
                                {...(f.errors.email ? {error:true} : {})}
                                name="email"
                                value={f.values.email}
                                onChange={f.handleChange}
                                {...(f.errors.email ? {helperText: f.errors.email} : {})}
                                onBlur={f.handleBlur}
                            />
                        </Grid>
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

export default ValidateExample