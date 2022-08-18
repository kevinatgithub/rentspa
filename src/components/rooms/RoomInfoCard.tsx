import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas, RentStatus, RoomModel } from '../models'

const RoomInfoCard:FC<{room:any}> = ({room}) => {
  return (
    <>
        <Grid item xs={6} md={4} xl={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Status
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={10}>
            <Typography variant="body2" gutterBottom component="div">
                {RentStatus[room.status]}
            </Typography>
        </Grid>
        <Grid item xs={6} md={4} xl={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Room Name
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={10}>
            <Typography variant="body2" gutterBottom component="div">
                {room.name}
            </Typography>
        </Grid>
        <Grid item xs={6} md={4} xl={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Monthly Rate
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={10}>
            <Typography variant="body2" gutterBottom component="div">
                P {room.pricePerMonth ? numberWithCommas(room.pricePerMonth) : 0}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Remarks
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body2" gutterBottom component="div">
                {room.remarks ? room.remarks :'-'}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Link to={`/rooms/${room.id}`} style={{float:'right',textDecoration:'none'}}><Button variant='text'>View Room Details</Button></Link>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
    </>
  )
}

export default RoomInfoCard