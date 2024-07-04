import { db } from '../../firebase/config';
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import TimeDuration from '../../Components/TimeDuration';
import { useTranslation } from 'react-i18next';

const TaskInfoComp = ({ user }) => {
    const { t, i18n } = useTranslation(); // new
    const inputElement = useRef(null);
    const [showContent, setShowContent] = useState(true);
    const go = useNavigate();
    const { id } = useParams(); // const name should be the same in app.jsx routes \:id
    const [value, loading, error] = useDocument(doc(db, user.uid, id));
    const [showHide, setShowHide] = useState('hide')
    const [subArr, setSubArr] = useState([]);
    // const [subArr, setSubArr] = useState(value.data().subTasks);
    const [newSub, setNewSub] = useState('');
    const [isEnable, setIsEnable] = useState(false);
    const [isComp, setIsComp] = useState("");
    const addBtn = useRef(null)

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Trigger button click here
            addBtn.current.click();
        }
    };

    const addSubFunc = () => {
        setSubArr([...subArr, newSub]);
        setNewSub('');
    }
    console.log(document.getElementById('completed'))
    if (loading) {
        <ReactLoading type={'bars'} color={'var(--brwn)'} height={100} width={100} />
    }
    if (value) {
        if (showContent) {
            return (
                <main className=''>
                    <div className="overlay">

                    {/* TITLE */}
                    <section className="title">
                        <h1>
                            <input ref={inputElement} onChange={async (e) => {
                                await updateDoc(doc(db, user.uid, id), {
                                    taskTitle: e.target.value,
                                });
                            }} className={`title-input ${isComp}`} type="text" defaultValue={value.data().taskTitle} />
                            {/* <input className='title-input' type="text" value={value.data().taskTitle}/> */}
                            <i className="fa-regular fa-pen-to-square" onClick={() => inputElement.current.focus()}></i>
                        </h1>
                    </section>
                    {/* TASKS */}
                    <section className="subtasks">
                        <div className="hd flx-between"> {/* top */}
                            <div className='flx-between'>
                                {i18n.language === "ar" && <p>تم الإنشـاء : </p> }
                                {i18n.language === "en" && <p>created : </p> }
                                <TimeDuration date={value.data().id} />
                                </div>
                            <div className='flx-between'>
                                {/* {value.data().completed && (<input checked type="checkbox" name="" id="completed" />)}
                                        {!value.data().completed && (<input type="checkbox" name="" id="completed" />)} */}
                                <input checked={value.data().completed} onChange={async (e) => {
                                    await updateDoc(doc(db, user.uid, id), {
                                        completed: e.target.checked,
                                    });
                                    setIsComp(value.data().completed ? '' : 'completed');
                                }} type="checkbox" name="" id="completed" />
                                {i18n.language === "ar" && <label htmlFor='completed'>انتهـت</label>}
                                {i18n.language === "en" && <label htmlFor='completed'>completed</label>}
                                
                            </div>
                        </div>
                        <ul className="subs">
                            {   
                                value.data().subTasks.map((item) => (
                                    (<li key={item} className='flx-between'>
                                        {item}
                                        {/* {!isEnable && <input readOnly type="text" defaultValue={item} />}
                                        {isEnable && <input type="text" onChange={() => { }} value={item} />} */}

                                        {/* <p>{item}</p> */}
                                        <div className="icns">
                                            {/* <i onClick={() => setIsEnable(!isEnable)} className="edit fa-regular fa-pen-to-square"></i> */}
                                            <i onClick={async () => await updateDoc(doc(db, user.uid, id), {
                                                subTasks: arrayRemove(item),
                                            })} className="delete fa-regular fa-square-minus"></i>
                                        </div>
                                    </li>)
                                ))
                            }
                            
                            <li className={`flx-between edit-li ${showHide}`}>
                                <input className='edit-inp' type="text" onChange={(e) => setNewSub(e.target.value)} value={newSub} onKeyUp={handleEnterKeyPress}/>
                                <div className="edit-btns flx-between">
                                    <div onClick={async () => {
                                        await updateDoc(doc(db, user.uid, id), {
                                            subTasks: arrayUnion(newSub),
                                        });
                                        setShowHide('hide');
                                    }} className="btn add" ref={addBtn}>{t('add')}</div>
                                    <div onClick={() => setShowHide('hide')} className="btn cancel">{t('cancel')}</div>
                                </div>
                            </li>
                        </ul>
                    </section>
                    {/* BUTTONS */}
                    <section className="btns">
                        <div onClick={() => setShowHide('show')} className="btn flx-center">
                            {i18n.language === "ar" && <p>أضِف المزيد</p>}
                            {i18n.language === "en" && <p>add more</p>}
                        </div>

                        <div onClick={async () => {
                            setShowContent(false);
                            await deleteDoc(doc(db, user.uid, id));
                            go("/todo", { replace: true });
                        }} className="btn danger-btn">
                            {i18n.language === "ar" && <p>مسـح</p>}
                            {i18n.language === "en" && <p>delete</p>}
                            
                        </div>
                    </section>
                    </div>
                </main >
            )
        }
        if (!showContent) {
            return (
                <div className="flx-center" style={{ height: '100vh' }}>
                    <ReactLoading type={'cubes'} color={'var(--brwn)'} height={50} width={50} />
                </div>
            )
        }

    }
    // console.log(value.data().subTasks)

}


export default TaskInfoComp;