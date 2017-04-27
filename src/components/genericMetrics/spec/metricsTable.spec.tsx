import { expect } from 'chai';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import MetricsTable from "../MetricsTable";

import getMuiTheme from 'material-ui/styles/getMuiTheme';

function setup(){
    const muiTheme = getMuiTheme();
    const cols = [['Embrace the darkside', null], ['true', null]];

    return mount(<MetricsTable columns={cols}/>, {context: {muiTheme}, childContextTypes:{muiTheme: React.PropTypes.object}});
}

describe('MetricsTable component test suite.', () => {
    let wrapper:any;

    before(() =>{
        wrapper = setup();
    });

     it('Component <MetricsTable /> should exist.', () => {
         expect(wrapper.find(MetricsTable)).to.exist;
    });

    it('should have classe name metrics-table.', () => {
        expect(wrapper.find('.metrics-table')).to.exist;
    });

});
