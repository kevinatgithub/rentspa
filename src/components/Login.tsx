import { Alert, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import MyField from '../formik/examples/shared/MyField'
import { COOKIE_EXPIRATION, COOKIE_NAME } from './models'

function Login() {
    const [cookies, setCookie] = useCookies([COOKIE_NAME])
    const [initialValues] = useState<any>({
        username: '', password: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.appuser){
            navigate('/')
        }
    }, [cookies])

    const [error, setError] = useState<string|null>(null)

    const validationSchema = Yup.object({
        username: Yup.string().required('Please enter username'),
        password: Yup.string().required('Please enter password')
    })

    const handleSubmit = (values:any) => {
        const {username, password} = values
        if (username !== 'wena' || password !== 'wena'){
            setError('Login failed, please check username/password')
            return;
        }
        setCookie(COOKIE_NAME, true, {expires: moment().add(COOKIE_EXPIRATION,'minutes').toDate()})
        navigate('/')
    }
  return (
    <Card>
        <CardContent>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {formik => <Form>
                    <Grid container spacing={2} rowSpacing={2} minHeight={600}>
                        {error && <Grid item xs={12}>
                            <Alert variant='outlined' color='error'>{error}</Alert>
                        </Grid>}

                        <Grid item xs={12} md={3} lg={4}>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12} style={{textAlign:'center'}}>
                                    <img src="http://wenaboarding.somee.com/wenaboarding.png" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='overline'>User Login</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="username">
                                        {(fieldProps:any) => <MyField fullWidth fieldProps={fieldProps} label='Username' />}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="password">
                                        {(fieldProps:any) => <MyField fullWidth fieldProps={fieldProps} label='Password' type={'password'} />}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' onClick={() => formik.submitForm()}>Login</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} lg={4}>
                        </Grid>
                    </Grid>
                </Form>}
            </Formik>
        </CardContent>
    </Card>
  )
}

export default Login