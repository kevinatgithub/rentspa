import { Button, Card, CardContent, FormControlLabel, Grid, Hidden, Switch, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react';
import API from '../../api';
import { loadPayments, Payment, PaymentModel } from '../models';
import PaymentTable from './PaymentTable';


interface PaymentsProps {
  showToPrintOnly?: boolean,
  setShowToPrintOnly?: (value:boolean) => void
}
const Payments:FC<PaymentsProps> = ({showToPrintOnly, setShowToPrintOnly}) => {
  const [loading,setLoading] = useState<boolean>(true)
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState<string>('');

  async function loadData(term:string, showSpecified?:boolean){
    const show = showSpecified !== null && showSpecified !== undefined ? showSpecified === true : showToPrintOnly
    const getPayments = term ? async () => (await API.get(`/Payments/find/${term}`)).data : async () => (await API.get(`/Payments`)).data
    let payments = await getPayments()
    if (show){
      payments = payments.filter((p:PaymentModel) => p.printedTime === 0)
      console.log(payments)
    }
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
  const handleShowChange = (show:boolean) => {
    loadData(search, show)
    setShowToPrintOnly && setShowToPrintOnly(show)
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
            <Grid item xs={12} md={6}>
                <TextField fullWidth label="Search Payment" size="small" value={search} onChange={e => setSearch(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                {setShowToPrintOnly && <Hidden smUp>
                  <FormControlLabel label="Show only those that needs to be printed" control={<Switch checked={showToPrintOnly} onChange={e => handleShowChange(e.target.checked)} />} />
                  <br/>
                  <br/>
                </Hidden>}
                <Button style={{minWidth:100}} variant='contained' onClick={() => doSearch()}>Search</Button>
                <Button style={{marginLeft:10, minWidth:100}} variant='contained' color='secondary' onClick={() => clear()}>Clear</Button>
                {setShowToPrintOnly && <Hidden smDown>
                  <FormControlLabel style={{marginLeft:15}} label="Show only those that needs to be printed" control={<Switch checked={showToPrintOnly} onChange={e => handleShowChange(e.target.checked)} />} />
                </Hidden>}
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
