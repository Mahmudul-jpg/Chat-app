import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, useToast, FormControl,
    Input, Box
} from '@chakra-ui/react'
import axios from 'axios'
import { ChatState } from '../../context/ChatProvider'
import UserList from '../userAvater/UserList'
import UserBadge from '../userAvater/UserBadge'
const GroupChat = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const { user, chats, setChats } = ChatState()
    const [selectedUsers, setSelectedUsers] = useState([])

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };
    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) { return }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data)
        }
        catch (error) {
            toast({
                title: 'error occured!',
                description: 'failed to load the search result',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
    }
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Please all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            }, config)
            setChats([data, ...chats])
            onClose()
            toast({
                title: 'New Group chat Created',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            toast({
                title: 'failed to create chat',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }
    const handleDelete = (deleteUser) => { setSelectedUsers(selectedUsers.filter((select) => select._id !== deleteUser._id)) }
    return <>
        <span bg="#87CEEB" onClick={onOpen}>{children}</span>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="35px"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent="center">Create Group</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDir="column" alignItems="center">
                    <FormControl>

                        <Input
                            placeholder="Chat Name"
                            mb="3"
                            onChange={(event) => setGroupChatName(event.target.value)}
                        />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <FormControl>

                        <Input
                            placeholder="Add Users"
                            mb="1"
                            onChange={(event) => handleSearch(event.target.value)}
                        />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <Box w='100%' d='flex' flexWrap='wrap'>
                        {selectedUsers.map((u) => (<UserBadge key={user._id}
                            user={u}
                            handleFunction={() => handleDelete(u)} />))}
                    </Box>
                    {loading ? <div>loading</div> : (searchResult?.slice(0, 4).map((user) => <UserList key={user._id} user={user}
                        handleFunction={() => handleGroup(user)} />))}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={handleSubmit}>
                        Create Chat
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>;
};

export default GroupChat;
