import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import OfflineBrowsing from "../../src/OfflineBrowsing"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "OfflineBrowsing"
  }

const feature = loadFeature('./__tests__/features/OfflineBrowsing-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to OfflineBrowsing', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:OfflineBrowsing; 

        given('I am a User loading OfflineBrowsing', () => {
            exampleBlockA = shallow(<OfflineBrowsing {...screenProps}/>)
        });

        when('I navigate to the OfflineBrowsing', () => {
             instance = exampleBlockA.instance() as OfflineBrowsing
        });

        then('OfflineBrowsing will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            expect(exampleBlockA).toMatchSnapshot();
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press')
            expect(exampleBlockA).toMatchSnapshot();
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com")
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });
    });


});
