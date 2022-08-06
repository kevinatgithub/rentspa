import { Grid, TextField } from '@mui/material'
import { Field, Form, Formik, useField, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'

function AsyncSearchExample() {
    const initialValues = {
        search: '', todo : ''
    }
    return (
        <Formik initialValues={initialValues} onSubmit={values => alert(JSON.stringify(values))}>
            <Form>
                <Field name="search" />
                <Todo name="todo" />
            </Form>
        </Formik>
    )
}

export default AsyncSearchExample

const Todo = (props: any) => {
    const [email, setEmail] = useState()
    const formik = useFormikContext<{ search: string, todo : string}>()
    const { values, setFieldValue } = formik
    const [ field ] = useField(props.name)

    useEffect(() => {
        if (values.search) {
            fetch(`https://reqres.in/api/users/${values.search}`).then((result:any) => {
                return result.json()
            }).then(data => {
                setEmail(data?.data?.email)
            })
        }
    }, [values.search])

    return <TextField {...field} value={email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
}