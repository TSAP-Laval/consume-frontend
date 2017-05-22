import * as React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

export interface IDataPanelProps {
    Header: string;
    Name: string;
}

const StyledPaper = styled(Paper)`
    max-width: 80%;
    margin: 0;
    margin-bottom: 4em;
    margin-left: auto;
    margin-right: auto;
`;

export class DataPanel extends React.Component<IDataPanelProps, any> {


    render() {
        return (
            <StyledPaper zDepth={3}>
                <AppBar showMenuIconButton={false} title={this.props.Header + ' - ' + this.props.Name} />
                {this.props.children}
            </StyledPaper>
        )
    }
}
