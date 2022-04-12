import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './Drawer.css';

function HamburgerDrawer() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor='right' sx={{'& .MuiDrawer-paper': {backgroundColor: 'white'}}}>
                <IconButton onClick={() => setOpenDrawer(false)} style={{borderRadius: 0, marginLeft: 'auto'}}>
                    <CloseOutlinedIcon className='svg_Right'/>
                </IconButton>
                <List>
                    {!user.id && (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText className='drawerLinkBox'>
                                    <Link className='drawerLink' to="/login">
                                        Login/Register
                                    </Link>    
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                    {user.id && (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText className='drawerLinkBox'>
                                    <Link className='drawerLink' to="/user">
                                        Home
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText className='drawerLinkBox'>
                            <Link className='drawerLink' to="/about">
                                About
                            </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText className='drawerLinkBox'>
                            <Link className='drawerLink' to="/adddram">
                                Add a Dram
                            </Link>
                        </ListItemText>
                    </ListItem>
                    {user.id && (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText className='drawerLinkBox'>
                                    <Link className='drawerLink' to="/viewdrams">
                                        View Drams
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText className='drawerLinkBox'>
                                    <Link className='drawerLink' to="/analyzedrams">
                                        Analyze Drams
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText className='drawerLinkBox'>
                                    <Link className="drawerLink" to="/login" onClick={() => dispatch({ type: 'LOGOUT' })}>
                                        Log Out
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon className='svg_Icon'/>
            </IconButton>
        </>
    );
}

export default HamburgerDrawer;