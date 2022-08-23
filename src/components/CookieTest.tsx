import moment from 'moment';
import React from 'react'
import { useCookies } from 'react-cookie';

function CookieTest() {
    const cookie = 'wenaboardinguser'
    const [cookies, setCookie, removeCookie] = useCookies([cookie]);
  return (
    <div>
        <button onClick={() => setCookie(cookie,true,{expires:moment().add(5, 'seconds').toDate()})}>Set Cookie</button>
        <button onClick={() => removeCookie(cookie)}>Remove Cookie</button>
    </div>
  )
}

export default CookieTest