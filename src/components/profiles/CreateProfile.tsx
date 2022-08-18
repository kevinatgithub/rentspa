import { Alert, Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { validationSchema } from '../../formik/examples/shared/models';
import * as Yup from 'yup';
import MyField from '../../formik/examples/shared/MyField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CreateRentModel, numberWithCommas, ProfileModel, RoomModel } from '../models';
import API from '../../api';
import RoomForm from '../rooms/RoomForm';
import SelectField from '../../lib/SelectField';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

let strToday = `${yyyy}-${mm}-${dd}`;

const CreateProfile:FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [rooms, setRooms] = useState<RoomModel[]>([]);
    const [saving, setSaving] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/Rooms").then(result => setRooms([{id:'new',name: 'New Room'},...result.data]))
    },[])

    const ndate = new Date();

    const initialValues = {
        name: "", room: "", gender: "", contactNumber: "", startDate: strToday, remarks: "", monthlyRate: 0, roomName: "", roomRemarks: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        room: Yup.string().required("Room is required"),
        startDate: Yup.date().required("Please enter start date of rent")
    })

    const checkIfNameExists = async (value:any) => {
        let error: string | undefined

        if (value != ''){
            let request = await API.get(`/Profiles/find/${value}`)
            if ( request.data?.length > 0){
                error = 'Possibly already exists, please include full name'
            }
        }

        return error;
    }

    const handleSubmit = async (values:any) => {
        setSaving(true)
        let room = values.room
        if (values.room === 'new' ){
            var roomQuery = await API.post("/Rooms", {
                id: 0, name: values.roomName, pricePerMonth: values.monthlyRate, remarks: values.roomRemarks
            })
            room = roomQuery.data
        }
        API.post("/Profiles",{
            id: 0, name: values.name, gender: values.gender, contactNumber: values.contactNumber
        } as ProfileModel).then(result => {
            const profile = result.data as ProfileModel
            API.post("/Rents",{
                profileId: profile.id,
                remarks: values.remarks,
                roomId: room.id ? room.id : room,
                startDateTime: values.startDate
            } as CreateRentModel).then(result => {
                setOpen(true);
                const timeout = window.setTimeout(() => {
                    navigate(`/profiles/${profile.id}`)
                    window.clearTimeout(timeout)
                },2000)
            })
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => <Form>
            <Card>
                <CardContent>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                        </Alert>
                    </Snackbar>
                    <Grid container p={2} rowSpacing={2} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom component="div" color={"primary"}>
                                New Profile
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Field name="name" validate={checkIfNameExists} >
                                {(fieldProps:any) => <MyField fullWidth label="Profile Name (Required)" fieldProps={fieldProps} />}
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <SelectField
                                fieldName='room'
                                fieldErrors={formik.errors?.room}
                                label='Room # (Required)'
                                options={rooms.map(r => {
                                    return {label: r.name, value: r.id}
                                })}
                                />
                        </Grid>
                        {formik.values.room == 'new' && <>
                                <Grid item xs={12}>
                                    <RoomForm editing={false} nameField="roomName" remarksField='roomRemarks' />
                                </Grid>
                        </>}
                        <Grid item xs={12} md={6} lg={6}>
                            <Field name="startDate">
                                {(fieldProps:any) => <MyField InputLabelProps={{ shrink: true, required: false }} type="date" fullWidth label="Start Date (Required)" fieldProps={fieldProps} />}
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                                <SelectField 
                                    fieldName='gender'
                                    fieldErrors={formik.errors?.gender}
                                    label='Gender'
                                    options={[
                                        {label:'Male', value:'Male'},
                                        {label:'Female', value:'Female'}
                                    ]} 
                                />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Field name="contactNumber" >
                                {(fieldProps:any) => <MyField fullWidth label="Contact Number" fieldProps={fieldProps} />}
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Field name="remarks" >
                                {(fieldProps:any) => <MyField multiline rows={2} fullWidth label="Profile Remarks" fieldProps={fieldProps} />}
                            </Field>
                        </Grid>
                    </Grid>    
                    <Grid container p={2} rowSpacing={2} spacing={2}>
                        <Grid item xs={6} md={2}>
                            <Button variant='contained' size='large' fullWidth onClick={() => {formik.submitForm()}} disabled={!formik.dirty || !formik.isValid || saving}>Save</Button>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Button onClick={() => {window.history.go(-1)}} variant='contained' color='secondary' size='large' fullWidth>Cancel</Button>
                        </Grid>
                    </Grid>    
                </CardContent>
            </Card>
        </Form>}
    </Formik>
  )
}

export default CreateProfile