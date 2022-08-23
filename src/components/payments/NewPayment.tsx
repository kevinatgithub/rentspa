import { Alert, Autocomplete, Button, Card, CardContent, CircularProgress, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api'
import { dateToApi, getStrDateToday, ProfileModel, RentDetailModel, RentModel, RoomModel } from '../models'
import SelectField from '../../lib/SelectField'
import MyField from '../../formik/examples/shared/MyField'

interface ProfileOption extends ProfileModel {
    label: string,
}

function NewPayment() {
    // const [profile, setProfile] = useState<ProfileModel|null>(null)
    const [profiles, setProfiles] = useState<ProfileOption[]>([])
    const [rentDetails, setRentDetails] = useState<RentDetailModel[]>([])
    const [rentsLoading, setRentsLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const navigate = useNavigate()

    const [initialValues] = useState({
        profile: null, rentId: null, paidAmount: "", particulars: '',
        periodCovered: {
            startDate: "", endDate: ""
        },
        paidDateTime: getStrDateToday(), paidBy: "", paymentType: "room"
    })

    useEffect(() => {
        API.get("/profiles").then(result => {

            setProfiles(result.data.map((p: ProfileModel) => {
                return { ...p, label: p.name }
            }))
        })
    }, [])

    const onChangeProfile = async (profile: any) => {
        if (!profile) return;

        async function getRoom(id: number) {
            return await API.get(`/Rooms/${id}`).then(result => result.data)
        }
        async function mapRents(rents: RentModel[]) {
            let rentDetails: RentDetailModel[] = []
            for (const rent of rents) {
                var room = await getRoom(rent.roomId)
                rentDetails.push({
                    rent, room, profile
                } as RentDetailModel)
            }
            setRentDetails(rentDetails)
        }
        if (profile) {
            API.get(`/Rents/findByProfileId/${profile.id}`).then(async result => {
                const rents = result.data
                if (rents.length) {
                    await mapRents(rents)
                    setRentsLoading(false)
                }
            })
        }
    }

    const validationSchema = Yup.object({
        profile: Yup.object().required(),
        rentId: Yup.string().nullable().required("Please select room details"),
        paidAmount: Yup.string().required("Please enter amount paid"),
        paidBy: Yup.string().required("Please enter name of payer")
    })

    const handleSubmit = (values: any) => {
        const paidDate: Date = new Date(values.paidDateTime)
        const startDate: Date | null = values.periodCovered.startDate ? new Date(values.periodCovered.startDate) : null
        const endDate: Date | null = values.periodCovered.endDate ? new Date(values.periodCovered.endDate) : null
        setSaving(true)
        API.post("/Payments", {
            rentId: values.rentId,
            paidAmount: values.paidAmount * 1,
            particulars: values.particulars,
            periodStartDate: startDate,
            periodEndDate: endDate,
            paidDateTime: paidDate,
            paidBy: values.paidBy
        }).then(result => {
            setSaving(false)
            navigate(`/payments/${result.data.id}`)
        })
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {formik => <Form>
                <Card>
                    <CardContent>
                        <Grid container p={2} pt={1} spacing={2} rowSpacing={2}>
                            <Grid item xs={12} alignItems={'center'}>
                                <Typography variant='overline' gutterBottom component="div">
                                    Receive Payment
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {profiles.length > 0 && <>
                                    <Field name="profile">
                                        {(fieldProps: any) => {
                                            const { form: { setFieldValue }, field } = fieldProps
                                            return <Autocomplete
                                                onChange={(event: any, newValue: any | null) => {
                                                    if (newValue != null) {
                                                        setFieldValue(field.name, newValue)
                                                        onChangeProfile(newValue)
                                                        formik.setFieldValue("paidBy", newValue.name)
                                                    }
                                                    else
                                                        setFieldValue(field.name, null)
                                                }}
                                                disablePortal
                                                options={profiles}
                                                renderInput={params => <MyField fieldProps={fieldProps} {...params} label="Payment For" />} />
                                        }}
                                    </Field>
                                </>}

                                {profiles.length === 0 && <>
                                    <Alert variant='standard' color='info'>There are no profile records yet!</Alert>
                                    <Button onClick={() => navigate("/profiles/create")}>
                                        Create New Profile
                                    </Button>
                                </>}

                            </Grid>
                            {formik.values?.profile && <>
                                <Grid item xs={12} alignItems={'center'}>
                                    <Typography variant='overline' gutterBottom component="div">
                                        Rent Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
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
                                {formik?.values?.rentId && <>
                                    <Grid item xs={12} alignItems={'center'}>
                                        <Typography variant='overline' gutterBottom component="div">
                                            Payment Details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="overline">Payment For</Typography>
                                        <Field name="paymentType">
                                            {(fieldProps: any) => <ToggleButtonGroup
                                                color="primary"
                                                value={formik.values?.paymentType}
                                                exclusive
                                                onChange={(e:any) => formik.setFieldValue('paymentType', e.target.value)}
                                                aria-label="Platform"
                                                style={{marginLeft:15}}
                                            >
                                                <ToggleButton value="room">Rent</ToggleButton>
                                                <ToggleButton value="others">Others</ToggleButton>
                                            </ToggleButtonGroup>}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Field name="paidAmount" >
                                            {(fieldProps: any) =>
                                                <MyField fullWidth fieldProps={fieldProps} label="Amount Paid (Required)" />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Field name="balance">
                                            {(fieldProps: any) => <MyField fullWidth fieldProps={fieldProps} label="Balance" />}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Field name="particulars" >
                                            {(fieldProps: any) =>
                                                <MyField fieldProps={fieldProps} fullWidth {...fieldProps.field} label="Particulars" rows={4} multiline />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field name="paidBy">
                                            {(fieldProps: any) => <MyField fieldProps={fieldProps} type="text" fullWidth label="Payment Received From" />}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field name="paidDateTime" >
                                            {(fieldProps: any) => <MyField InputLabelProps={{ shrink: true, required: false }} type="date" fullWidth label="Date of Payment" fieldProps={fieldProps} />}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} alignItems={'center'}>
                                        <Typography variant='overline' gutterBottom component="div">
                                            Period Covered
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field name="periodCovered.startDate">
                                            {(fieldProps: any) => <MyField InputLabelProps={{ shrink: true, required: false }} type="date" fullWidth label="From" fieldProps={fieldProps} />}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field name="periodCovered.endDate">
                                            {(fieldProps: any) => <MyField InputLabelProps={{ shrink: true, required: false }} type="date" fullWidth label="To" fieldProps={fieldProps} />}
                                        </Field>
                                    </Grid>
                                    {/* <Grid item xs={12} md={6}>
                                    <Field name="totalAmount" >
                                        {(fieldProps:any) => 
                                            <TextField fullWidth {...fieldProps.field} label="Room Rate" value={formik.values?.totalAmount ?? ''} disabled />
                                        }
                                    </Field>
                                </Grid> */}
                                </>}
                                <Grid item xs={12} md={4} lg={2} xl={2}>
                                    <Button onClick={() => {
                                        if (window.confirm(`Receive Payment?`)) {
                                            formik.submitForm()
                                        }
                                    }} variant='contained' color='primary' size='large' fullWidth disabled={!formik.dirty || !formik.isValid || saving}>Receive Payment</Button>
                                </Grid>
                                <Grid item xs={12} md={4} lg={2} xl={2}>
                                    <Link to="/payments"><Button variant='contained' color='secondary' size='large' fullWidth>Cancel</Button></Link>
                                </Grid>
                            </>}

                            {!formik.values?.profile && <>
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

function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}