import React from 'react';
import { ChatState } from '../../context/ChatProvider'
import { Box, Text, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import Profile from './Profile'
import UpdateGroup from './UpdateGroup'
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()
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

            </Box>
        </>) : (<Box d="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                Click on a user for chatting
            </Text>
        </Box>)
    }</>;
};

export default SingleChat;
