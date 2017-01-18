import * as React from "react";

export interface ILayoutProps {
    title: string
}

export interface ILayoutState {
    title: string
}

export class Header extends React.Component<ILayoutProps, ILayoutState> {

    render() {
        // Le titre qui vient de l'index.
        // var title = this.props.title;
        return (
            <header><h1>{this.props.title}</h1></header>
        );
    }
}