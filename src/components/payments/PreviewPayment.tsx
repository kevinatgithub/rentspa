import { Alert, Button, Card, CardContent, Divider, Grid, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import API from '../../api'
import { formatDateStr, PaymentModel, ProfileModel, RentModel, RoomModel } from '../models'

function PreviewPayment() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [payment, setPayment] = useState<PaymentModel|null>(null)
    const [rent, setRent] = useState<RentModel|null>(null)
    const [room, setRoom] = useState<RoomModel|null>(null)
    const [profile, setProfile] = useState<ProfileModel|null>(null)
    const receiptRef = useRef<any>()
    const printReceipt = useReactToPrint({
        content: () => receiptRef.current
    })
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
    const handlePrint = () => {
        API.post(`/payments/${id}/print`).then(result => {
            printReceipt()
        })
    }
  return (
    <>
        { payment && profile && rent && room && <>
            <Grid container p={2} spacing={2} rowSpacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Grid container p={2} pl={4} pr={4} spacing={2} rowSpacing={2} ref={receiptRef}>
                                <Grid item xs={12}>
                                    <Typography variant={'h4'} gutterBottom component="div">
                                        Payment Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Payment Received From
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8} textAlign='right'>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        {payment.paidBy}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Amount Paid
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        P {payment.paidAmount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Particulars
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        {payment.particulars}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Room #
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        <Link to={`/rooms/${room.id}`}>{room.name}</Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Period Covered
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        {formatDateStr(payment.periodCoveredStartDate,'l')} - {formatDateStr(payment.periodCoveredEndDate,'l')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Monthly Rate
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        P {room.pricePerMonth}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Balance
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        P {payment.balance}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Date Received
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" noWrap textAlign='right'>
                                        {formatDateStr(payment.paidDateTime)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div">
                                        Received By
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography variant={'subtitle1'} gutterBottom component="div" textAlign='right'>
                                        Wevina Cainday
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container p={2} spacing={2} rowSpacing={2}>
                                <Grid item xs={12} md={4} lg={2} xl={2}>
                                    <Button variant='contained' color='primary' size='medium' fullWidth onClick={e => handlePrint()}>Print</Button>
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
                </Grid>
            </Grid>
        </>}
    </>
  )
}

export default PreviewPayment