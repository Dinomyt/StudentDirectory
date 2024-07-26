import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, VStack, Textarea, Text, Switch, HStack, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Student } from "./StudentTable";

interface StudentFormProps{
    isOpen: boolean;
    onClose: () => void;
    fetchData: () => void;
    currentData?: Student
}

const StudentForm = ({isOpen, onClose, fetchData, currentData}:StudentFormProps) => {
    const [student, setStudent] = useState({
      id: currentData?.id || 0,
      name: currentData?.name || '',
      address: currentData?.address || '',
      phoneNumber: currentData?.phoneNumber || '',
      email: currentData?.email ||''
    })

    const toast= useToast();

    const onSave = () => {
      console.log(student);
      if (currentData?.id){
        editStudent();
      } else {
        addStudent();
        console.log(student);
      }

    }

    const addStudent = () => {
      axios.post(`${BASE_URL}/api/Students/`, student)
           .then(response => {
            console.log(response);
            onClose();
            fetchData();
            toast({
              title: 'Product Added',
              description: `${student.name} successfully added`,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
           })
           .catch(error => {
            console.log(error);
           })
    }

    const editStudent = () => {
      axios.put(`${BASE_URL}/api/Students/${currentData?.id}`, student)
      .then(() => {
        onClose();
        fetchData();

        toast({
          title: 'Product Edited',
          description: `${student.name} successfully edited`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch(error => {
        console.log(error);
      })
    }

    return (
      <>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack gap={3} alignItems={'self-start'}>
                <Input type="text" placeholder="Name" value={student.name} onChange={(e)=> setStudent({...student, name:e.target.value})}/>
                <Textarea placeholder="Address" value={student.address} onChange={(e)=> setStudent({...student, address:e.target.value})}/>
                <Input type="text" placeholder="Phone Number" value={student.phoneNumber} onChange={(e)=> setStudent({...student, phoneNumber:e.target.value})}/>
                <Input type="text" placeholder="Email" value={student.email} onChange={(e)=> setStudent({...student, email:e.target.value})}/>

              </VStack>
            </ModalBody>
            {JSON.stringify({student})}
            <ModalFooter>
              <HStack>
                <Button colorScheme='blue' onClick={onSave}>Save</Button>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                  Close
                </Button>
              </HStack>


            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default StudentForm