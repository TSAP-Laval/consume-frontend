import { expect } from 'chai';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

require('../sass/Team.scss');

import GenericMetricsView from '../GenericMetricsView';
import MetricsTable from "../MetricsTable";
import Team from "../../../pages/Team";

describe('Main GenericMetricsView component test suite.', () => {
    it('Should contains an <MetricsTable /> component', () => {
        const wrapper = shallow(<GenericMetricsView teamID={3}/>);
         expect(wrapper.find(MetricsTable)).to.have.length(1);
    });
});