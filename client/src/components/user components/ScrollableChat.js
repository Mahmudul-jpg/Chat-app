import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../../config/ChatLogics.js'
import { ChatState } from '../../context/ChatProvider.js'
import { Tooltip, Avatar } from '@chakra-ui/react'
const ScrollableChat = ({ messages }) => {
    const { user } = ChatState()
    return (
        <ScrollableFeed>
            {messages && messages.map((mes, index) => (
                <div style={{ display: "flex" }} key={mes._id}>
                    {
                        (isSameSender(messages, mes, index, user._id) || isLastMessage(messages, index, user._id)) && (<Tooltip
                            label={mes.sender.name}
                            placement="bottom-start"
                            hasArrow
                        >
                            <Avatar mt='7px'
                                mr={1}
                                size="sm"
                                cursor="pointer"
                                name={mes.sender.name}
                                src={mes.sender.picture}
                            />


                        </Tooltip>)

                    }
                    <span style={{
                        backgroundColor: `${mes.sender._id === user._id ? "#E0E0E0" : "#FFFFFF"}`,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(messages, mes, index, user._id),
                        marginTop: isSameUser(messages, mes, index, user._id) ? 3 : 10,
                    }}>
                        {mes.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>

    )
}

export default ScrollableChat