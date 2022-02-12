import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider'
import { Box, Text, IconButton, Spinner, FormControl, Input } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import Profile from './Profile'
import UpdateGroup from './UpdateGroup'
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [loading, setLoading] = useState()
    const [message, setMessage] = useState()
    const { user, selectedChat, setSelectedChat } = ChatState()

    const sendMessage = () => {

    }
    const typingHandler = () => {

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
                {!loading ? (<Spinner
                    size="xl"
                    w="20"
                    h="20"
                    alignSelf="center"
                    margin="auto"
                />) : (<>


                </>)}
                <FormControl onKeyDown={sendMessage}>
                    <Input placeholder="Enter your message" bg="whitesmoke" p='30px' variant="filled" onChange={typingHandler} />
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
