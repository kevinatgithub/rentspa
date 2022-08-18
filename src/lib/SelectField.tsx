import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Field } from 'formik'
import React, { FC } from 'react'
interface SelectFieldProps {
    fieldName: string,
    fieldErrors: string|undefined|null,
    label: string,
    options: any[],
    fullWidth?: boolean,
    value?: any
}
const SelectField:FC<SelectFieldProps> = ({fieldName, fieldErrors, label, options, ...otherProps}) => {
  return (
    <Field name={fieldName} >
        {(fieldProps:any) => {
                const {field, form} = fieldProps
                return <FormControl fullWidth error={fieldErrors != null || fieldErrors != undefined}>
                    <InputLabel>{label}</InputLabel>
                    <Select 
                        {...otherProps}
                        {...field}
                        label={label} 
                        onChange={(e: any) => form.setFieldValue(field.name, e.target.value)}
                    >
                        {options.map((item:any, i:number) => 
                            <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
                        )}
                    </Select>
                    {fieldErrors && <FormHelperText>{fieldErrors}</FormHelperText>}
                </FormControl>
            }
        }
    </Field>
  )
}

export default SelectField