import * as React from "react";

import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from 'material-ui/svg-icons/content/add';
import {EventHandler} from "react";

const style: any = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

interface IAddButtonProps {
    onClick: any
}

export default class AddButton extends React.Component<IAddButtonProps, any> {
    render() {
        return (
            <FloatingActionButton onClick={this.props.onClick} style={style} >
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}
