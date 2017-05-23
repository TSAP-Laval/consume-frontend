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
import TeamStore from "../../Team/Stores/TeamStore";
import Checkbox from "material-ui/Checkbox";

export interface IUserListProps {}
export interface IUserListState {
    fetching?: boolean,
    users?: IUser[],
    open?: boolean,
    newUser?: IUser,
    checkedTeams?: number[],
    firstNameError?:string,
    lastNameError?:string,
    emailError?:string,
    passwordError?: string,
    emailIsInvalid?: boolean

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
            newUser: {
                first_name: "",
                last_name: "",
                email: "",
                is_admin: false
            },
            checkedTeams: [],
             firstNameError: "",
            lastNameError:"",
            emailError:"",
            passwordError: "",
            emailIsInvalid: false
        };

        this.getFetching = this.getFetching.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeAdmin = this.changeAdmin.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

        this.getTeamsRows = this.getTeamsRows.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
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

    componentWillUnmount() {
        UserStore.removeListener("fetchStatusChanged", this.getFetching);
        UserStore.removeListener("usersChanged", this.getUsers);
    }

    private static getColumns(): String[][] {
        return [["Prénom"], ["Nom"], ["Courriel"], ["Administrateur"]];
    }

    private getUserRows(): any[] {
        return this.state.users.map((u, i) => {
            return <CustomRow key={i} data={[u.first_name, u.last_name, u.email, u.is_admin ? "Oui" : "Non"]}/>
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
            },
            checkedTeams: []
        });
    }

    handleSave() {
        if(this.state.emailIsInvalid || this.state.newUser.password.trim().length < 4 ||
         this.state.newUser.first_name.trim().length == 0 || this.state.newUser.last_name.trim().length == 0)
            return;

        this.setState({
            open: false
        });
        CreateNewUserAction(this.state.newUser, this.state.checkedTeams, LoginStore.token);
    }

    private changeUserProperty(property: any, value: any) {
        let oldUser = this.state.newUser;
        (oldUser as any)[property] = value;

        this.setState({
            newUser: oldUser
        });
    }

    //In this case validate firstname and lastname should 
    //be done in the same function. Anyway...
    changeFirstName(e: any) {
        this.changeUserProperty('first_name', e.target.value);
        this.setState({firstNameError: ""});
    }

    changeLastName(e: any) {
        this.changeUserProperty('last_name', e.target.value);
        this.setState({lastNameError: ""});
    }

    changeEmail(e: any) {
        this.changeUserProperty('email', e.target.value);
        this.setState({emailError: ""});
    }

    changePassword(e: any) {
        this.changeUserProperty('password', e.target.value);
        this.setState({passwordError: ""});
    }

    changeAdmin(e: any) {
        this.changeUserProperty('is_admin', e.target.checked);
    }

    validateFirstName(){
        if(this.state.newUser.first_name.trim().length == 0){
            this.setState({firstNameError: "Le champ prénom est requis"})
        }
        else{
            this.setState({firstNameError: ""})
        }
    }

     validateLastName(){
        if(this.state.newUser.last_name.trim().length == 0){
            this.setState({lastNameError: "Le champ prénom est requis"})
        }
        else{
            this.setState({lastNameError: ""})
        }
    }

    validateEmail(){
        let regex  = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        if(this.state.newUser.email.trim().length == 0){
            this.setState({emailError: "Le champ courriel est requis.",
            emailIsInvalid: true})

        } else if (!this.state.newUser.email.match(regex)) {
            this.setState({emailError: "Veuillez entrer un courriel valide.", 
            emailIsInvalid: true})
        } 
        else{
            this.setState({emailError: '', emailIsInvalid: false})
        }
    }

    validatePassword(){
        if(this.state.newUser.password.trim().length == 0){
            this.setState({passwordError: "Le champ mot de passe est requis."})

        } else if(this.state.newUser.password.trim().length < 4){
            this.setState({passwordError: "Le champ mot de passe doit avoir au moins 4 caractères."})
        }    
        else{
            this.setState({passwordError: ''})
        }
    }

    private static getTeamsColumns(): String[][] {
        return [["Nom d'équipe"], ["Ville"], ["Assigner"]];
    }

    private getTeamsRows(): any[] {
        return TeamStore.teamsList.map((t, i) => {
            return <CustomRow key={i} data={[t.name, t.city,
                <Checkbox style={styles.checkbox} onCheck={() => this.handleToggle(t.id)} />]}/>
        });
    }

    private handleToggle(teamID: number) {
        let oldTeams = this.state.checkedTeams.slice();
        if (oldTeams.indexOf(teamID) === -1) {
            oldTeams.push(teamID);
        } else {
            oldTeams.splice(oldTeams.indexOf(teamID), 1);
        }

        this.setState({
            checkedTeams: oldTeams
        });
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
                                    errorText={this.state.firstNameError}
                                    onBlur={this.validateFirstName}
                                />
                                <FormInput
                                    floatingLabelText="Nom"
                                    value={this.state.newUser.last_name}
                                    onChange={this.changeLastName}
                                    errorText={this.state.lastNameError}
                                    onBlur={this.validateLastName}
                                />
                            </Li>
                            <Li>
                                <FormInput
                                    floatingLabelText="Courriel"
                                    value={this.state.newUser.email}
                                    onChange={this.changeEmail}
                                    errorText={this.state.emailError}
                                    onBlur={this.validateEmail}

                                />
                                <FormInput
                                    floatingLabelText="Mot de Passe"
                                    value={this.state.newUser.password}
                                    onChange={this.changePassword}
                                    type="password"
                                    errorText={this.state.passwordError}
                                    onBlur={this.validatePassword}
                                />
                            </Li>
                        </ul>
                        <Toggle
                            label="Administrateur"
                            onToggle={this.changeAdmin}
                            toggled={this.state.newUser.is_admin}
                        />
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
