import { Box, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import TabPanel from "./TabPanel";

function a11yProps(index : any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  export interface TabProps{
    comp: any,
    key: string,
    index: number
  }
  interface VerticalTabsProp {
    tabs: TabProps[]
  }

  export default function VerticalTabs(props: VerticalTabsProp) {
    const {tabs} = props
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event : any, newValue : any) => {
      setValue(newValue);
    };
  
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 800 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          style={{width:200}}
        >
          {tabs.map(({comp, key, index}) => <Tab key={index} label={key} {...a11yProps(index)} />)}
          {/* <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {tabs.map(({comp, key, index}) => {
                return <TabPanel key={index} value={value} index={index}>
                {comp}
              </TabPanel>
            })}
          </Grid>
        </Grid>
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Box>
    );
  }