import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react'

interface ThreeDotMenuItem{
    label: string,
    onClick: (obj:any) => void
}
interface ThreeDotMenuProps{
    obj:any,
    open: boolean,
    setOpen: (open:boolean) => void,
    anchorRef: HTMLButtonElement | null,
    items: ThreeDotMenuItem[]
}

const ThreeDotMenu: FC<ThreeDotMenuProps> = ({obj,open,setOpen,anchorRef,items}) => {
    const handleMenuClicked = (event: Event | React.SyntheticEvent, onClick: (obj:any) => void) => {
        if (
            anchorRef &&
            anchorRef.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
        onClick(obj)
    };
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef &&
            anchorRef.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef!.focus();
        }

        prevOpen.current = open;
    }, [open]);
  return (
    <Popper
          open={open}
          anchorEl={anchorRef}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal 
          style={{zIndex:9999}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {items.map((item: ThreeDotMenuItem,i:number) => <MenuItem key={i} onClick={e => handleMenuClicked(e, item.onClick)}>{item.label}</MenuItem>)}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
  )
}

export default ThreeDotMenu