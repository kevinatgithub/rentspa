import { Button, Grid } from "@mui/material"
import { Field, FieldArray, Form, Formik } from "formik"
import { FC, useState } from "react"
import MyGridField from "./shared/MyGridField"
import Output from "./shared/Output"
import SubmitButton from "./shared/SubmitButton"

const FieldArrayExample:FC = () => {
    const [formValues, setFormValues] = useState()
    const initialValues = {
        fullName: '',
        friends: ['']
    }
    const onSubmit = (values:any) => setFormValues(values)
    return <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {formik => {
                return <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <MyGridField label="Full Name" name="fullName" xs={12} />

                                <Grid item xs={12} pt={2}>
                                    <FieldArray name="friends">
                                        {(fieldArrayProps:any) => {
                                            const {push,remove,form:{values:{friends}}} = fieldArrayProps
                                            return friends.map((friend : any,i : number) => {
                                                return <div key={i}>
                                                    <Field name={`friends[${i}]`} autoFocus={true} /> 
                                                    {i > 0 && <Button onClick={() => remove(i)}>-</Button>}
                                                    <Button onClick={() => push('')}>+</Button>
                                                </div>
                                            })
                                        }}
                                    </FieldArray>
                                </Grid>

                                <SubmitButton handleSubmit={() => formik.submitForm()} />
                            </Grid>

                            

                        </Grid>
                        <Grid item xs={6}>
                            <Output f={formik} formValues={formValues} />
                        </Grid>
                    </Grid>
                </Form>
            }}
        </Formik>
    </>
}

export default FieldArrayExample