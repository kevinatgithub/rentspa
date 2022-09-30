import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api'
import { formatDateStr, numberWithCommas, RentStatus, RoomModel } from '../models'

const RoomInfoCard:FC<{room:any, profileId?: any}> = ({room, profileId}) => {
    const navigate = useNavigate()
    const handleTerminate = () => {
        if (!window.confirm("Terminate tenancy?"))
            return;
        API.put("/Rents/terminate",{
            roomId: room.id, profileId
        }).then(r => {
            navigate(`/profiles/${profileId}`)
        })
    }
  return (
    <>
        <Grid item xs={6} md={4} xl={4}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Status
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={8}>
            <Typography variant="body2" gutterBottom component="div" color={room.status === 0 ? 'green': 'error'}>
                <b>{RentStatus[room.status]}</b>
            </Typography>
        </Grid>
        <Grid item xs={6} md={4} xl={4}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Room Name
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={8}>
            <Typography variant="body2" gutterBottom component="div">
                {room.name}
            </Typography>
        </Grid>
        <Grid item xs={6} md={4} xl={4}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Monthly Rate
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={8}>
            <Typography variant="body2" gutterBottom component="div">
                P {room.pricePerMonth ? numberWithCommas(room.pricePerMonth) : 0}
            </Typography>
        </Grid>
        <Grid item xs={6} md={4} xl={4}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Rented Date
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={8}>
            <Typography variant="body2" gutterBottom component="div">
                {formatDateStr(room.rent.startDateTime)} - {formatDateStr(room.rent.endDateTime)}
            </Typography>
        </Grid>
        <Grid item xs={6} md={4} xl={4}>
            <Typography variant="subtitle2" gutterBottom component="div">
                Remarks
            </Typography>
        </Grid>
        <Grid item xs={6} md={8} xl={8}>
            <Typography variant="body2" gutterBottom component="div">
                {room.remarks ? room.remarks :'-'}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Link to={`/rooms/${room.id}`} style={{textDecoration:'none'}}><Button variant='text'>View Room</Button></Link>
            {room.rent.status === 0 && profileId && <Link to={`/profiles/transfer/${profileId}/${room.id}`} style={{float:'right',textDecoration:'none'}}><Button variant='text'>Transfer</Button></Link>}
            {room.rent.status === 0 && profileId && <Button variant='text' onClick={handleTerminate} style={{float:'right'}}>Terminate</Button>}
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
    </>
  )
}

export default RoomInfoCard