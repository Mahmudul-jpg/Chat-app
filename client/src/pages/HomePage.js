import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/form/Login'
import SignUp from '../components/form/SignUp'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function HomePage() {
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        if (user) {
            navigate('/chats')
        }
    }, [navigate])
    return (<Container centerContent maxW='xl'><Box
        display="flex"
        justifyContent="center"
        padding={3}
        bg={"lavender"}
        width="100%"
        margin="10px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
    >
        <Text color="blue"
            fontWeight="bold"
            fontSize='50px'
            fontFamily='work sans'
        >Chat with your friend</Text>
    </Box>
        <Box display="flex"
            justifyContent="center"
            padding={3}
            bg={"lavender"}
            width="100%"
            margin="20px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px">
            <Tabs isFitted variant='enclosed'>
                <TabList mb='0.1em'>
                    <Tab bgColor={"skyblue"} color={"white"} margin={"5px"}>LOGIN</Tab>
                    <Tab bgColor={"lightblue"} color={"white"} margin={"5px"}>SIGNUP</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />

                    </TabPanel>
                    <TabPanel>
                        <SignUp />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>);
};

export default HomePage;
