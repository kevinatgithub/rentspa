import { Grid, InputAdornment, Typography } from '@mui/material'
import { Field } from 'formik'
import { FC } from 'react'
import MyField from '../../formik/examples/shared/MyField'

interface RoomFormProps{
    editing: boolean,
    nameField?: string,
    remarksField?: string
}

const  RoomForm:FC<RoomFormProps> = ({editing, nameField, remarksField}) => {
  return (
    <>
        <Grid container p={2} rowSpacing={2} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom component="div" color={"primary"}>
                    {editing ? "Update" : "New"} Room Details
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Field name={nameField ? nameField : "name"} >
                    {(fieldProps:any) => <MyField fullWidth label="Room Name/Number" fieldProps={fieldProps} />}
                </Field>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Field name="monthlyRate" >
                    {(fieldProps:any) => <MyField fullWidth label="Monthly Rate" fieldProps={fieldProps} InputProps={{
                        startAdornment: <InputAdornment position="start">P</InputAdornment>
                    }} />}
                </Field>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Field name={remarksField ? remarksField : "remarks"} >
                    {(fieldProps:any) => <MyField fullWidth label="Room Remarks" fieldProps={fieldProps} multiline rows={2} />}
                </Field>
            </Grid>
        </Grid>
    </>
  )
}

export default RoomForm