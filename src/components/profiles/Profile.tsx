import { Avatar, Card, CardContent, CardHeader,IconButton } from '@mui/material'
import { Box } from '@mui/system'
import {  FC, useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThreeDotMenu from '../../lib/ThreeDotMenu';
import { useNavigate } from 'react-router-dom';
import { ProfileModel, RentModel, RoomModel, stringAvatar } from '../models';
import API from '../../api';

interface ProfileProps{
    profile: ProfileModel,
    onDelete: () => void
}

const Profile: FC<ProfileProps> = ({profile, onDelete}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [rent, setRent] = useState<RentModel|null>(null);
    const anchorRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (profile){
            API.get(`/Rents/findByProfileId/${profile.id}`).then(result => {
                if (result.data?.length){
                    const activeRents = result.data?.filter((r:RentModel) => r.status === 0)
                    if (activeRents?.length){
                        setRent(activeRents[0])
                    }
                }
            })
        }
    },[profile])

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleTransfer = (obj:any) => navigate(`/profiles/transfer/${obj.id}/${rent?.roomId ?? 0}`)
    const handleViewDetails = (obj:any) => navigate(`/profiles/${obj.id}`)
    const handleUpdate = (obj:any) => navigate(`/profiles/${obj.id}/update`)
    const handleDelete = (obj:any) => {
        if (window.confirm("Delete Profile Details?")){
            API.delete(`/Profiles/${profile.id}`).then(() => {
                onDelete()
            })
        }
    }

  return (
    <Box>
        <ThreeDotMenu 
            obj={profile}
            open={open} 
            setOpen={setOpen} 
            anchorRef={anchorRef.current} 
            items={[
                {label: 'Transfer', onClick: handleTransfer},
                {label: 'View Details', onClick: handleViewDetails},
                {label: 'Update', onClick: handleUpdate},
                {label: 'Delete', onClick: handleDelete},
            ]} />
        <Card>
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
                subheader={profile.contactNumber ? profile.contactNumber : 'No Contact Number'}
            />
        </Card>
    </Box>
  )
}

export default Profile