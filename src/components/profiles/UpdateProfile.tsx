import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../api'
import SelectField from '../../lib/SelectField'
import { ProfileModel } from '../models'
import * as Yup from 'yup'
import MyField from '../../formik/examples/shared/MyField'

function UpdateProfile() {
    const {id} = useParams()
    const [profile, setProfile] = useState<ProfileModel| null>({gender: 'Male'} as ProfileModel)
    const navigate = useNavigate()
    useEffect(() => {
        if (id){
            API.get(`/Profiles/${id}`).then(r => setProfile(r.data))
        }
    }, [id])
    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter name")
    })
    const handleSubmit = (values:ProfileModel) => {
        API.put(`/Profiles`, {
            ...values
        }).then(r => {
            navigate(`/Profiles/${id}`)
        })
    }
  return (
    <Formik initialValues={profile ?? {} as ProfileModel} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
        {f => <Form>
            {profile && <Card>
                <CardContent>
                    <Grid container p={2} spacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Update Profile</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field name="name">
                                {(fieldProps:any) => <TextField fullWidth {...fieldProps.field} value={f.values?.name ?? ''} label="Profile Name" />}
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                fieldName='gender'
                                fieldErrors={f.errors?.gender}
                                label='Gender'
                                options={[
                                    {label:' ',value:undefined},
                                    {label:'Male',value:'Male'},
                                    {label:'Female',value:'Female'}
                                ]} 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field name="contactNumber">
                                {(fieldProps:any) => <TextField fullWidth {...fieldProps.field} value={f.values?.contactNumber ?? ''} label="Contact Number" />}
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Field name={"remarks"} >
                                {(fieldProps:any) => <MyField InputLabelProps={{ shrink: true, required: false }} fullWidth label="Profile Remarks" fieldProps={fieldProps} multiline rows={2} />}
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                            <Button fullWidth variant='contained' color='primary' onClick={() => f.submitForm()} disabled={!f.dirty || !f.isValid}>Save Changes</Button>
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                            <Button fullWidth variant='contained' color='secondary' onClick={() => window.history.go(-1)}>Cancel</Button>
                        </Grid>
                    </Grid>                    
                </CardContent>
            </Card>}    
        </Form>}
    </Formik>
  )
}

export default UpdateProfile