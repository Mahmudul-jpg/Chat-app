// import React, { useState } from 'react';
import { Box, Tooltip, Button, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/ChatProvider'
import Profile from './Profile'
const SideBar = () => {
    // const [search,setSearch]=useState()
    // const [search,setSearch]=useState()
    // const [search,setSearch]=useState()
    // const [search,setSearch]=useState()
    const { user } = ChatState()
    return (
        <>
            <Box
                d='flex'
                justifyContent='space-between'
                alignItems="center"
                bg="#87CEEB"
                w='100%'
                p='10px'
                borderWidth="5px">
                <Tooltip hasArrow label="Search Users" placement="bottom-end">
                    <Button variant='ghost'>
                        < FaSearch />
                        <Text d={{ base: "none", md: "flex" }} px='5'>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontFamily='Work sans' fontSize='2xl'>
                    Chat With Your Friend
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize='2xl' m={1} />
                        </MenuButton>

                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size='sm' cursor='pointer' name={user.name} src={user.picture} />
                        </MenuButton>
                        <MenuList>
                            <Profile user={user}>
                                <MenuItem bg="#87CEEB">Profile</MenuItem>
                            </Profile>                             <MenuDivider />
                            <MenuItem bg="#87CEEB">Logout</MenuItem>

                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    )
};

export default SideBar;

