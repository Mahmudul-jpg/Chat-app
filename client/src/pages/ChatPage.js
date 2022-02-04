import React from 'react';
import SideBar from '../components/user components/SideBar';
import MyChat from '../components/user components/MyChat'
import ChatBox from '../components/user components/ChatBox'
import { ChatState } from '../context/ChatProvider';
import {Box} from "@chakra-ui/layout"
function ChatPage() {
    const { user } = ChatState()

    return (<div style={{width:'100%'}}>
        {user && <SideBar />}

<Box d='flex'
     justifyContent='space-between'
     w='100%'
     h='91vh'
     p='10px'
     >
{user&& <MyChat/>}
{user&& <ChatBox/>} 

</Box>
    </div>);
};

export default ChatPage;
