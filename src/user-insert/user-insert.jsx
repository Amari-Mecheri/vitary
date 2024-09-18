import React, { Component } from 'react';
import * as Database from '../Database';

class UserInsert extends Component {
    state = {
        username: '',
        role: ''
    }
    subs = []

    addUser = async (event) => {
        event.preventDefault();
        const { username, role } = this.state;
        const db = await Database.get();

        const addData = {
            _id: username,
            role
        };
        await db.users.insert(addData);
        this.setState({
            username: '',
            role: ''
        });
    }
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handleRoleChange = (event) => {
        this.setState({ role: event.target.value });
    }

    render() {
        return (
            <div id="insert-box" className="box">
                <h3>Add User</h3>
                <form onSubmit={this.addUser}>
                    <input name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                    <input name="role" type="text" placeholder="Role" value={this.state.role} onChange={this.handleRoleChange} />
                    <button type="submit">Insert a User</button>
                </form>
            </div>
        );
    }
}

export default UserInsert;
