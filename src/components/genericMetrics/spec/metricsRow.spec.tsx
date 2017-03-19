import { assert, expect } from 'chai';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import MetricsRow from '../MetricsRow';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TableRowColumn } from "material-ui";


function setup(){
    const muiTheme = getMuiTheme();
    let data : string[];

    return mount(<MetricsRow key={1} playerID={1} teamID={1} Data={ data }/>, {context: {muiTheme}, childContextTypes:{muiTheme: React.PropTypes.object}});
}

describe('MetricsRow component test suite.', () => {
    let cols : string[];
    let wrapper;

     it('<MetricsRow /> should not mount', () => {
         //expect(wrapper = setup()).to.Throw(TypeError);
         });
});
