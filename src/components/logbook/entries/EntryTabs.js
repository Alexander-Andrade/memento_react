import React, {useState} from 'react';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {COLOR_LIGHTER} from "../../constants/Colors";
import './EntryTabs.css';

export const EntryTabs = () => {
  return (
    <Tabs>
      <TabList color={COLOR_LIGHTER}>
        <Tab fontSize='2xl'>One</Tab>
        <Tab fontSize='2xl'>Two</Tab>
        <Tab fontSize='2xl'>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p><p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>
          <p>one!</p>

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
