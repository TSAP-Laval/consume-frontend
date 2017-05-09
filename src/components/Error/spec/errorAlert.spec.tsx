import { expect } from 'chai';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ErrorAlert from "../Index";

function setup(){
    const muiTheme = getMuiTheme();
    //No need to past MUI in context.
    return mount(<ErrorAlert Message = {'Test du component errorAlert'}/>, {context: {muiTheme}, childContextTypes:{muiTheme: React.PropTypes.object}});
}

describe('ErrorAlert component test suite.', () => {
    let wrapper:any;

    before(() =>{
        wrapper = setup();
    });

     it('Component <ErrorAlert /> should mount.', () => {
         expect(wrapper.find(ErrorAlert)).to.exist;
    });

    it('Component <ErrorAlert /> should have a message.', () => {
        expect(wrapper.props().Message).length.to.be.greaterThan(0);
    });
});
