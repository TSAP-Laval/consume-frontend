import * as React from 'react';

import UserStore from './Store';
import { IUser } from "../../../models/DatabaseModels";
import CustomTable from "../../CustomTable/CustomTable";
import CustomRow from "../../CustomTable/CustomRow";
import Spinner from "../../Elements/Spinner";
import {CreateFetchUsersAction} from "../Actions/FetchUsers";
import AddButton from "../../Elements/AddButton";

import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Form from "../../Elements/Form";
import FormInput from "../../Elements/FormInput";
import Li from "../../Elements/Li";
import {CreateNewUserAction} from "../Actions/NewUser";
import LoginStore from "../../Login/Store";
import { Checkbox } from "material-ui";
import { ITeamSummary } from "../../../Models/DatabaseModelsSummaries";
import TeamStore from "../../Team/Stores/TeamStore";
import { CreateAssignTeamsAction } from "../Actions/AssignTeams";

export interface IUserListProps {}
export interface IUserListState {
    fetching?: boolean,
    users?: IUser[],
    open?: boolean,
    newUser?: IUser,
    addTeamIsOpen?: boolean,
    teams: Array<ITeamSummary>,
    listOfTeamsToAssign?: Array<number>,
    userIdToAssignTeams?: number
}

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

export default class UserList extends React.Component<IUserListProps, IUserListState> {

    constructor() {
        super();

        this.state = {
            fetching: UserStore.getFetching(),
            users: UserStore.getUsers(),
            open: false,
            addTeamIsOpen: false,
            teams: TeamStore.teamsList,
            newUser: {
                first_name: "",
                last_name: "",
                email: "",
                is_admin: false
            }
        };

        this.getFetching = this.getFetching.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleAddTeamsOpen = this.handleAddTeamsOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleAssignTeams = this.handleAssignTeams.bind(this);
        this.handleAddTeamsClose = this.handleAddTeamsClose.bind(this);

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeAdmin = this.changeAdmin.bind(this);
    }

    private getFetching() {
        this.setState({
            fetching: UserStore.getFetching()
        });
    }

    private getUsers() {
        this.setState({
            users: UserStore.getUsers()
        });
    }

    componentWillMount() {
        UserStore.on("fetchStatusChanged", this.getFetching);
        UserStore.on("usersChanged", this.getUsers);

        CreateFetchUsersAction(LoginStore.token);
    }

    private static getColumns(): String[][] {
        return [["Prénom"], ["Nom"], ["Courriel"], ["Administrateur"],["Actions"]];
    }

    private getUserRows(): any[] {
        return this.state.users.map((u, i) => {
            return <CustomRow key={i} data={[u.first_name, u.last_name, u.email, u.is_admin ? "Oui" : "Non", 
            <FlatButton primary={true} label="Assigner équipes" onClick={() => this.handleAddTeamsOpen(u.id)} />]}/>
        });
    }

    private static getTeamsColumns(): String[][] {
        return [["Nom d'équipe"], ["Ville"], ["Assigner"]];
    }

    private getTeamsRows(): any[] {
        return this.state.teams.map((t, i) => {
            return <CustomRow key={i} data={[t.name, t.city, 
            <Checkbox style={styles.checkbox} onCheck={() => this.handleCheck(t.id)} />]}/>
        });
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false,
            newUser: {
                first_name: "",
                last_name: "",
                email: "",
                is_admin: false
            }
        });
    }

    handleSave() {
        this.setState({
            open: false
        });
        CreateNewUserAction(this.state.newUser, LoginStore.token);
    }

     handleAssignTeams() {
        this.setState({
            addTeamIsOpen: false
        });
        CreateAssignTeamsAction(this.state.userIdToAssignTeams, 
        this.state.listOfTeamsToAssign, LoginStore.token);
    }

    handleAddTeamsOpen(id: number){
        this.setState({
            addTeamIsOpen: true,
            userIdToAssignTeams: id
        });
        console.log(this.state.userIdToAssignTeams);
    }

    handleAddTeamsClose() {
        this.setState({
            addTeamIsOpen: false,
            listOfTeamsToAssign: null
        });
    }

    handleCheck(id: number){
        let newArray = this.state.listOfTeamsToAssign.slice();
        newArray.push(id);
        this.setState({
            listOfTeamsToAssign: newArray
        });
        console.log(this.state.listOfTeamsToAssign);
    }

    private changeUserProperty(property: any, value: any) {
        let oldUser = this.state.newUser;
        (oldUser as any)[property] = value;

        this.setState({
            newUser: oldUser
        });
    }

    changeFirstName(e: any) {
        this.changeUserProperty('first_name', e.target.value);
    }

    changeLastName(e: any) {
        this.changeUserProperty('last_name', e.target.value);
    }

    changeEmail(e: any) {
        this.changeUserProperty('email', e.target.value);
    }

    changePassword(e: any) {
        this.changeUserProperty('password', e.target.value);
    }

    changeAdmin(e: any) {
        this.changeUserProperty('is_admin', e.target.checked);
    }

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Créer"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSave}
            />,
        ];

        const AddTeamActions =[
            <FlatButton
                label="Annuler"
                primary={true}
                onClick={this.handleAddTeamsClose}
            />,
            <FlatButton
                label="Ajouter"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleAssignTeams}
            />,
        ];

        if (!this.state.fetching) {
            return (
                <div>
                    <h2>Gestion des Utilisateurs</h2>

                    <Dialog
                        title="Nouvel Utilisateur"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                    <Form>
                        <ul>
                            <Li>
                                <FormInput
                                    floatingLabelText="Prénom"
                                    value={this.state.newUser.first_name}
                                    onChange={this.changeFirstName}
                                />
                                <FormInput
                                    floatingLabelText="Nom"
                                    value={this.state.newUser.last_name}
                                    onChange={this.changeLastName}
                                />
                            </Li>
                            <Li>
                                <FormInput
                                    floatingLabelText="Courriel"
                                    value={this.state.newUser.email}
                                    onChange={this.changeEmail}
                                />
                                <FormInput
                                    floatingLabelText="Mot de Passe"
                                    value={this.state.newUser.password}
                                    onChange={this.changePassword}
                                    type="password"
                                />
                            </Li>
                        </ul>
                        <Toggle
                            label="Administrateur"
                            onToggle={this.changeAdmin}
                            toggled={this.state.newUser.is_admin}
                        />
                    </Form>
                    </Dialog>
                   
                    <Dialog
                        title="Assigner l'utilisateur aux équipes"
                        actions={AddTeamActions}
                        modal={false}
                        open={this.state.addTeamIsOpen}
                        onRequestClose={this.handleClose}
                    >
                    <Form>

                    <CustomTable columns={UserList.getTeamsColumns()}>
                        {this.getTeamsRows()}
                    </CustomTable>
                    </Form>
                    </Dialog>

                     <CustomTable columns={UserList.getColumns()}>
                        {this.getUserRows()}
                        </CustomTable>
                    <AddButton onClick={this.handleOpen}/>
                </div>
            )
        } else {
            return <Spinner />
        }
    }

}
