import {googleClientId, googleDeveloperKey} from "../../helpers/GoogleCreds";
import {Button, HStack, Link, Tag, TagCloseButton, TagLabel, Text} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import useDrivePicker from "react-google-drive-picker";
import GoogleAuthCacher from "./auth_cacher";

export const FilePanel = ({onFilesSelected, files = [], onFileDeleted }) => {
  const [openPicker, authResponse] = useDrivePicker();

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
          if (data.action === 'loaded') {
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
        {files.map((file, index) => (
          <Tag
            key={`file-tag-${file.id}`}
            size={'lg'}
            borderRadius='full'
            variant='solid'
            colorScheme='teal'
          >
            <TagLabel>
              <Link href={file.url}>
              {file.name}
              </Link>
            </TagLabel>
            <TagCloseButton onClick={() => onFileDeleted(index)} />
          </Tag>
          ))}
      </HStack>
    )
}