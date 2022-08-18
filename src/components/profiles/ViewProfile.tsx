import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../api'
import ThreeDotMenu from '../../lib/ThreeDotMenu'
import { ProfileModel, RentStatus, RoomModel, stringAvatar } from '../models'
import RoomInfoCard from '../rooms/RoomInfoCard'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AnyObject } from 'yup/lib/object'

const ViewProfile:FC = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const { id } = useParams()
    const [profile, setProfile] = useState<ProfileModel | null>(null)
    const [rooms, setRooms] = useState<RoomModel[]>([])
    useEffect(() => {
        async function loadRents(profileId:any){
            const rentsRequest = await API.get(`/Rents/findByProfileId/${profileId}`);
            let rents = rentsRequest.data?.filter((rnt:any) => rnt.status === RentStatus.Active)
            let rooms : any[] = []
            for(const rent of rents){
                let roomRequest = await API.get(`/Rooms/${rent.roomId}`);
                let nroom = {...roomRequest.data, status: rent.status}
                rooms.push(nroom)
            }

            setRooms(rooms)
        }
        API.get(`/Profiles/${id}`).then(r => {
            if (!r.data){
                navigate("/notfound")
                return;
            }
            setProfile(r.data)
            loadRents(id)
        })
    }, [id])
    const handleUpdate = () => {}
  return (
    <Grid container p={2} spacing={2} rowSpacing={2}>
        {profile && <>
        <Grid item xs={12}>
            <ThreeDotMenu
                    obj={profile}
                    open={open}
                    setOpen={setOpen}
                    anchorRef={anchorRef.current}
                    items={[
                        { label: 'Update Profile', onClick: handleUpdate }
                    ]} />
            <Card>
                <CardHeader
                    avatar={
                        <Avatar {...stringAvatar(profile.name)} />
                    }
                    title={profile.name}
                    subheader={profile.contactNumber ? profile.contactNumber : 'No Contact Number'}
                    action={
                    <IconButton 
                        ref={anchorRef}
                        onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                    }
                />
                <CardContent>
                    <Grid container p={2} spacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="overline">
                                <b>Profile Details</b>
                                <Button variant='text' style={{float:'right'}} onClick={() => navigate(`/Profiles/${id}/update`)}>Update Profile</Button>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={2}>
                            <Typography variant="overline">Profile ID</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={10}>
                            <Typography variant="overline">{profile.id}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={2}>
                            <Typography variant="overline">Name</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={10}>
                            <Typography variant="overline">{profile.name}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={2}>
                            <Typography variant="overline">Gender</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={10}>
                            <Typography variant="overline">{profile.gender != '' ? profile.gender : 'NOT PROVIDED'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="overline"><b>Room Details</b></Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        {rooms.map((r:any,i:number) => <>
                            {r && <RoomInfoCard key={i} room={r} />}
                        </>)}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        </>}
    </Grid>
  )
}

export default ViewProfile