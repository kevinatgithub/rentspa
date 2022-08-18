import { Alert, Button, Card, CardContent, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api'
import { RoomModel } from '../models'
import Room from './Room'

function Rooms() {
    const [search, setSearch] = useState<string| null>(null)
    const [rooms,setRooms] = useState<RoomModel[]>([])
    async function loadRooms(){
        API.get("/rooms").then(result => {
            setRooms(result.data as RoomModel[])
        })
    }
    useEffect(() => {

        loadRooms()
    }, [])

    const handleSearch = () => {
        if (!search) {
            loadRooms()
            return;
        }

        API.get(`/rooms/filterByName/${search}`).then(result => {
            setRooms(result.data as RoomModel[])
        })
    }
  return (
    <>
        <Card>
            <CardContent>
                <Grid container p={2} rowSpacing={2} spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField size='small' fullWidth id="searchRoom" name="searchRoom" placeholder='Search Room' value={search} onChange={e => setSearch(e?.target?.value)} />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Button variant='contained' size='medium' color='secondary' fullWidth onClick={handleSearch}>Search</Button>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Link to={"/rooms/create"}><Button variant='contained' size='medium' fullWidth>Add New Room Details</Button></Link>
                    </Grid>
                    {rooms.length === 0 && <Grid item xs={12} >
                        <Alert variant='standard' color='info'>No records to display</Alert>
                    </Grid>}
                    <Grid item xs={12} >
                        <Grid container spacing={2} pt={4}>
                            {rooms.map((room: RoomModel) => <Grid key={room.id} item xs={12} md={6} lg={4}>
                                <Room room={room} handleDeleteDone={() => loadRooms()} />
                            </Grid>)}
                        </Grid>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    </>
  )
}

export default Rooms