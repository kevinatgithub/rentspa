import { Button, Grid } from '@mui/material'
import React, { useRef, useState } from 'react'

function WithoutFormikExample() {
  const formRef = useRef<any>()
  const [firstName, setFirstName] = useState<string>('')
  const [firstNameError, setFirstNameError] = useState<string>('')
  const [middleName, setMiddleName] = useState<string>('')
  const [middleNameError, setMiddleNameError] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [lastNameError, setLastNameError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')

  const handleFirstNameChange = (e: any) => setFirstName(e.target.value)
  const handleMiddleNameChange = (e: any) => setMiddleName(e.target.value)
  const handleLastNameChange = (e: any) => setLastName(e.target.value)
  const handleEmailChange = (e: any) => setEmail(e.target.value)

  const handleFirstNameBlur = (e: any) => {
    if (!e.target?.value) {
      setFirstNameError("First Name is required")
      return false
    } else {
      setFirstNameError("")
      return true
    }
  }
  
  const handleMiddleNameBlur = (e: any) => true
  
  const handleLastNameBlur = (e: any) => {
    if (!e.target?.value) {
      setLastNameError("Last Name is required")
      return false
    } else {
      setLastNameError("")
      return true
    }
  }
  
  const handleEmailBlur = (e: any) => {
    if (!e.target?.value) {
      setEmailError("Email is required")
      return false
    } else if (!(/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(.\w{2,3})+$/.test(e.target?.value))) {
      setEmailError("Email is invalid")
      return false
    } else {
      setEmailError("")
      return true
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    let passed = false
    passed = handleFirstNameBlur({target: { value : firstName}})
    passed = handleMiddleNameBlur({target: { value : middleName}})
    passed = handleLastNameBlur({target: { value : lastName}})
    passed = handleEmailBlur({target: { value : email}})
    
    if (!passed){
      return false;
    } else {
      alert(JSON.stringify({
        firstName, middleName, lastName, email
      }))
    }

  }

  const submitForm = (e: any) => {
    e.preventDefault()
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    )
  }

  return (
    <form onSubmit={e => handleSubmit(e)} ref={formRef}>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={4}>
          <label>First Name</label> <br />
          <input type="text" name="firstName" value={firstName} onChange={handleFirstNameChange} onBlur={handleFirstNameBlur} /> <br />
          {firstNameError && <span style={{ color: 'red' }}>{firstNameError}</span>}
        </Grid>
        <Grid item xs={4}>
          <label>Middle Name</label> <br />
          <input type="text" name="firstName" value={middleName} onChange={handleMiddleNameChange} onBlur={handleMiddleNameBlur} /> <br />
          {middleNameError && <span style={{ color: 'red' }}>{middleNameError}</span>}
        </Grid>
        <Grid item xs={4}>
          <label>Last Name</label> <br />
          <input type="text" name="firstName" value={lastName} onChange={handleLastNameChange} onBlur={handleLastNameBlur} /> <br />
          {lastNameError && <span style={{ color: 'red' }}>{lastNameError}</span>}
        </Grid>
        <Grid item xs={4}>
          <label>Email</label> <br />
          <input type="text" name="firstName" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} /> <br />
          {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={submitForm}>Submit</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default WithoutFormikExample