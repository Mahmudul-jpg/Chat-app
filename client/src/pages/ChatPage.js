import React from 'react';
import SideBar from '../components/user components/SideBar';
import { ChatState } from '../context/ChatProvider';

function ChatPage() {
    const { user } = ChatState()

    return (<div>
        {user && <SideBar />}


    </div>);
};

export default ChatPage;
