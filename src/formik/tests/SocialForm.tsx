import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import TestError from "./TestError";

const SocialForm:FC = (props) => {
    return <>
        <label>Facebook</label>
        <Field name="social.fb" />
        <ErrorMessage name="social.fb" component={TestError} /><br/>

        <label>Twitter</label>
        <Field name="social.twitter" />
        <ErrorMessage name="social.twitter" component={TestError} /><br/>
    </>
}

export default SocialForm