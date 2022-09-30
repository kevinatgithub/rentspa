import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Hidden, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC, useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThreeDotMenu from '../../lib/ThreeDotMenu';
import { useNavigate } from 'react-router-dom';
import { ProfileModel, RoomModel, stringAvatar } from '../models';
import API from '../../api';
import BoyIcon from '@mui/icons-material/Boy';
import WomanIcon from '@mui/icons-material/Woman';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

export interface RoomWithTenants extends RoomModel{
    tenants?: ProfileModel[],
    available?: boolean
}
interface RoomProps{
    room: RoomWithTenants,
    handleDeleteDone: () => void
}
const Room: FC<RoomProps> = ({room, handleDeleteDone}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

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

    const availableCapacity = room.capacity - (room.tenants?.length ?? 0)

    const content = <Grid container spacing={2} rowSpacing={2} p={2}>
                        <Grid item xs={6} md={4}>
                            <Typography variant='overline'>
                                Max Capacity
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant='overline'>
                                {room.capacity}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant='overline'>
                                Available
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant='overline'>
                                {availableCapacity > 0 ? availableCapacity : 0}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                {(room.tenants?.length === 0 || !room.tenants) && <Grid item xs={12} style={{textAlign:'center'}}><Typography variant='overline'>No Tenants Yet</Typography></Grid>}
                {room.tenants?.map(t => <>
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
                {room.remarks && <>
                    <Grid item xs={12} alignContent='center'>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} alignContent='center'>
                        <Typography variant='overline'>
                            {room.remarks ? room.remarks : '-'}
                        </Typography>
                    </Grid>
                </>}
            </Grid>

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
            <Hidden smUp>
                <CardContent>
                    {content}
                </CardContent>
            </Hidden>
            <Hidden smDown>
                <CardContent style={{minHeight:300}}>
                    {content}
                </CardContent>
            </Hidden>
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