import { Avatar, Button, CircularProgress, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatDateStr, Payment, stringAvatar } from '../models';

const PaymentTable:FC<{payments:Payment[], isLoading?: boolean}> = ({payments, isLoading}) => {
    const navigate = useNavigate()
  return (
    <>
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Tenant</StyledTableCell>
                        <StyledTableCell >Date Paid</StyledTableCell>
                        <StyledTableCell >Period Covered</StyledTableCell>
                        <StyledTableCell >Amount</StyledTableCell>
                        <StyledTableCell >Particulars</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    {!isLoading && <TableBody>
                    {payments.sort().reverse().map((p) => (
                        <StyledTableRow key={p.payment.id}>
                          <StyledTableCell component="th" scope="row">
                              <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item xs={3}>
                                  <Avatar {...stringAvatar(p.profile.name)} />
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography variant='overline' noWrap> {p.profile.name}<br/>{p.room.name}</Typography>
                                </Grid>
                              </Grid>
                          </StyledTableCell>
                          <StyledTableCell ><Typography variant='overline' noWrap>{formatDateStr(p.payment.paidDateTime)}</Typography></StyledTableCell>
                          <StyledTableCell ><Typography variant='overline' noWrap>{formatDateStr(p.payment.periodCoveredStartDate,'l')} - {formatDateStr(p.payment.periodCoveredEndDate,'l')}</Typography></StyledTableCell>
                          <StyledTableCell ><Typography variant='overline' noWrap>P {p.payment.paidAmount}</Typography></StyledTableCell>
                          <StyledTableCell ><Typography variant='overline'>{p.payment.particulars}</Typography></StyledTableCell>
                          <StyledTableCell >
                            <Button variant='text' onClick={() => navigate(`/payments/${p.payment.id}`)}>View</Button>
                            <Button variant='text' onClick={() => navigate(`/payments/${p.payment.id}`)}>Print</Button>
                          </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>}
                    {!isLoading && payments.length == 0 && <TableBody>
                        <StyledTableRow>
                            <StyledTableCell colSpan={6} align='center'>
                                <Typography variant='overline'>No Payment Records Found</Typography>
                            </StyledTableCell>
                        </StyledTableRow>    
                    </TableBody>}
                    {isLoading && <TableBody>
                        <StyledTableRow>
                            <StyledTableCell colSpan={6} align='center'>
                                <CircularProgress />
                            </StyledTableCell>
                        </StyledTableRow>    
                    </TableBody>}
                </Table>
            </TableContainer>
    </>
  )
}

export default PaymentTable


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));