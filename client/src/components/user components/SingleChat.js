import React, { useState, useEffect } from 'react';
import { ChatState } from '../../context/ChatProvider'
import { Box, Text, IconButton, Spinner, FormControl, Input, useToast, effect } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import Profile from './Profile'
import UpdateGroup from './UpdateGroup'
import axios from 'axios'
import ScrollableChat from '../user components/ScrollableChat'
import io from "socket.io-client"
const ENDPOINT = "http://localhost:4000"
var socket, selectedChatCompare
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()
    const [socketConnected, setSocketConnected] = useState(false)
    const { user, selectedChat, setSelectedChat } = ChatState()
    const toast = useToast()
    const fetchMessages = async () => {
        if (!selectedChat) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setLoading(true)
            const { data } = await axios.get(`/api/message/${selectedChat._id}`,
                config
            )
            console.log(messages)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "failed to load the messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
        }
    }
    useEffect(() => {
        fetchMessages()
    }, [selectedChat])
    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setNewMessage("")
                const { data } = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                    config
                )

                console.log(data)
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                })
            }
        }

    }
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connection", () => setSocketConnected(true))
    }, [])
    const typingHandler = (event) => {
        setNewMessage(event.target.value)
    }
    return <>{
        selectedChat ? (<>
            <Text fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Work sans"
                d="flex"
                justifyContent={{ base: "space-between" }}
                alignItems="center">
                <IconButton d={{ base: 'flex', md: 'none' }} icon={<ArrowBackIcon />} onClick={() => setSelectedChat('')} />
                {!selectedChat.isGroupChat ? (<>{getSender(user, selectedChat.users)}
                    <Profile user={getSenderFull(user, selectedChat.users)} />
                </>) : (<>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroup fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain} />
                </>)}
            </Text>
            <Box d='flex' flexDir='column' justifyContent='flex-end' p={3} bg="#87CEEB" w='100%' h='100%' borderRadius='lg' overflowY='hidden'>
                {loading ? (<Spinner
                    size="xl"
                    w="20"
                    h="20"
                    alignSelf="center"
                    margin="auto"
                />) : (

                    <div >
                        <ScrollableChat messages={messages} />
                    </div>
                )}
                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                    <Input placeholder="Enter your message" bg="whitesmoke" p='30px' variant="filled" onChange={typingHandler}
                        value={newMessage}
                    />
                </FormControl>
            </Box>
        </>) : (<Box d="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                Click on a user for chatting
            </Text>
        </Box>)
    }</>;
};

export default SingleChat;
