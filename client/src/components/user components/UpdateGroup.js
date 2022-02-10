import React, { useState } from 'react';
import { ViewIcon } from "@chakra-ui/icons";
import {
    useDisclosure, IconButton, Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Box, useToast, FormControl,
    Input, Spinner
} from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import UserBadge from '../userAvater/UserBadge'
import axios from 'axios'
import UserList from '../userAvater/UserList'
const UpdateGroup = ({ fetchAgain, fetchMessages, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameloading, setRenameloading] = useState(false)
    const { selectedChat, setSelectedChat, user } = ChatState()
    const toast = useToast()
    const handleRename = async () => {
        if (!groupChatName) return
        try {
            setRenameloading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put('/api/chat/rename',
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                config
            )
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameloading(false)
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setRenameloading(false)
        }
        setGroupChatName("")
    }
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
            console.log(data)
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
    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User Already in group!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/groupadd`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    }
    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/groupremove`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    };
    return (
        <>
            <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="40px" fontFamily="Work sans" d='flex' justifyContent="center" color='#87CEEB'>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w="100%" d='flex' flexWrap="wrap" pb={3}>{selectedChat.users.map((u) => (<UserBadge
                            key={user._id}
                            user={u}
                            handleFunction={() => handleRemove(u)}
                        />))}   </Box>
                        <FormControl>

                            <Input placeholder='Chat Name' mb={3} value={groupChatName} onChange={(event) => setGroupChatName(event.target.value)} />
                            <Button variant='solid' colorScheme='teal'
                                ml={1}
                                isLoading={renameloading}
                                onClick={handleRename}>
                                Update
                            </Button>
                        </FormControl>
                        <br />
                        <FormControl>
                            <Input placeholder='Add user to group' mb={1} onChange={(event) => handleSearch(event.target.value)} />
                        </FormControl>
                        {loading ? (<Spinner size="lg" />) : (searchResult?.map((user) => <UserList key={user._id} user={user}
                            handleFunction={() => handleAddUser(user)} />))}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleRemove(user)} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default UpdateGroup;
