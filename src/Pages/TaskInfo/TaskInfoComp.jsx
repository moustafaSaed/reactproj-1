import { db } from '../../firebase/config';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import TimeDuration from '../../Components/TimeDuration';

const TaskInfoComp = ({ user }) => {
    const { id } = useParams(); // const name should be the same in app.jsx routes \:id
    const [value, loading, error] = useDocument(doc(db, user.uid, id));
    const [showHide, setShowHide] = useState('hide')
    const [subArr, setSubArr] = useState([]);
    // const [subArr, setSubArr] = useState(value.data().subTasks);
    const [newSub, setNewSub] = useState('');
    const [isEnable, setIsEnable] = useState(false);

    const addSubFunc = () => {
        setSubArr([...subArr, newSub]);
        setNewSub('');
    }
    console.log(document.getElementById('completed'))
    if (loading) {
        <ReactLoading type={'spin'} color={"white"} height={100} width={100} />
    }
    if (value) {
        console.log(value.data().taskTitle);
        return (
            <main className='container'>
                {/* TITLE */}
                <section className="title">
                    <h1>
                        <input onChange={async (e) => {
                            await updateDoc(doc(db, user.uid, id), {
                                taskTitle: e.target.value,
                            });
                        }} className='title-input' type="text" defaultValue={value.data().taskTitle} />
                        {/* <input className='title-input' type="text" value={value.data().taskTitle}/> */}
                        <i className="fa-regular fa-pen-to-square"></i>
                    </h1>
                </section>
                {/* TASKS */}
                <section className="subtasks">
                    <div className="hd flx-between"> {/* top */}
                        <div className='flx-between'><p>created : </p> <TimeDuration date={value.data().id} /></div>
                        <div className='flx-between'>
                            {/* {value.data().completed && (<input checked type="checkbox" name="" id="completed" />)}
                                    {!value.data().completed && (<input type="checkbox" name="" id="completed" />)} */}
                            <input checked={value.data().completed} onChange={async (e) => {
                                await updateDoc(doc(db, user.uid, id), {
                                    completed: e.target.checked,
                                });
                            }} type="checkbox" name="" id="completed" />
                            <label htmlFor='completed'>completed</label>
                        </div>
                    </div>
                    <ul className="subs">
                        {
                            value.data().subTasks.map((item) => (
                                (<li key={item} className='flx-between'>
                                    {!isEnable && <input readOnly type="text" defaultValue={item} />}
                                    {isEnable && <input type="text" onChange={() => { }} value={item} />}

                                    {/* <p>{item}</p> */}
                                    <div className="icns">
                                        <i onClick={() => setIsEnable(!isEnable)} className="edit fa-regular fa-pen-to-square"></i>
                                        <i onClick={async () => await updateDoc(doc(db, user.uid, id), {
                                            subTasks: arrayRemove(item),
                                        })} className="delete fa-regular fa-square-minus"></i>
                                    </div>
                                </li>)
                            ))
                        }
                        <li className={`flx-between edit-li ${showHide}`}>
                            <input className='edit-inp' type="text" onChange={(e) => setNewSub(e.target.value)} value={newSub} />
                            <div className="edit-btns flx-between">
                                <div onClick={async() => {
                                    await updateDoc(doc(db, user.uid, id), {
                                        subTasks: arrayUnion(newSub),
                                    });
                                    setShowHide('hide');
                                }} className="btn add">add</div>
                                <div onClick={() => setShowHide('hide')} className="btn cancel">cancel</div>
                            </div>
                        </li>
                    </ul>
                </section>
                {/* BUTTONS */}
                <section className="btns">
                    <div onClick={() => setShowHide('show')} className="btn flx-between">
                        <p>add more</p>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="btn danger-btn">
                        <p>delete</p>
                    </div>
                </section>
            </main >
        )
    }
    // console.log(value.data().subTasks)

}


export default TaskInfoComp;