import React, { useState } from 'react';
import '../../css/todo.css';
import Footer from './../../Components/General/Footer/Footer';
import Header from './../../Components/General/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../firebase/config';
import  ReactLoading  from 'react-loading';
import TaskInfoComp from './TaskInfoComp';

const TaskInfo = () => {
    const [user, loading, error] = useAuthState(auth);
    
    if (error) {
        return (
            <h1>Error Mous ::</h1>
        )
    }
    if (loading) {
        return (
            <ReactLoading type={'spin'} color={'#009688'} height={100} width={100} />
        )
    }
    if (user) {
        return (
            <div className='task-info'>
                <Header />
                <TaskInfoComp user={user}/>
                <Footer />
            </div>
        )
    }
}

export default TaskInfo;