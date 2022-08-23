import { Alert, Button, Card, CardContent, Divider, Grid, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from '../../api'
import { formatDateStr, PaymentModel, ProfileModel, RentModel, RoomModel } from '../models'

function PreviewPayment() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [payment, setPayment] = useState<PaymentModel|null>(null)
    const [rent, setRent] = useState<RentModel|null>(null)
    const [room, setRoom] = useState<RoomModel|null>(null)
    const [profile, setProfile] = useState<ProfileModel|null>(null)
    useEffect(() => {
        async function getProfile(id:string){
            return (await API.get(`/Profiles/${id}`)).data
        }
        async function getRent(id:string){
            return (await API.get(`/Rents/${id}`)).data
        }
        async function getRoom(id:string){
            return (await API.get(`/Rooms/${id}`)).data
        }
        async function getPayment(id:string){
            return (await API.get(`/Payments/${id}`)).data
        }
        async function loadData(id:string){
            const payment = await getPayment(id)
            const rent = await getRent(payment.rentId)
            const room = await getRoom(rent.roomId)
            const profile = await getProfile(rent.profileId)
            setPayment(payment)
            setRent(rent)
            setRoom(room)
            setProfile(profile)
        }
        if (id){
            loadData(id)
        }
    },[])
    const [open, setOpen] = useState<boolean>(false)
    const handleClose = () => {
        setOpen(prevOpen => !prevOpen)
    }
  return (
    <>
        { payment && profile && rent && room && <>
            <Card>
                <CardContent>
                    <Grid container p={2} spacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={'h4'} gutterBottom component="div">
                                Payment Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Payment Received From
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                {payment.paidBy}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Amount Paid
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                P {payment.paidAmount}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Particulars
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                {payment.particulars}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Room #
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                <Link to={`/rooms/${room.id}`}>{room.name}</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Period Covered
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                {formatDateStr(payment.periodCoveredStartDate,'l')} - {formatDateStr(payment.periodCoveredEndDate,'l')}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Monthly Rate
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                P {room.pricePerMonth}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Balance
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                P {payment.balance}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Date Received
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div" noWrap>
                                {formatDateStr(payment.paidDateTime)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Received By
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} xl={10}>
                            <Typography variant={'subtitle1'} gutterBottom component="div">
                                Wevina Cainday
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={2} xl={2}>
                            <Button variant='contained' color='primary' size='medium' fullWidth>Print</Button>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Button variant='contained' color='warning' size='medium' fullWidth onClick={e => setOpen(true)}>Revoke</Button>
                        </Grid>
                        <Grid item xs={6} md={3} xl={2}>
                            <Button variant='contained' color='secondary' size='medium' fullWidth onClick={() => window.history.go(-1)}>Back</Button>
                        </Grid>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                This is a success message!
                            </Alert>
                        </Snackbar>
                    </Grid>
                </CardContent>
            </Card>
        </>}
    </>
  )
}

export default PreviewPayment