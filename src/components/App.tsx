import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Rooms from './rooms/Rooms'
import CreateRoom from './rooms/CreateRoom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ViewRoom from './rooms/ViewRoom';
import Profiles from './profiles/Profiles';
import CreateProfile from './profiles/CreateProfile';
import SideDrawer from './SideDrawer';
import NewPayment from './payments/NewPayment';
import PreviewPayment from './payments/PreviewPayment';
import Payments from './payments/Payments';
import { Container } from '@mui/system';
import { amber, indigo, purple } from '@mui/material/colors';
import Rents from './rents';
import ViewProfile from './profiles/ViewProfile';
import NotFound from './NotFound';
import TransferExistingTenant from './profiles/TransferExistingTenant';
import UpdateProfile from './profiles/UpdateProfile';


function App() {
    // const theme = createTheme({
    //     palette: {
    //       primary: {
    //         main: '#3f51b5',
    //       },
    //       secondary: {
    //         main: '#f50057',
    //       },
    //     },
    //   });

    const theme = createTheme({
      palette: {
        primary: indigo,
        secondary: amber,
        background: {
          default: '#e8eaf6'
        }
      },
    });
      
  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Router>
                    <SideDrawer />
                    <Container maxWidth='xl'>
                      <Routes>
                          <Route path="/" element={<NewPayment />}></Route>
                          <Route path="/payments" element={<Payments />}></Route>
                          <Route path="/payments/preview" element={<PreviewPayment />}></Route>
                          <Route path="/payments/create" element={<NewPayment />}></Route>
                          <Route path="/rents" element={<Rents />}></Route>
                          <Route path="/profiles" element={<Profiles />}></Route>
                          <Route path="/profiles/transfer/:id/:oldRoomId" element={<TransferExistingTenant />}></Route>
                          <Route path="/profiles/create" element={<CreateProfile />}></Route>
                          <Route path="/profiles/:id" element={<ViewProfile />}></Route>
                          <Route path="/profiles/:id/update" element={<UpdateProfile />}></Route>
                          <Route path="/rooms" element={<Rooms />}></Route>
                          <Route path="/rooms/create" element={<CreateRoom />}></Route>
                          <Route path="/rooms/:id" element={<ViewRoom />}></Route>
                          <Route path="/rooms/:id/update" element={<CreateRoom />}></Route>
                          <Route path="/notfound" element={<NotFound />}></Route>
                      </Routes>
                    </Container>
                </Router>
            </main>
        </ThemeProvider>
    </>
  )
}

export default App