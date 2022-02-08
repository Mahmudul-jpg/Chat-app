import React from 'react';
import { Box } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';
const UserBadge = ({ user, handleFunction }) => {
    return <Box
        px={2}
        py={1}
        borderRadius='lg'
        m={1}
        mb={2}
        variant='solid'
        fontSize={12}
        // backGroundColor='purple'
        cursor='pointer'
        onClick={handleFunction}
    >{user.name}
        <CloseIcon pl={1} />
    </Box>
};

export default UserBadge;
