import { useEffect, useState } from "react";
import { BASE_URL } from "../constant";
import axios, { CanceledError } from "axios";
import ColorModeSwitch from "./ColorModeSwitch";
import { Avatar, Box, Button, Flex, Heading, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import StudentForm from "./StudentForm";

export interface Student {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
}


const StudentTable = () => {
  
    const [data, setData] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentData, setCurrentData] = useState<Student>({} as Student);
    const toast= useToast();

    const fetchData = () =>{
        setIsLoading(true);
        axios
        .get(`${BASE_URL}/api/Students`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            if(error instanceof CanceledError){
                return
            }
            setError(error.message);
            console.log("error debug: "+ error);

        }).finally(()=>{
            setIsLoading(false);
        })
        console.log("Data debug: "+ data);
    }

    
    useEffect(() => {
        fetchData();
    }, []);
0
    
    const handleAddStudent = () => {
        onOpen();
        setCurrentData({} as Student);
    }

    const handleDeleteStudent =  (id: number) => {

        axios.delete(`${BASE_URL}/api/Students/${id}`)
        .then(() => {
           fetchData();
           toast({
               title: 'Product Deleted',
               description: `Product successfully deleted`,
               status: 'success',
               duration: 9000,
               isClosable: true,
             });
           })
           .catch(error => {
           console.log(error)
           })
    };

    const getStudent =(id:number) => {
        axios
        .get(`${BASE_URL}/api/Students/${id}`)
        .then(res => {
            setCurrentData(res.data);
            onOpen();
        })
        .catch(error =>{
            console.log(error);
        })
    }
    return (
    <>
        <ColorModeSwitch/>
        <Box m={32} shadow={'md'} rounded={'md'}>
            <Flex justifyContent={'space-between'} padding={'12px 24px'} alignItems="center">     
                    <Heading>
                        Student Directory
                    </Heading>
                    <Button colorScheme="teal" leftIcon={<AddIcon/>} onClick={handleAddStudent}>Add Student</Button>
            </Flex>

            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>Phone Number</Th>
                        <Th>Email</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((student:Student) =>
                        <Tr key={student.id}>
                            <Td>{student.id}</Td>
                            <Td>
                                <HStack>
                                    <Avatar size={"sm"} name={student.name}/>
                                    <Text>{student.name}</Text>
                                </HStack>
                            </Td>

                            <Td>{student.address}</Td>
                            <Td>
                                {student.phoneNumber}
                            </Td>
                            <Td>{student.email}</Td>
                            <Td>
                                <HStack>
                                    <EditIcon boxSize={23} color={"orange.200"} onClick={() => getStudent(student.id)} />
                                    <Popover>
                                        <PopoverTrigger>
                                            <DeleteIcon boxSize={23} color={"red.400"}/>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>WARNING</PopoverHeader>
                                            <PopoverBody>Are you sure you want delete {student.name}?</PopoverBody>
                                            <PopoverFooter>
                                                <Button onClick={() => handleDeleteStudent(student.id)} colorScheme="red" variant={"outline"}>Delete</Button>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>                                </HStack>
                            </Td>
                        </Tr>
                    )}
                    </Tbody>
                    <Tfoot>
                    <Tr>

                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            {error && <Text color="red">{error}</Text>}
            {data.length == 0 && <Heading textAlign={"center"} fontSize={24}>No Data</Heading>}
            {isOpen && <StudentForm currentData={currentData} isOpen={isOpen} onClose={onClose} fetchData={fetchData}/>}

        </Box>   
    </>
  )
}

export default StudentTable