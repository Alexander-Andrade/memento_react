import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, useDisclosure
} from '@chakra-ui/react'
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {InputModal} from "./InputModal";
import {DeleteModal} from "./DeleteModal";

export const ListItemMenu = ({ itemId, field, fetchList, collectionName, updateFunc, deleteFunc }) => {
    const editDisclosure = useDisclosure()
    const deleteDisclosure = useDisclosure()

    return (
    <>
        <Menu colorScheme='teal' variant='ghost'>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='ghost' colorScheme='teal'>
          </MenuButton>
          <MenuList >
            <MenuItem onClick={editDisclosure.onOpen} color='teal' icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem onClick={deleteDisclosure.onOpen} color='teal' icon={<DeleteIcon />}>Delete</MenuItem>
          </MenuList>
        </Menu>

        <InputModal
            key={`${collectionName}-input-modal-${itemId}`}
            clickFunc={updateFunc}
            initialInput={field}
            fetchCollection={fetchList}
            isOpen={editDisclosure.isOpen}
            onClose={editDisclosure.onClose}
            header={`Update ${collectionName}`}
            buttonText='Edit'
        />
        <DeleteModal
            key={`${collectionName}-delete-modal-${itemId}`}
            clickFunc={deleteFunc}
            fetchCollection={fetchList}
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
            header={`Delete ${collectionName}`}
            body={field}
            buttonText='Delete'
        />
    </>
    );
}
