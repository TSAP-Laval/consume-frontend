import * as React from 'react';

import Paper from 'material-ui/Paper';

import AppBar from 'material-ui/AppBar';

export interface IDataPanelProps {
    Header: string;
    PlayerName: string;
}

export class DataPanel extends React.Component<IDataPanelProps, any> {


    render() {
        return (
            <Paper className="data-panel" zDepth={3}>
                <AppBar showMenuIconButton={false} title={this.props.Header + ' - ' + this.props.PlayerName} />
                {this.props.children}
            </Paper>
        )
    }
}
