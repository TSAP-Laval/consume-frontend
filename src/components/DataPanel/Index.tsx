import * as React from 'react';
import Styled from 'styled-components';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

export interface IDataPanelProps {
    Header: string;
    PlayerName: string;
}

const StyledPaper = Styled(Paper)`
    max-width: 60%;
    margin: 0;
    margin-bottom: 4em;
    margin-left: auto;
    margin-right: auto;
`;

export class DataPanel extends React.Component<IDataPanelProps, any> {


    render() {
        return (
            <StyledPaper zDepth={3}>
                <AppBar showMenuIconButton={false} title={this.props.Header + ' - ' + this.props.PlayerName} />
                {this.props.children}
            </StyledPaper>
        )
    }
}
