import React, { useState } from 'react';
import { Input, VStack, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { FormControl, FormLabel } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function SignUp() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [picture, setPicture] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate();

    const handleClick = () => setShow(!show)

    const details = (pictures) => {
        setLoading(true)
        if (pictures === undefined) {
            toast({
                title: 'Please Select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return
        }
        if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
            const data = new FormData()
            data.append("file", pictures)
            data.append("upload_preset", "Chat-App")
            data.append("cloud_name", "dra1szqp3")
            fetch('https://api.cloudinary.com/v1_1/dra1szqp3/image/upload', {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(data => {
                    setPicture(data.url.toString())
                    console.log(data.url.toString());
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } else {
            toast({
                title: 'Please Select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
    }
    const submit = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            toast({
                title: "Passwords Do not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const { data } = await axios.post("/api/user", { name, email, password, picture }, config
            );
            toast({
                title: "Registration successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            navigate("/chats")
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
        }
    }
    return (<VStack spacing="3px">
        <FormControl >
            <FormLabel textAlign='center' >Name<Input variant='filled' bg='snow' size="lg" placeholder='Enter Your Email' onChange={(event) => setName(event.target.value)} /></FormLabel>
        </FormControl>

        <FormControl >
            <FormLabel textAlign='center'>Email Address   <Input variant='filled' bg='snow' size="lg" placeholder='Enter Your Email' onChange={(event) => setEmail(event.target.value)} />
            </FormLabel>
        </FormControl>

        <FormControl >
            <FormLabel textAlign='center'>Password<InputGroup><Input variant='filled' bg='snow' size="lg"
                type={show ? "text" : "password"}
                placeholder='Enter Your Password' onChange={(event) => setPassword(event.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' bgcolor='lightsteelblue' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup></FormLabel>

        </FormControl>

        <FormControl >
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
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>);
}

export default SignUp;
