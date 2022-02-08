import React from 'react';
import { Box, Avatar, Text } from '@chakra-ui/react'
const UserList = ({ user, handleFunction }) => {
    return <Box onClick={handleFunction}
        cursor='pointer'
        bg="blue"
        _hover={{
            background: "white",
            color: "teal.500",
        }}
        w='100%'
        d='flex'
        alignItems='center'
        color='black'
        px={3}
        py={2}
        mb={2}
        borderRadius='lg'
    >
        <Avatar size='sm' mr={2} name={user.name} src={user.picture} cursor='pointer' />
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize='xs'><b>Email:</b>{user.email}</Text>
        </Box>
    </Box>;
};

export default UserList;
