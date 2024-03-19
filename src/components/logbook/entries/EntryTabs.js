import React, {useState} from 'react';
import {Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from "@chakra-ui/react";
import {COLOR_LIGHTER} from "../../constants/Colors";
import './EntryTabs.css';
import {NotesList} from "./tabs/notes/NotesList";
import {NoteCreateButton} from "./tabs/notes/NoteCreateButton";

export const EntryTabs = () => {
  return (
    <Tabs>
      <TabList color={COLOR_LIGHTER}>
        <Tab fontSize='2xl'>Notes</Tab>
        <Tab fontSize='2xl'>Events</Tab>
        <Tab fontSize='2xl'>Documents</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack align='stretch'>
            <NoteCreateButton />
            <NotesList />
          </VStack>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
