import { ErrorMessage, Field } from "formik"
import TestError from "./TestError"

const PhoneForm = () => {
    return <>
        <label>Home Number</label>
        <Field name="phone[0]" />
        <ErrorMessage name="phone[0]" component={TestError} /><br/>

        <label>Mobile</label>
        <Field name="phone[1]" />
        <ErrorMessage name="phone[1]" component={TestError} /><br/>
    </>
}

export default PhoneForm