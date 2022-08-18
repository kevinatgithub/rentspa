import { Alert, Button, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api'
import { RentModel } from '../models'
import Rent from './Rent'

function Rents() {
    const [rents, setRents] = useState<RentModel[]>([])
    const [startDate, setStartDate] = useState<string>('');
    const [toPerformSearch, setToPerformSearch] = useState<boolean>(false)

    useEffect(() => {
        refreshList()
    }, [])

    useEffect(() => {
        if (startDate != ''){
            setToPerformSearch(true)
        }else{
            setToPerformSearch(false)
        }
    }, [startDate])

    const refreshList = () => API.get("/Rents").then(result => setRents(result.data))

    const handleSearch = () => {
        if (startDate == '' || startDate == null)
            return;

        setToPerformSearch(false)

        API.get(`/Profiles/find/${startDate}`).then(result => setRents(result.data))
    }

  return (
    <>
        <Grid container p={2} rowSpacing={2} spacing={2}>
            <Grid item xs={6} md={4} lg={4}>
                <TextField size='small' fullWidth placeholder='Start Date' value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
                <TextField size='small' fullWidth placeholder='End Date' value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <Button variant='contained' size='medium' fullWidth color='secondary' onClick={handleSearch}>Search</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
                <Link to={"/profiles/create"}><Button variant='contained' size='medium' fullWidth>Add New Rent</Button></Link>
            </Grid>
            <Grid item xs={12} >
                <Grid container spacing={2} >
                    {rents.sort().map((r,i) => <Grid key={i} item xs={12} md={6} lg={4}>
                        <Rent key={i} rent={r} onDelete={refreshList} />
                    </Grid>)}
                    {!toPerformSearch && rents.length == 0 && 
                        <Grid item xs={12}>
                            <Alert variant='standard' color='info'>No Profiles {startDate ? 'Found' : 'to display'}</Alert>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    </>
  )
}

export default Rents