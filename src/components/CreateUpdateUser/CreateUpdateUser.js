import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {BsX} from "react-icons/bs";
import {joiResolver} from '@hookform/resolvers/joi';

import './CreateUpdateUser.css';
import {userService} from "../../servises/userService";
import {userValidation} from "../../validation/userValidation";

const CreateUpdateUser = ({user, getCreateUpdateData}) => {
    const {id, name, surname, rank} = user;

    const {register, setValue, handleSubmit, reset, formState: {errors}, clearErrors} = useForm({
        resolver: joiResolver(id ? userValidation.update : userValidation.save),
        mode: "onTouched",
    });

    useEffect(() => {

        if (id) {
            setValue('name', name);
            setValue('surname', surname);
            setValue('rank', rank);
        }

    }, [id]);

    const createUser = async (userData) => {
        const {data} = await userService.save(userData);
        getCreateUpdateData(data);
        toggleBtn();
        reset();
    };

    const updateUser = async (userData) => {
        const {data} = await userService.updateById(id, userData);
        getCreateUpdateData(data);
        toggleBtn();
        reset();
    };

    const toggleBtn = () => {
        const updateElement = document.getElementsByClassName('update-user')[0];
        updateElement.classList.toggle('update-user-show');
        getCreateUpdateData('close');
        clearErrors();
    };

    return (
        <div className={'update-user'}>
            {!id
                ? <h4>Create user</h4>
                : <h4>Update user</h4>}

            <form onSubmit={handleSubmit(id ? updateUser : createUser)}>

                <label>Name: <input type="text" {...register('name')}/></label>
                {errors.name && <span>( {errors.name.message} )</span>}

                <label>Surname: <input type="text" {...register('surname')}/></label>
                {errors.surname && <span>( {errors.surname.message} )</span>}

                <label>Rank: <input type="number" {...register('rank')}/></label>
                {errors.rank && <span>( {errors.rank.message} )</span>}

                <button>save</button>
            </form>
            <BsX onClick={toggleBtn} className={'toggle-btn'}/>
        </div>
    );
};

export {CreateUpdateUser};
