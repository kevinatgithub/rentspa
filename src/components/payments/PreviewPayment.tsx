import { Alert, Button, Divider, Grid, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function PreviewPayment() {
    const [open, setOpen] = useState<boolean>(false)
    const handleClose = () => {
        setOpen(prevOpen => !prevOpen)
    }
  return (
    <Grid container p={2} spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
            <Typography variant={'h4'} gutterBottom component="div">
                Payment Details (Unconfirmed)
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Payment Received From
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Juan Dela Cruz
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Room #
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Room 201
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                For the Month of
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                March, 2022
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Monthly Rate
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                P 1,000.00
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Amount Paid
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                P 1,000.00
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Remaining
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                P 0.00
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Date Received
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                August 6, 2022 3:02 PM
            </Typography>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Received By
            </Typography>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
            <Typography variant={'subtitle1'} gutterBottom component="div">
                Wevina Cainday
            </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={2} xl={2}>
            <Button variant='contained' color='primary' size='large' fullWidth>Confirm and Print</Button>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Button variant='contained' color='info' size='large' fullWidth onClick={e => setOpen(true)}>Confirm</Button>
        </Grid>
        <Grid item xs={6} md={2} xl={2}>
            <Link to="/payments"><Button variant='contained' color='secondary' size='large' fullWidth>Cancel</Button></Link>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>
    </Grid>
  )
}

export default PreviewPayment