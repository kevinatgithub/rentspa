import * as Yup from "yup";

export interface BasicInfo{
    firstName: string,
    middleName: string,
    lastName: string,
    email: string
}

export const initialValues: BasicInfo = {
    firstName: '', middleName: '', lastName: '', email: ''
}

export const validate = (values:any) => {
    const errors: any = {}

    if (!values.email.endsWith("@ey.com"))
        errors.email = "Email is not valid"

    return errors;
}

export const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid format"),
})