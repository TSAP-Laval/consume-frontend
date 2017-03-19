import { expect } from 'chai';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import GenericMetricsView from '../GenericMetricsView';
import MetricsTable from "../MetricsTable";

import getMuiTheme from 'material-ui/styles/getMuiTheme';

function setup(){
    const muiTheme = getMuiTheme();

    return mount(<GenericMetricsView teamID={3}/>, {context: {muiTheme}, childContextTypes:{muiTheme: React.PropTypes.object}});
}

describe('GenericMetricsView component test suite.', () => {
    let cols : string[];
    let wrapper;

    before(() =>{
        wrapper = setup();
    });

     it('<MetricsTable /> should mount', () => {
         expect(wrapper).to.not.be.undefined;
    });

    it('Should not have a team name.', () => {
        expect(wrapper.state().nomEquipe).to.be.undefined;
    });
    
     it('The team name should be Team Harambe.', () => {
         wrapper.setState({nomEquipe: 'Team Harambe'});
        expect(wrapper.state().nomEquipe).to.not.be.undefined;
    });

    after(() => {
        wrapper.unmount();
    });

    it('The component should unmount.', () => {
        expect(wrapper).to.not.contain(<MetricsTable columns={ cols }/>);
    });
});
