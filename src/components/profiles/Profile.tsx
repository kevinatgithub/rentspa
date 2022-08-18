import { Avatar, Card, CardContent, CardHeader,IconButton } from '@mui/material'
import { Box } from '@mui/system'
import {  FC, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThreeDotMenu from '../../lib/ThreeDotMenu';
import { useNavigate } from 'react-router-dom';
import { ProfileModel, stringAvatar } from '../models';
import API from '../../api';

interface ProfileProps{
    profile: ProfileModel,
    onDelete: () => void
}

const Profile: FC<ProfileProps> = ({profile, onDelete}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

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