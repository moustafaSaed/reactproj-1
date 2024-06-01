import React from 'react';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Task from './Task';
import ReactLoading from 'react-loading';
import { db } from '../../../firebase/config';

const Tasks = ({ user }) => {
    const [value, loading, error] = useCollection(collection(db, user.uid));
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
    if (value) {
        return (
            <div className="tasks">
                {
                    value.docs.map((v,index) => {
                        return (
                            <Link key={index} to={`/taskinfo/${v.data().id}`}>
                                <Task date={v.data().id} title={v.data().taskTitle} subtitles={v.data().subTasks} />
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default Tasks;