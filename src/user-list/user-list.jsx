import React, { Component } from 'react';
import * as Database from '../Database';
import './user-list.css';

class UserList extends Component {
    state = {
        users: null,
        loading: true
    };
    subs = [];

    async componentDidMount() {
        const db = await Database.get();

        const sub = db.users.find({
            selector: {},
            sort: [
                { username: 'asc' }
            ]
        }).$.subscribe(users => {
            if (!users) {
                return;
            }
            console.log('reload users-list ');
            console.dir(users);
            this.setState({
                users,
                loading: false
            });
        });
        this.subs.push(sub);
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    deleteUser = async (user) => {
        console.log('delete user:');
        console.dir(user);
        await user.remove();
    }

    editUser = async (user) => {
        console.log('edit user:');
        console.dir(user);
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div id="list-box" className="box">
                <h3>Users</h3>
                {loading && <span>Loading...</span>}
                {!loading && users.length === 0 && <span>No users</span>}
                {!loading &&
                    <ul id="users-list">
                        {users.map(user => {
                            return (
                                <li key={user._id}>
                                    <div className="role-box" style={{
                                        background: user.role === 'admin' ? 'red' : 'blue'
                                    }}></div>
                                    <span className="username">
                                        {user._id}
                                    </span>
                                    <div className="actions">
                                        {/* <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editUser(user)}></i> */}
                                        <span className="delete fa fa-trash-o" aria-hidden="true" onClick={() => this.deleteUser(user)}>DELETE</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                }
            </div>
        );
    }
}

export default UserList;
