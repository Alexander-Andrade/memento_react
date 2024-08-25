import {HStack, Link, Tag, TagCloseButton, TagLabel} from "@chakra-ui/react";
import React from "react";

export const FilePanelPreview = ({files = []}) => {
  if (files.length === 0) {
    return
  }

  return (
      <HStack spacing={4} mt={3}>
        {files.map((file) => (
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
          </Tag>
          ))}
      </HStack>
    )
}