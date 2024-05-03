import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Text, useDisclosure
} from '@chakra-ui/react'
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {InputModal} from "./InputModal";
import {DeleteModal} from "./DeleteModal";

export const ListItemMenu = ({ itemId, field, collectionName, updateFunc, deleteFunc }) => {
    const editDisclosure = useDisclosure()
    const deleteDisclosure = useDisclosure()

    return (
    <>
        <Menu colorScheme='teal' variant='ghost'>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='ghost' colorScheme='teal' size='lg'>
          </MenuButton>
          <MenuList className='menu-list'>
            <MenuItem onClick={editDisclosure.onOpen} icon={<EditIcon/>} className='menu-list-item'>Edit</MenuItem>
            <MenuItem onClick={deleteDisclosure.onOpen} icon={<DeleteIcon/>} className='menu-list-item'>Delete</MenuItem>
          </MenuList>
        </Menu>

        <InputModal
            key={`${collectionName}-input-modal-${itemId}`}
            clickFunc={updateFunc}
            initialInput={field}
            isOpen={editDisclosure.isOpen}
            onClose={editDisclosure.onClose}
            header={`Update ${collectionName}`}
            buttonText='Edit'
        />
        <DeleteModal
            key={`${collectionName}-delete-modal-${itemId}`}
            clickFunc={deleteFunc}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header={`Delete ${collectionName}`}
            body={<Text>{field}</Text>}
            buttonText='Delete'
        />
    </>
    );
}
