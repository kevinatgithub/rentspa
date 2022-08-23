import { Avatar, Card, CardContent, CardHeader, ClickAwayListener, Divider, Grid, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThreeDotMenu from '../../lib/ThreeDotMenu';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileModel, RoomModel, stringAvatar } from '../models';
import API from '../../api';
import BoyIcon from '@mui/icons-material/Boy';
import WomanIcon from '@mui/icons-material/Woman';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

interface RoomProps{
    room: RoomModel,
    handleDeleteDone: () => void
}
const Room: FC<RoomProps> = ({room, handleDeleteDone}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [tenants, setTenants] = useState<ProfileModel[]>([])
    const anchorRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (room){
            API.get(`/Profiles/findByRoomId/${room.id}`).then(r => setTenants(r.data))
        }
    }, [room])

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleViewDetails = () => navigate(`/rooms/${room.id}`)
    const handleUpdate = (obj:any) => navigate(`/rooms/${room.id}/update`)
    const handleDelete = (obj:any) => {
        if (window.confirm("Delete Room Details?")){
            API.delete(`/Rooms?id=${room.id}`).then(result => {
                navigate("/rooms")
                handleDeleteDone()
            })
        }
    }

  return (
    <Box mt={1} mb={1}>
        <ThreeDotMenu 
            obj={{id:100}}
            open={open} 
            setOpen={setOpen} 
            anchorRef={anchorRef.current} 
            items={[
                {label: 'View Details', onClick: handleViewDetails},
                {label: 'Update', onClick: handleUpdate},
                {label: 'Delete', onClick: handleDelete},
            ]} />
        <Card>
            <CardHeader
                action={
                <IconButton 
                    ref={anchorRef}
                    onClick={handleToggle}>
                    <MoreVertIcon />
                </IconButton>
                }
                title={room.name}
                subheader={`Monthly Rate: P ${room.pricePerMonth}`}
            />
            <CardContent style={{minHeight:300}}>
                <Grid container spacing={2} rowSpacing={2} p={2}>
                    {tenants.length == 0 && <Grid item xs={12}><Typography variant='overline'>No Tenants</Typography></Grid>}
                    {tenants.map(t => <>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} alignItems={'center'}>
                                <Grid item xs={4}>
                                    <Avatar {...stringAvatar(t.name)} />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography style={{cursor:'pointer'}} onClick={() => navigate(`/profiles/${t.id}`)} variant='overline'>
                                        {t.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>)}
                    <Grid item xs={12} alignContent='center'>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} alignContent='center'>
                        <Typography variant='overline'>
                            {room.remarks ? room.remarks : '-'}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Box>
  )
}

export default Room

const TenantIcon:FC<{tenant: ProfileModel}> = ({tenant}) => {
    return <>
        {tenant.gender.toUpperCase() === 'MALE' && <BoyIcon />}
        {tenant.gender.toUpperCase() === 'FEMALE' && <WomanIcon />}
        {tenant.gender.toUpperCase() !== 'MALE' && tenant.gender.toUpperCase() !== 'FEMALE' && <NoiseControlOffIcon />}
    </>
}