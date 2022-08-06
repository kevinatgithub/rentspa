import { Card, CardContent, CardHeader, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThreeDotMenu from '../../lib/ThreeDotMenu';
import { useNavigate } from 'react-router-dom';

function Room() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleViewDetails = (obj:any) => navigate(`/rooms/${obj.id}`)
    const handleUpdate = (obj:any) => navigate(`/rooms/${obj.id}/update`)
    const handleDelete = (obj:any) => {
        if (window.confirm("Delete Room Details?")){

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
                title="Room Title"
                subheader="Monthly Rate: P 1000"
            />
            <CardContent>
                Room Remarks
            </CardContent>
        </Card>
    </Box>
  )
}

export default Room