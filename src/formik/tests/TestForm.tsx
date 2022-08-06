import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import { FC, useState } from "react";
import * as Yup from 'yup';
import EmailsForm from "./EmailsForm";
import PhoneForm from "./PhoneForm";
import SocialForm from "./SocialForm";
import TestError from "./TestError";

interface MyForm {
    firstName: string,
    middleName: string,
    lastName: string,
    age: number,
    gender: 'male'|'female',
    addressType: 'new'|'existing',
    address: '',
    social: {
        fb: string,
        twitter: string
    },
    phone:  string[],
    emails: string[]
}

const TestForm:FC = () => {

    const [result,setResult] = useState<MyForm>({} as MyForm)

    const initialValues: MyForm = {
        firstName:'', middleName: '', lastName: '', age:0, gender:'male', addressType: 'new', address: '',
        social: {
            fb: '', twitter: ''
        },
        phone: ['',''],
        emails: ['']
    }

    const onSubmit = (values:any) => {
        setResult(values)
    }
    
    const validationSchema = Yup.object({
        // firstName: Yup.string().required("first is required"),
        // middleName: Yup.string().required("middle is required"),
        // lastName: Yup.string().required("last is required"),
        // age: Yup.number().required("age is required").min(0,"age is too low").max(60, "age is too high"),
        // gender: Yup.string().required("gender is required"),
        // addressType: Yup.string().required("address type is required")
    })

    const validate = (values:any) => {
        const errors: any = {}

        // if ( values.addressType === 'new'){
        //     if (!values.address)
        //         errors.address = 'address is required'
        // }

        return errors
    }

    // const f = useFormik({
    //     initialValues,
    //     onSubmit,
    //     validate,
    //     validationSchema
    // })

    return <>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} validationSchema={validationSchema}>
            <Form>
                <Grid container spacing={2} margin={4}>
                    <Grid item xs={12}>
                        {JSON.stringify(result)}
                    </Grid>
                    <Grid item xs={6}>
                        <label>First Name</label> <Field name="firstName" /><br/>
                        <ErrorMessage name="firstName" component={TestError} /><br/>

                        <label>Middle Name</label> <Field name="middleName" /><br/>
                        <ErrorMessage name="middleName">
                            {(error) => <div style={{color:'red'}}>{error}</div>}
                        </ErrorMessage>

                        <label>Last Name</label><br/>
                        <Field name="lastName" /><br/>
                        <ErrorMessage name="lastName" component={TestError} /><br/>
                    
                        <label>Age</label><br/>
                        <Field name="age" /><br/>
                        <ErrorMessage name="age" component={TestError} /><br/>

                        <label>Gender</label><br/>
                        <Field type="radio" name="gender" value="male" /> Male 
                        <Field type="radio" name="gender" value="female" /> Female <br/>
                        <ErrorMessage name="gender" component={TestError} /><br/>
                        
                        <label>Address Type</label><br/>
                        <Field as="select" name="addressType">
                            <option value="new">New</option>
                            <option value="existing">Existing</option>
                        </Field> <br/>

                        <label>Address</label><br/>
                        <FastField name="address">
                            {(props:any) => {
                                const {field,form} = props
                                return form.values.addressType === 'new' && <input type="text" {...field} />
                            }}
                        </FastField>
                        <ErrorMessage name="address" component={TestError} /><br/>
                    </Grid>
                    <Grid item xs={6}>
                        <SocialForm />
                        <PhoneForm />
                        <EmailsForm />
                    </Grid>
                </Grid>

                <input type="submit" />

            </Form>
        </Formik>
    </>
}

export default TestForm;