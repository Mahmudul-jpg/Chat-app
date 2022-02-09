import React, { useState } from 'react';
import { ViewIcon } from "@chakra-ui/icons";
import {
    useDisclosure, IconButton, Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Box, useToast, FormControl,
    FormHelperText, Input
} from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import UserBadge from '../userAvater/UserBadge'
const UpdateGroup = ({ fetchAgain, setFetch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameloading, setRenameloading] = useState(false)
    const { selectedChat, setSelectedChat, user } = ChatState()
    const toast = useToast()
    const remove = () => {

    }
    const rename = () => {

    }
    const handleSearch = () => {

    }
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
                            handleFunction={() => remove(u)}
                        />))}   </Box>
                        <FormControl>

                            <Input placeholder='Chat Name' mb={3} value={groupChatName} onChange={(event) => setGroupChatName(event.target.value)} />
                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                            <Button variant='solid' colorScheme='teal' ml={1} isLoading={renameloading} onClick={rename}>Update</Button>
                        </FormControl>
                        <br />
                        <FormControl>

                            <Input placeholder='Add user to group' mb={1} value={groupChatName} onChange={(event) => handleSearch(event.target.value)} />
                            <Button variant='solid' colorScheme='teal' ml={1} isLoading={renameloading} onClick={rename}>Update</Button>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => remove(user)} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default UpdateGroup;
