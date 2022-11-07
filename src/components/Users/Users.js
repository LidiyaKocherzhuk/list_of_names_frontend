import React, {useEffect, useState} from 'react';
import {FiEdit3} from "react-icons/fi";
import {BsPlusSquareDotted, BsTrash} from "react-icons/bs";

import './Users.css';
import {userService} from "../../servises/userService";
import {CreateUpdateUser} from "../CreateUpdateUser/CreateUpdateUser";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [updateUser, setUpdateUser] = useState({});

    useEffect(() => {
        userService.getAll()
            .then(response => setUsers(response.data));
    }, []);


    const [dragElementIndex, setDragElementIndex] = useState(0);

    const dragStartHandler = (e, item, index) => {
        setDragElementIndex(index);
    }

    const dragLeaveHandler = (e) => {
        e.target.style.background = 'none'
        e.target.style.opacity = 1

    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        if (e.target) {
            e.target.style.opacity = 0
        }
    }

    const dropHandler = async (e, item, index) => {
        e.preventDefault();
        e.target.style.background = 'none'
        e.target.style.opacity = 1


        const listArr = users.slice();
        const [cutObj] = listArr.splice(dragElementIndex, 1);
        listArr.splice(index, 0, cutObj);

        const sortArr = users.map((listItem, index) => {
            const findElement = listArr.find((item, i) => index === i);
            return {...findElement, rank: listItem.rank};
        })

        setUsers(sortArr);

        const {data} = await userService.updateByRank(sortArr);
        setUsers(data);

    }

    const createUser = () => {
        const updateElement = document.getElementsByClassName('update-user')[0];
        updateElement.classList.toggle('update-user-show');
    }

    const editUser = async (e, user) => {
        setUpdateUser(user);
        const updateElement = document.getElementsByClassName('update-user')[0];
        updateElement.classList.toggle('update-user-show');
    }

    const getCreateUpdateData = (data) => {
        if (typeof data === 'object') {
            setUsers(data);
        }
        setUpdateUser({});
    };

    const deleteUser = async (id, index) => {

        const listArr = users.slice();
        listArr.splice(index, 1);
        setUsers(listArr);

        const {data} = await userService.deleteById(id);
        setUsers(data);
    }

    return (
        <div className={'layout'}>

            <div className={'users'}>
                <h3>User List</h3>

                <div className={'add-user'}>
                    <span>Add new user</span>
                    <BsPlusSquareDotted
                        onClick={createUser}
                        className={'add-user-btn'}
                    />

                </div>

                <table>

                    <tbody>
                    <tr>
                        <th>
                            rank
                        </th>
                        <th>
                            name
                        </th>
                        <th>
                            id
                        </th>
                        <th>
                            update
                        </th>
                        <th>
                            delete
                        </th>
                    </tr>

                    {users.map((user, index) =>

                        <tr key={user.id} className={'user-row'}>

                            <td className={'rank'}>
                                {user.rank}
                            </td>

                            <td className={'user-name drop-item'}
                                onDragStart={(e) => dragStartHandler(e, user, index)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, user, index)}
                                draggable={true}
                            >
                                {user.name} {user.surname}
                            </td>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                <FiEdit3 onClick={(e) => editUser(e, user)}
                                         className={'swg-btn'}
                                />
                            </td>
                            <td>
                                <BsTrash onClick={() => deleteUser(user.id, index)}
                                         className={'swg-btn'}
                                />
                            </td>

                        </tr>
                    )}
                    </tbody>

                </table>
            </div>

            <CreateUpdateUser user={updateUser} getCreateUpdateData={getCreateUpdateData}/>
        </div>
    );
};

export {Users};
