import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import LogOutButton from '../LogOutButton/LogOutButton';

const user = useSelector((store) => store.user);

const [openDrawer, setOpenDrawer] = useState(false);

function HamburgerDrawer() {
    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    {!user.id && (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/login">
                                        Login/Register
                                    </Link>    
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                    {user.id && (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/user">
                                        Home
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/about">
                                About
                            </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/adddram">
                                Add a Dram
                            </Link>
                        </ListItemText>
                    </ListItem>
                    {user.id && (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/viewdrams">
                                        View Drams
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/analyzedrams">
                                        Analyze Drams
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <LogOutButton />
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
}

export default HamburgerDrawer;