import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import React from 'react'
import Rooms from './rooms/Rooms'
import CreateRoom from './rooms/CreateRoom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import SearchAppBar from './SearchAppBar';

function App() {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#3f51b5',
          },
          secondary: {
            main: '#f50057',
          },
        },
      });
      
  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <SearchAppBar />
                <Router>
                    <Routes>
                        <Route path="/rooms" element={<Rooms />}></Route>
                        <Route path="/rooms/create" element={<CreateRoom />}></Route>
                        <Route path="/rooms/:id/update" element={<CreateRoom editing />}></Route>
                    </Routes>
                </Router>
            </main>
        </ThemeProvider>
    </>
  )
}

export default App