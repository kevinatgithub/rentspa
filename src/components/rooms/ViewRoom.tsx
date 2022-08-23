import { Alert, Button, Card, CardContent, CardHeader, Grid, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThreeDotMenu from '../../lib/ThreeDotMenu'
import API from '../../api';
import { loadPayments, numberWithCommas, Payment, ProfileModel, RoomModel } from '../models'
import TenantCard from '../profiles/TenantCard';
import PaymentTable from '../payments/PaymentTable';
import GroupIcon from '@mui/icons-material/Group';

function ViewRoom() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [room, setRoom] = useState<RoomModel | null>();
    const [tenants, setTenants] = useState<ProfileModel[]>([]);
    const [open, setOpen] = useState(false);
    const [sbopen, setSbOpen] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const refreshState = () => API.get(`/Rooms/${id}`).then(result => {
        setRoom(result.data);
        API.get(`/Profiles/findByRoomId/${id}`).then(r => setTenants(r.data));
        API.get(`/Payments/findByRoomId/${id}`).then(r => {
            const payments = r.data
            loadPayments({
                getPayments: () => payments,
                setPayments: (payments:Payment[]) => setPayments(payments)
            })
        })
    });
    useEffect(() => {
        refreshState()
    }, [])

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleViewDetails = (obj:any) => navigate(`/rooms/${obj.id}`)
    const handleUpdate = (obj:any) => navigate(`/rooms/${obj.id}/update`)
    const handleDelete = (obj:any) => {
        if (window.confirm("Delete Room Details?")){

        }
    }

    const handleRefresh = () => {
        // TODO: show snackbar
        setSbOpen(true)
        refreshState()
    }
  return (
    <>
        {room && 
            <Grid container spacing={2} rowSpacing={2} p={2}>
                <Snackbar open={sbopen} autoHideDuration={6000} onClose={() => setSbOpen(false)}>
                    <Alert onClose={() => setSbOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Tenancy terminated succefully!
                    </Alert>
                </Snackbar>
                <Grid item xs={12} md={6}>
                    <Typography variant="overline" gutterBottom component="div">
                        Room Details
                    </Typography>
                    <Box mt={1} mb={1}>
                        <ThreeDotMenu
                            obj={{id}}
                            open={open} 
                            setOpen={setOpen} 
                            anchorRef={anchorRef.current} 
                            items={[
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
                            />
                            <CardContent>
                                <Grid container spacing={2} rowSpacing={2}>
                                    <Grid item xs={6} md={4} xl={2}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            Room Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={8} xl={10}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            {room.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={4} xl={2}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            Monthly Rate
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={8} xl={10}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            P {room.pricePerMonth ? numberWithCommas(room.pricePerMonth) : 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={4} xl={2}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            Capacity
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={8} xl={10} alignItems={'center'} justifyContent="center">
                                        <Typography variant="overline" gutterBottom component="div">
                                            {room.capacity} <GroupIcon />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            Remarks
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="overline" gutterBottom component="div">
                                            {room.remarks ? room.remarks :'-'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="overline" gutterBottom component="div">
                        Tenants
                    </Typography>
                    
                    {tenants.map((t:ProfileModel,i:number) => t ? <Box key={i} mt={1} mb={1}><TenantCard key={i} profile={t} roomId={id} handleRefresh={handleRefresh} /></Box> : <></>)}

                    {tenants.length == 0 && 'No tenants'}
                    <Link to='/profiles/create'><Button style={{float:'right'}} variant='text'>Add New Tenant</Button></Link>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="overline" gutterBottom component="div">
                        Payment History
                    </Typography>
                    <PaymentTable payments={payments} />
                    {/* <TableContainer component={Paper}>
                        <Table aria-label="simple table" sx={{ minWidth: 500}}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Paid By</TableCell>
                                <TableCell>Period Covered</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {payments.length === 0 && <TableRow>
                                    <TableCell component="th" scope="row" rowSpan={5}>
                                        No records yet
                                    </TableCell>
                                </TableRow>}
                            {payments.map((row,i) => (
                                <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.paidBy}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.startDate} - {row.endDate}
                                </TableCell>
                                <TableCell align="right">
                                    {row.amount}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant='text' size='small'>Print</Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </Grid>
                <Grid item xs={12} mt={4}>
                    <Button variant='contained' color='info' onClick={() => window.history.go(-1)}>Back</Button>
                </Grid>
            </Grid>
        }
    </>
  )
}

export default ViewRoom