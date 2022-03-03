import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@material-ui/core';

const Form = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });
    const [submittedUser, setsubmittedUser] = useState([]);

    const onSubmit = (data) => {
        setsubmittedUser(data)
    }
    const { fields, append, remove } = useFieldArray({
        control,
        name: "user"
    });

    return (
        <>
        <div className="container d-flex justify-content-center my-4">
        <div className=" d-flex justify-content-center w-75 border border-dark" style={{backgroundColor:"blanchedalmond"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul >
                    {fields.map((item, index) => (
                        <li key={item.id} style={{ margin: "20px" }}>
                            <div style={{ display: "inline", margin: "10px" }}>
                                <input placeholder='First Name' {...register(`user.${index}.firstName`, { required: true, maxLength: 10, pattern: /^[A-Za-z]+$/i })} />
                            </div>
                            <div style={{ display: "inline", margin: "10px" }}>

                                <Controller
                                    render={({ field }) => <input placeholder='Last Name' {...field} {...register(`user.${index}.lastName`, { required: true, maxLength: 10, pattern: /^[A-Za-z]+$/i })} />}
                                    name={`user.${index}.lastName`}
                                    control={control}
                                />
                            </div>
                            <div style={{ display: "inline", margin: "10px" }}>

                                <Controller
                                    render={({ field }) => <input placeholder='Email' {...field} {...register(`user.${index}.email`, { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />}
                                    name={`user.${index}.email`}
                                    control={control}
                                />
                            </div>
                            <button className='mx-2'
                                type="button"
                                onClick={() => append({ firstName: "", lastName: "", email: "" })}
                            >
                                +
                            </button>
                    
                            <button className='mx-2' type="button" onClick={() => remove(index)}>-</button>
                        </li>
                    ))}
                    {errors.user && <p>Please check all the Fields{errors.user.firstName} </p>}
                </ul>
                {fields.length == 0 && <button className='mx-2'
                    type="button"
                    onClick={() => append({ firstName: "", lastName: "", email: "" })}
                >
                    New User
                </button>}
                <input className='w-10 bg-primary my-4 ml-20' type="submit" />
            </form>
            </div>
            </div>
            {submittedUser.user &&<table className="table table-primary my-4">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                     {submittedUser.user.map(({ firstName, lastName, email }, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td colSpan="1">{firstName}</td>
                                <td colSpan="1">{lastName}</td>
                                <td>{email}</td>
                            </tr>)
                    })}
                </tbody>
            </table>}

        </>
    )
}

export default Form