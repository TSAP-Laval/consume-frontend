import * as React from 'react';

import BigContent from '../components/Elements/BigContent';
import UserList from "../components/User/UserList";

export interface IUsersProps {}
export interface IUsersState {}


export default class Users extends React.Component<IUsersProps, IUsersState> {

    constructor() {
        super();
    }

    render() {
        return (
            <BigContent>
                <UserList/>
            </BigContent>
        )
    }
}