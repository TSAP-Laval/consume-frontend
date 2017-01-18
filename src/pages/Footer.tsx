import * as React from "react";

export interface ILayoutProps {}

export interface ILayoutState {}

export class Footer extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p>Créé par Gabriel, William, Anthony et Loic</p>
            </div>
        );
    }
}