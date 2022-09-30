import { Alert, Button, Card, CardContent, FormControlLabel, Grid, Hidden, Switch, TextField } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api'
import { RoomModel } from '../models'
import Room, { RoomWithTenants } from './Room'

const Rooms:FC<{showAvail?:boolean, setShowAvail?:Function}> = ({showAvail, setShowAvail}) => {
    const [search, setSearch] = useState<string| null>(null)
    const [rooms,setRooms] = useState<RoomWithTenants[]>([])

    async function loadTenants(rooms: RoomModel[], show?: boolean){
        let result: RoomWithTenants[] = []
        for(let room of rooms){
            const tenants = (await API.get(`/profiles/findByRoomId/${room.id}`)).data
            const availableCapacity = room.capacity - (tenants?.length ?? 0)
            result.push({...room, tenants, available: availableCapacity > 0})
        }
        const data = show ? result.filter((r:RoomWithTenants) => r.available === show) : result
        
        setRooms(data)
    }
    
    async function loadRooms(show?:boolean){
        const rooms = (await API.get("/rooms")).data
        await loadTenants(rooms, show)
    }
    useEffect(() => {

        loadRooms(showAvail)
    }, [])

    const handleShowChange = async (show:boolean) => {
        setShowAvail && setShowAvail(show)
        handleSearch(show)
    }

    const handleSearch = async (show?:boolean) => {
        if (!search) {
            loadRooms(show)
            return;
        }

        const rooms = (await API.get(`/rooms/filterByName/${search}`)).data
        await loadTenants(rooms, show)
    }
  return (
    <>
        <Card>
            <CardContent>
                <Grid container p={2} rowSpacing={2} spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField fullWidth size='small' id="searchRoom" name="searchRoom" placeholder='Search Room' value={search} onChange={e => setSearch(e?.target?.value)} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Button style={{marginLeft:15, minWidth:100}} variant='contained' size='medium' color='secondary' onClick={() => handleSearch(showAvail)}>Search</Button>
                        <Link to={"/rooms/create"}><Button style={{marginLeft:15, minWidth:100}} variant='contained' size='medium'>Add New Room</Button></Link>
                        <FormControlLabel style={{marginLeft:15}} label="Show available rooms only" control={<Switch checked={showAvail} onChange={e => handleShowChange(e.target.checked)} />} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Grid container p={2} pt={0} rowSpacing={2} spacing={2}>
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

    </>
  )
}

export default Rooms