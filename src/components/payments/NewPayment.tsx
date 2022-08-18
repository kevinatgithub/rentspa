import { Alert, Autocomplete, Button, Card, CardContent, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api'
import { formatMMDDYYYY, ProfileModel, RentDetailModel, RentModel } from '../models'
import SelectField from '../../lib/SelectField'

interface ProfileOption extends ProfileModel {
    label: string,
}

function NewPayment() {
    const [profile, setProfile] = useState<ProfileModel|null>(null)
    const [profiles, setProfiles] = useState<ProfileOption[]>([])
    const [rents, setRents] = useState<RentModel[]>([])
    const [rentDetails, setRentDetails] = useState<RentDetailModel[]>([])
    const [rentsLoading, setRentsLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        API.get("/profiles").then(result => {
            
            setProfiles(result.data.map((p:ProfileModel) => {
                return {...p, label: p.name}
            }))
        })
    }, [])

    const onChangeProfile = async (profile:any) => {
        if (!profile) return;

        async function getRoom(id:number){
            return await API.get(`/Rooms/${id}`).then(result => result.data)
        }
        async function mapRents(rents: RentModel[]){
            let rentDetails: RentDetailModel[] = []
            rents.forEach( async rent => {
                var room = await getRoom(rent.roomId)
                rentDetails.push({
                    rent, room, profile
                } as RentDetailModel)
            })
            setRentDetails(rentDetails)
        }
        if (profile){
            API.get(`/Rents/findByProfileId/${profile.id}`).then(async result => {
                const rents = result.data
                setRents(rents)
                if (rents.length){
                    await mapRents(rents)
                    setRentsLoading(false)
                }
            })
        }
    }

    const initialValues = {
        profile: null, rentId: null, totalAmount: 1000, amountReceived: 0, particulars: ''
    }

    const validationSchema = Yup.object({
        month: Yup.string().required("Please select month")
    })

    const handleSubmit = (values:any) => {

    }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {formik => <Form>
            <Card>
                <CardContent>
                    <Grid container p={2} spacing={2} rowSpacing={2}>
                        <Grid item xs={12} alignItems={'center'}>
                            <Box>
                                <Typography variant='overline' gutterBottom component="div">
                                    Receive Payment
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {profiles.length > 0 && <Autocomplete 
                                onChange={(event: any, newValue: any | null) => {
                                    if (newValue != null){
                                        setProfile(newValue)
                                        onChangeProfile(newValue)
                                    }
                                    else
                                        setProfile(null)
                                }}
                            disablePortal
                            options={profiles} 
                            renderInput={params => <TextField {...params} label="Payment From" />} />}

                            {profiles.length === 0 && <>
                                <Alert variant='standard' color='info'>There are no profile records yet!</Alert>
                                <Button onClick={() => navigate("/profiles/create")}>
                                    Create New Profile    
                                </Button>
                            </>}
                            
                        </Grid>
                        {profile && <>
                            <Grid item xs={12} alignItems={'center'}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} alignItems={'center'}>
                                <Box pt={2}>
                                    <Typography variant='overline' gutterBottom component="div">
                                        Payment Details
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {rentsLoading && <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>}
                                {!rentsLoading && <SelectField 
                                    fieldName='rentId'
                                    fieldErrors={formik.errors?.rentId}
                                    label='Room' 
                                    options={rentDetails.map(r => {
                                        return {
                                            //label: `${r.room.name} - ${formatMMDDYYYY(new Date(r.rent.startDateTime))}`, value: r.rent.id
                                            label: `${r.room.name}`, value: r.rent.id
                                        }
                                    })}
                                    fullWidth
                                    value={formik.values?.rentId}
                                />}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field name="totalAmount" >
                                    {(fieldProps:any) => 
                                        <TextField fullWidth {...fieldProps.field} label="Room Rate" value={formik.values?.totalAmount ?? ''} disabled />
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field name="receivedAmount" >
                                    {(fieldProps:any) => 
                                        <TextField fullWidth {...fieldProps.field} label="Amount Paid (Required)" value={formik.values?.amountReceived ?? ''} />
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={4} lg={2} xl={2}>
                                <Link to="/payments/preview"><Button variant='contained' color='primary' size='large' fullWidth>Review Details</Button></Link>
                            </Grid>
                            <Grid item xs={12} md={4} lg={2} xl={2}>
                                <Link to="/payments"><Button variant='contained' color='secondary' size='large' fullWidth>Cancel</Button></Link>
                            </Grid>
                        </>}

                        {!profile && <>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} md={4} lg={2} xl={2}>
                                    <Link to="/payments"><Button variant='contained' color='secondary' size='large' fullWidth>Cancel</Button></Link>
                            </Grid>
                        </>}
                    </Grid>
                </CardContent>
            </Card>
        </Form>}
    </Formik>
  )
}

export default NewPayment

function toMonthName(monthNumber:number) {
    const date = new Date();
    date.setMonth(monthNumber);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }