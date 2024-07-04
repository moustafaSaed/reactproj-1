import React, { useEffect, useState } from 'react';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Task from './Task';
import ReactLoading from 'react-loading';
import { db } from '../../../firebase/config';
import { t } from 'i18next';

const Tasks = ({ user }) => {
    const [arrange, setArrange] = useState('asc');
    const [initialQuery, setInitialQuery] = useState(query(collection(db, user.uid), orderBy("id", 'desc')));
    const [value, loading, error] = useCollection(initialQuery);
    // query(collection(db, user.uid), orderBy("id", arrange=="asc"?'asc':'desc'))
    // query(collection(db, user.uid), where("completed", "==", true))

    const [filterValue, setFilterValue] = useState('all');
    const [isActive, SetIsActive] = useState(true);
    const toggleActive = () => {
        SetIsActive(!isActive);
    }
    useEffect(() => {
        SetIsActive(false);
    }, [filterValue])
    const selectFunc = (e) => {
        {
            setFilterValue(e.target.value);
            if (e.target.value == 'all') {
                setInitialQuery(query(collection(db, user.uid), orderBy("id", 'desc')));
            } else if (e.target.value == 'comp') {
                setInitialQuery(query(collection(db, user.uid), where("completed", "==", true)));
            } else if (e.target.value == 'notcomp') {
                setInitialQuery(query(collection(db, user.uid), where("completed", "==", false)));
            }
        }
    }
    if (error) {
        return (
            <h1>Error Mous ::</h1>
        )
    }
    if (loading) {
        return (
                    <ReactLoading type={'bars'} color={'var(--brwn)'} height={100} width={100}/>
        )
    }
    if (value) {
        return (
            <>
                <div className="filter">
                    {filterValue == 'all' && (<div className={!isActive ? 'btn active' : 'btn'} onClick={() => { toggleActive(); setInitialQuery(query(collection(db, user.uid), orderBy("id", 'desc'))) }}>{t('newFirst')}</div>
                    )}
                    {filterValue == 'all' && (<div className={isActive ? 'btn active' : 'btn'} onClick={() => { toggleActive(); setInitialQuery(query(collection(db, user.uid), orderBy("id", 'asc'))) }}>{t('oldFirst')}</div>
                    )}
                    <select onChange={(e) => selectFunc(e)} value={filterValue} className='btn' name="" id="">
                        <option value="all">{t('allTasks')}</option>
                        <option value="comp">{t('compTasks')}</option>
                        <option value="notcomp">{t('notCompTasks')}</option>
                    </select>
                </div>
                <div className="tasks">
                    {value.docs.length == 0 && <h2>{t('noTasks')}</h2>}
                    {
                        value.docs.map((v, index) => {
                            return (
                                <Link className='task-link' key={index} to={`/taskinfo/${v.data().id}`}>
                                    <Task date={v.data().id} title={v.data().taskTitle} subtitles={v.data().subTasks} comp={v.data().completed} />
                                </Link>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default Tasks;