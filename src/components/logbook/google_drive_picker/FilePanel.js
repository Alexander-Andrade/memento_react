import {googleClientId, googleDeveloperKey} from "../../helpers/GoogleCreds";
import {Button, HStack, Tag, TagCloseButton, TagLabel, Text} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import useDrivePicker from "react-google-drive-picker";
import GoogleAuthCacher from "./auth_cacher";

export const FilePanel = ({onFilesSelected, onFileDeleted}) => {
  const [openPicker, authResponse] = useDrivePicker();
    const [pickerOpened, setPickerOpened] = useState(false);

  useEffect(() => {
    new GoogleAuthCacher(authResponse).call()
  }, [authResponse]);


  const handleOpenPicker = () => {
    openPicker({
        clientId: googleClientId(),
        developerKey: googleDeveloperKey(),
        // viewId: "FOLDERS",
        customScopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'],
        token: JSON.parse(localStorage.getItem('googleAuth'))?.access_token,
        showUploadView: true,
        showUploadFolders: true,
        // supportDrives: true,
        multiselect: true,
        // setParentFolder: 'Memento',
        // customViews: customViewsArray, // custom view
        callbackFunction: (data) => {
          console.log(data)
          if (data.action === 'loaded') {
            document.querySelector('iframe.picker-frame').focus()
            // const intervalId = setInterval(() => {
            //     if(document.activeElement === document.querySelector('iframe.picker-frame')) {
            //       console.log('stop focusing')
            //       clearInterval(intervalId);
            //     }
            //
            //     const prevModal = document.querySelector('.chakra-modal__content-container')
            //     // prevModal.style.pointerEvents = 'none'
            //     prevModal.blur()
            //
            //     const pickerIframe = document.querySelector('iframe.picker-frame');
            //     if (pickerIframe) {
            //       console.log('focused')
            //       pickerIframe.focus();
            //     }
            // }, 10);
          }
          if (data.action === 'picked') {
            onFilesSelected(data.docs)
          }
        },
      })
  }

    return (
      <HStack spacing={4} mt={3}>
         <Button onClick={() => handleOpenPicker()}>
          File Picker
         </Button>
          <Tag
            size={'lg'}
            borderRadius='full'
            variant='solid'
            colorScheme='teal'
          >
            <TagLabel>Green</TagLabel>
            <Text>{document.activeElement.className}</Text>
            <TagCloseButton />
          </Tag>
      </HStack>
    )
}