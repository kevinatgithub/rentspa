import { TextFormatRounded } from '@mui/icons-material'
import { Alert, Button, Card, CardContent, Grid, Select, Snackbar, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../api'
import SelectField from '../../lib/SelectField'
import { CreateRentModel, ProfileModel } from '../models'
import RoomForm from '../rooms/RoomForm'

function TransferExistingTenant() {
    const [open,setOpen] = useState<boolean>(false)
    const [profile, setProfile] = useState<ProfileModel>()
    const [rooms, setRooms] = useState<any[]>([])
    const [saving, setSaving] = useState<boolean>(false)
    const {id,oldRoomId} = useParams()
    const nav = useNavigate()

    useEffect(() => {
        if (!id){
            nav("/notfound")
            return;
        }

        API.get(`/Profiles/${id}`).then(r => setProfile(r.data))
        API.get(`/Rooms`).then(r => setRooms([{name: 'New Room', id: 'new'}, ...r.data]))
    }, [id])
    
    const initialValues = {
        personId: '', roomId: '', name: '', pricePerMonth: '', remarks: '', startDate: '', capacity: 1
    }

    const handleSubmit = async (values:any) => {
        if (!profile) return;
        setSaving(true)
        let roomId = values.roomId
        if (values.roomId === 'new' ){
            var roomQuery = await API.post("/Rooms", {
                id: 0, name: values.name, pricePerMonth: values.monthlyRate, remarks: values.remarks, capacity: values.capacity
            })
            roomId = roomQuery.data.id
        }
        API.put("/Rents/terminate",{
            roomId: oldRoomId, profileId: profile?.id 
        }).then(r => {
            API.post("/Rents",{
                profileId: profile.id,
                remarks: '',
                roomId: roomId,
                startDate: values.startDate
            } as CreateRentModel).then(result => {
                setOpen(true);
                const timeout = window.setTimeout(() => {
                    window.history.go(-1)
                    window.clearTimeout(timeout)
                },2000)
            })
        })
    }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formik => <Form>
            {profile &&
                <Card>
                    <CardContent>
                        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                            <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                                Tenant succefully transfered!
                            </Alert>
                        </Snackbar>
                        <Grid container p={2} spacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Transfer Tenant to new Room</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label="Tenant to Transfer" fullWidth value={profile.name} disabled />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectField
                                    fieldErrors={formik.errors?.roomId}
                                    fieldName="roomId"
                                    label='Transfer to Room'
                                    options={rooms.map(r => { return {label: r.name, value: r.id}})}
                                />
                            </Grid>
                            {formik.values?.roomId === 'new' && 
                                <Grid item xs={12}>
                                    <RoomForm editing={false} />
                                </Grid>
                            }
                            <Grid item xs={12} md={6}>
                                <Field name="startDate">
                                    {(fieldProps:any) => <TextField type="date" InputLabelProps={{shrink:true, required:false }} value={formik.values?.startDate != '' ? formik.values.startDate : ''} fullWidth label='Start Date' {...fieldProps.field} defaultValue='' />}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button fullWidth variant='contained' color='primary' disabled={!formik.dirty || !formik.isValid || saving} onClick={() => formik.submitForm()}>Confirm</Button>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button fullWidth variant='contained' color='secondary' onClick={() => window.history.go(-1)}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }
        </Form>}
    </Formik>
  )
}

export default TransferExistingTenant