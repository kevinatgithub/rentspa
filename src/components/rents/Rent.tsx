import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useRef, useState } from 'react'
import ThreeDotMenu from '../../lib/ThreeDotMenu'
import { ProfileModel, RentModel, RoomModel, stringAvatar } from '../models'
import { useNavigate } from 'react-router-dom'
import API from '../../api'
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface RentProps{
    rent: RentModel,
    onDelete: () => void
}
const Rent:FC<RentProps> = ({rent, onDelete}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<ProfileModel | null>(null)
    const [room, setRoom] = useState<RoomModel | null>(null)
    const anchorRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (rent){
            API.get(`/Profiles/${rent.profileId}`).then(result => setProfile(result.data))
            API.get(`/Rooms/${rent.roomId}`).then(result => setRoom(result.data))
        }
    }, [rent])
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleViewDetails = (obj:any) => navigate(`/rooms/${obj.roomId}`)
    const handleUpdate = (obj:any) => navigate(`/rooms/${obj.id}/update`)
    const handleDelete = (obj:any) => {
        if (window.confirm("Delete Profile Details?")){
            API.delete(`/Profiles/${rent.id}`).then(() => {
                onDelete()
            })
        }
    }
    return (
        <Box>
            <ThreeDotMenu 
                obj={rent}
                open={open} 
                setOpen={setOpen} 
                anchorRef={anchorRef.current} 
                items={[
                    {label: 'View Details', onClick: handleViewDetails},
                    {label: 'Update', onClick: handleUpdate},
                    {label: 'Delete', onClick: handleDelete},
                ]} />
            <Card>
                {profile && room && 
                    <>
                        <CardHeader
                            avatar={
                                <Avatar {...stringAvatar(profile.name)} />
                            }
                            action={
                            <IconButton 
                                ref={anchorRef}
                                onClick={handleToggle}>
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={profile.name}
                            subheader={room.name}
                        />
                        <CardContent>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={12} md={6} alignContent='end'>
                                    <Typography variant='body2'>
                                        Last Payment
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='body2'>
                                        August 2, 2022
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} alignContent='end'>
                                    <Typography variant='body2'>
                                        Boarded Date
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='body2'>
                                        August 2, 2022
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} alignContent='end'>
                                    <Typography variant='body2'>
                                        Status
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='body2' color={'success'}>
                                        Active
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </>
                }
            </Card>
        </Box>
      )
}

export default Rent