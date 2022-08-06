import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import ProvinceField from './AsyncExample/ProvinceField'
import { db, FormModel } from './AsyncExample/types'

function AsyncExample() {
    const initialValues: FormModel = {
        region: '', province: ''
    }

    return (
        <Formik initialValues={initialValues} onSubmit={(values: FormModel) => alert(JSON.stringify(values))}>
            <Form>
                <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12}>
                        <Field name="region">
                            {(fieldProps: any) => {
                                const { field, form } = fieldProps
                                return <FormControl fullWidth>
                                    <InputLabel>Select Region</InputLabel>
                                    <Select {...field} label='Select Region' onChange={(e: any) => form.setFieldValue(field.name, e.target.value)}>
                                        <MenuItem key={-1} value={""}></MenuItem>
                                        {db.regions.map((r, i) => <MenuItem key={i} value={r.name}>{r.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            }}
                        </Field>
                    </Grid>
                    <Grid item xs={12}>
                        <ProvinceField name="province" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

export default AsyncExample

