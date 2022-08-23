import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import API from '../../api';
import { loadPayments, Payment } from '../models';
import PaymentTable from './PaymentTable';



function Payments() {
  const [loading,setLoading] = useState<boolean>(true)
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState<string>('');

  async function loadData(term:string){
    const getPayments = term ? async () => (await API.get(`/Payments/find/${term}`)).data : async () => (await API.get(`/Payments`)).data
    const payments = await getPayments()
    loadPayments({
      setPayments: (payments:Payment[]) => setPayments(payments),
      setLoading: (loading:boolean) => setLoading(loading),
      getPayments: () => {
        return payments
      }
    })
  }

  useEffect(() => {
    loadData(search)
  },[])

  const doSearch = () => {
    loadData(search)
  }
  
  const clear = () => {
    setSearch('')
    loadData('')
  }
  return (
    <Card>
      <CardContent>
        <Grid container p={2} spacing={2} rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom component="div" color={"primary"}>
                    Payments
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth label="Search Payment" size="small" value={search} onChange={e => setSearch(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <Button variant='contained' onClick={() => doSearch()}>Search</Button>
                <Button style={{marginLeft:10}} variant='contained' color='secondary' onClick={() => clear()}>Clear</Button>
            </Grid>
            <Grid item xs={12}>
                <PaymentTable payments={payments} isLoading={loading} />
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Payments
