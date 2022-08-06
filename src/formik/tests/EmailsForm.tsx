import { Button } from "@mui/material"
import { ErrorMessage, Field, FieldArray } from "formik"
import { FC } from "react"
import TestError from "./TestError"

const EmailsForm:FC = () => {
    return <>
        <label>Email Addresses</label>
        <FieldArray name="emails">
            {(fieldArrayProps) => {
                const {push, remove, form: {values: {emails}}} = fieldArrayProps
                return <>
                    {emails.map((email: any, index: any) => {
                        return <div key={index}>
                            <Field name={`emails[${index}]`} />
                            {index > 0 && <Button onClick={() => remove(index)}>-</Button>}
                            <Button onClick={() => push('')}>+</Button>
                        </div>
                    })}
                </>
            }}
        </FieldArray>
        <ErrorMessage name="emails" component={TestError} />
    </>
}

export default EmailsForm