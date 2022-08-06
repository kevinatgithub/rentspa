import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { db, FormModel } from './types'

const ProvinceField = (props: any) => {
    const [ options, setOptions ] = useState<any[]>([])
    const { values, setFieldValue } = useFormikContext<FormModel>()
    const [ field ] = useField(props.name)

    useEffect(() => {
        setOptions([])
        if (values.region) {
            fetchProvincesAsync(values.region).then(provinces => {
                if (provinces)
                    setOptions(provinces)
            })
        }
    },[values.region])

    return <FormControl fullWidth>
        <InputLabel>Select Province</InputLabel>
        <Select {...field} label='Select Province' onChange={(e: any) => setFieldValue(field.name, e.target.value)}>
            <MenuItem key={-1} value={""}></MenuItem>
            {options?.map((r, i) => <MenuItem key={i} value={r.name}>{r.name}</MenuItem>)}
        </Select>
    </FormControl>
}

export default ProvinceField

const fetchProvincesAsync = async (region: string) => {
    await new Promise(r => setTimeout(r, 3000));
    return db.regions.find(reg => reg.name === region)?.provinces
}