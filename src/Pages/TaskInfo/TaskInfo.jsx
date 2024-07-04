import React, { useState } from 'react';
import '../../css/todo.css';
import Footer from './../../Components/General/Footer/Footer';
import Header from './../../Components/General/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../firebase/config';
import ReactLoading from 'react-loading';
import TaskInfoComp from './TaskInfoComp';

const TaskInfo = () => {
    const [user, loading, error] = useAuthState(auth);

    if (error) {
        return (
            <div className='task-info'>
                <Header />
                <main>
                    <div className="overlay">
                        <h1>Error Mous :: {error.message}</h1>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    if (loading) {
        return (
            <div className='task-info'>
                <Header />
                <main>
                    <div className="overlay">
                        <ReactLoading type={'balls'} color={'var(--brwn)'} height={100} width={100} />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    if (user) {
        return (
            <div className='task-info'>
                <Header />
                <TaskInfoComp user={user} />
                <Footer />
            </div>
        )
    }
}

export default TaskInfo;