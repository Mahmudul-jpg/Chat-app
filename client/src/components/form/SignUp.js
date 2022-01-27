import React, { useState } from 'react';
import { Input, VStack, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { FormControl, FormLabel } from "@chakra-ui/react"
function SignUp() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [picture, setPicture] = useState()
    const handleClick = () => {
        setShow(!show)
    }
    const details = (pic) => {

    }
    const submit = () => { }
    return <VStack spacing="3px">
        <FormControl isRequired>
            <FormLabel textAlign='center' >Name<Input variant='filled' bg='snow' size="lg" placeholder='Enter Your Email' onChange={(event) => setName(event.target.value)} /></FormLabel>
        </FormControl>

        <FormControl isRequired>
            <FormLabel textAlign='center'>Email Address   <Input variant='filled' bg='snow' size="lg" placeholder='Enter Your Email' onChange={(event) => setEmail(event.target.value)} />
            </FormLabel>
        </FormControl>

        <FormControl isRequired>
            <FormLabel textAlign='center'>Password<InputGroup><Input variant='filled' bg='snow' size="lg"
                type={show ? "text" : "password"}
                placeholder='Enter Your Password' onChange={(event) => setEmail(event.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' bgcolor='lightsteelblue' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup></FormLabel>

        </FormControl>

        <FormControl isRequired>
            <FormLabel textAlign='center'>Confirm Password<InputGroup>
                <Input type={show ? "text" : "password"} variant='filled' bg='snow' size="lg" placeholder='Confirm Password' onChange={(event) => setConfirmPassword(event.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' bgcolor='lightsteelblue' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup></FormLabel>

        </FormControl>

        <FormControl id='pic'>
            <FormLabel textAlign='center'>Upload Your Picture<Input type="file" variant='filled' bg='snow' placeholder='Upload Your Picture' accept='image/*' onChange={(event) => details(event.target.files[0])} size='lg' /></FormLabel>

        </FormControl>

        <Button
            size='lg'
            height='48px'
            width='480px'
            border='2px'
            colorScheme="blue"
            onClick={submit}
        >
            Sign Up
        </Button>
    </VStack>;
}

export default SignUp;
