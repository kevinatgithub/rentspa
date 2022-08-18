import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { FC, useRef, useState } from 'react'
import ThreeDotMenu from '../../lib/ThreeDotMenu';
import { ProfileModel, stringAvatar } from '../models';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

interface TenantCardProps{
    profile: ProfileModel,
    roomId: any,
    handleRefresh: () => void
}
const TenantCard:FC<TenantCardProps> = ({profile, roomId, handleRefresh}) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleView = () => navigate(`/profiles/${profile.id}`)
    const handleTerminate = () => {
        if (!window.confirm("Terminate tenancy?"))
            return;
        API.put("/Rents/terminate",{
            roomId, profileId: profile.id 
        }).then(r => {
            handleRefresh()
        })
    }
    const handleUpdate = () => {}
    return (
        <Card>
            <ThreeDotMenu
                obj={profile}
                open={open}
                setOpen={setOpen}
                anchorRef={anchorRef.current}
                items={[
                    { label: 'Transfer Room', onClick: () => navigate(`/profiles/transfer/${profile.id}/${roomId}`) },
                    { label: 'Terminate', onClick: handleTerminate },
                    { label: 'View Profile', onClick: handleView },
                    { label: 'Update Profile', onClick: handleUpdate }
                ]} />
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
                title={`${profile.name}`}
                subheader={profile.contactNumber ? profile.contactNumber : 'No Contact Number'}
            />
        </Card>
    )
}

export default TenantCard