import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Room from './Room'

function Rooms() {
  return (
    <>
        <Grid container p={2} rowSpacing={2} spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                <TextField size='small' fullWidth id="searchRoom" name="searchRoom" placeholder='Search Room' />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <Link to={"/rooms/create"}><Button variant='contained' size='medium' fullWidth>Add New Room Details</Button></Link>
            </Grid>
            <Grid item xs={12} >
                <Grid container spacing={2} pt={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Room />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Room />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Room />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Room />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Room />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Room />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
  )
}

export default Rooms