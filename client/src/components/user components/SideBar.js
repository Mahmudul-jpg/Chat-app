import React from 'react'
import { useState } from 'react';
import { Spinner } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,

    MenuDivider,
} from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,

    DrawerHeader,
    DrawerOverlay,
    DrawerContent,

} from '@chakra-ui/react'
import { Tooltip, Button, Box, Text, Avatar, Input } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/ChatProvider'
import Profile from './Profile'
import { useNavigate } from "react-router-dom"
import { useDisclosure } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserList from '../userAvater/UserList'
function SideBar() {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { user, setSelectedChat, chats, setChats } = ChatState()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }

    const HandleSearch = async () => {
        if (!search) {
            toast({
                title: "please enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
            return
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }
    const accessChat = async (userId) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('/api/chat', { userId }, config)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
            setSelectedChat(data)
            setLoadingChat(false)
            onClose()
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }

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
                    <Button variant='ghost' onClick={onOpen}>
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
                            <MenuItem bg="#87CEEB" onClick={logoutHandler}>Logout</MenuItem>

                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box d='flex' pb={2}>
                            <Input variant='outline' placeholder='Search by name or email' mr={2} value={search} onChange={(event) => setSearch(event.target.value)} />
                            <Button
                                onClick={HandleSearch}
                            >
                                < FaSearch />
                            </Button>
                        </Box>
                        {loading ? (<ChatLoading />) : (searchResult?.map((user) => (<UserList
                            key={user._id}
                            user={user}
                            handleFunction={() => accessChat(user._id)}
                        />)))}
                        {loadingChat && <Spinner ml="auto" d="flex" />}
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </>
    );
};

export default SideBar;
