import { Alert, Button, Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Card>
      <CardContent>
        <Grid container p={2} spacing={2} rowSpacing={2}>
            <Grid item xs={12}>
                <Alert variant='standard' color='error'>Record not Found!</Alert>
            </Grid>
            <Grid item xs={12}>
                <Link to="/"><Button variant='text'>Return to Dashboard</Button></Link>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NotFound