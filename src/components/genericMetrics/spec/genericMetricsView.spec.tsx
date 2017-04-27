import { expect } from 'chai';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import GenericMetricsView from '../GenericMetricsView';
import MetricsTable from "../MetricsTable";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MetricsRow from "../MetricsRow";

function setup(){
    const muiTheme = getMuiTheme();
    //No need to past MUI in context.
    return mount(<GenericMetricsView teamID={3}/>, {context: {muiTheme}, childContextTypes:{muiTheme: React.PropTypes.object}});
}

describe('GenericMetricsView component test suite.', () => {
    let wrapper:any;

    before(() =>{
        wrapper = setup();
    });

     it('Sub component <MetricsTable /> should exist.', () => {
         expect(wrapper.find(MetricsTable)).to.exist;
    });

    it('The team name should be undefined.', () => {
        expect(wrapper.state().nomEquipe).to.be.undefined;
    });
    
     it('The team name should be Team Harambe.', () => {
         wrapper.setState({nomEquipe: 'Team Harambe'});
        expect(wrapper.state().nomEquipe).to.be.equal('Team Harambe');
    });

     it('Sub component <MetricsRow /> should exist.', () => {
         const data = [{title: 'Embrace the Ecosystem', value:'true'}];
        expect(wrapper.find(MetricsRow)).to.exist;
    });



  /*// Ne semble pas fonctionner.
   after(() => {
        wrapper.unmount();
    }); 

    it('The component should unmount.', () => {
        //expect(wrapper).to.not.contain(<MetricsTable columns={ cols }/>);
        expect(wrapper.state().nomEquipe).to.be.undefined;
    }); */
});
