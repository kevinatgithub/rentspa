import { Alert, Button, Card, CardContent, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api'
import { ProfileModel } from '../models'
import Profile from './Profile'

function Profiles() {
    const [profiles, setProfiles] = useState<ProfileModel[]>([])
    const [search, setSearch] = useState<string>('');
    const [toPerformSearch, setToPerformSearch] = useState<boolean>(false)

    useEffect(() => {
        refreshList()
    }, [])

    useEffect(() => {
        if (search != ''){
            setToPerformSearch(true)
        }else{
            setToPerformSearch(false)
        }
    }, [search])

    const refreshList = () => API.get("/Profiles").then(result => setProfiles(result.data))

    const handleSearch = () => {
        if (search == '' || search == null)
            return;

        setToPerformSearch(false)

        API.get(`/Profiles/find/${search}`).then(result => setProfiles(result.data))
    }

    const handleClear = () => {
        setSearch('')
        refreshList()
    }

  return (
    <>
        <Card>
            <CardContent>
                <Grid container p={2} rowSpacing={2} spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField size='small' fullWidth id="searchRoom" name="searchRoom" placeholder='Search Profile' value={search} onChange={e => setSearch(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Button style={{minWidth:100}} variant='contained' size='medium' color='secondary' onClick={handleSearch}>Search</Button>
                        <Button style={{marginLeft:15, minWidth:100}} variant='contained' size='medium' color='info' onClick={handleClear}>Clear</Button>
                        <Link to={"/profiles/create"}><Button style={{marginLeft:15, minWidth:100}} variant='contained' size='medium'>Add New Profile</Button></Link>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container spacing={2} >
                            {profiles.sort().map((p,i) => <Grid key={i} item xs={12} md={6} lg={4}>
                                <Profile key={i} profile={p} onDelete={refreshList} />
                            </Grid>)}
                            {!toPerformSearch && profiles.length == 0 && 
                                <Grid item xs={12}>
                                    <Alert variant='standard' color='info'>No Profiles {search ? 'Found' : 'to display'}</Alert>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </>
  )
}

export default Profiles