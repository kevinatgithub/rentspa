import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListIcon from '@mui/icons-material/List';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HotelIcon from '@mui/icons-material/Hotel';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchAppBar from './SearchAppBar';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { COOKIE_NAME } from './models';

interface SideDrawerProps {
    children?: JSX.Element
}

const SideDrawer:React.FC<SideDrawerProps> = ({children}) => {
    const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [cookies,setCookie,removeCookie] = useCookies([COOKIE_NAME])

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

    const handleLogout = () => {
        removeCookie(COOKIE_NAME)
    }

  return (
    <div>
        <Drawer
            anchor={'left'}
            open={open}
            onClose={toggleDrawer(false)}
          >
            {cookies.appuser && <>
            <Box
                sx={{ width:250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={e => navigate("/profiles/create")}>
                                <ListItemIcon>
                                    <PersonAddAlt1Icon />
                                </ListItemIcon>
                                <ListItemText primary={"New Boarder"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={e => navigate("/payments/create")}>
                                <ListItemIcon>
                                    <PaymentIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Receive Payment"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={e => navigate("/payments")}>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Payment Records"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={e => navigate("/profiles")}>
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Boarders"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={e => navigate("/rooms")}>
                                <ListItemIcon>
                                    <HotelIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Rooms and Beds"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={e => handleLogout()}>
                                <ListItemIcon>
                                    <PowerSettingsNewIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
            </Box>
            </>}

          </Drawer>
        <SearchAppBar setDrawerOpen={setOpen} />
    </div>
  );
}

export default SideDrawer;