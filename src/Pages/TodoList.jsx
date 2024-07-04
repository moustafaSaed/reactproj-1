import React, { useEffect, useState } from 'react';
import '../css/todo.css'
import Header from './../Components/General/Header/Header';
import Footer from './../Components/General/Footer/Footer';
import { doc, setDoc } from "firebase/firestore"; // level three 
import { auth, db } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactLoading from 'react-loading';
import Tasks from './../Components/General/Todo/Tasks';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';


const TodoList = () => {
    const { t, i18n } = useTranslation(); // new
    const [user, loading, error] = useAuthState(auth);
    const [showHide, setShowHide] = useState('hide');
    const [subArr, setSubArr] = useState([]);
    const [subTaskValue, setSubTaskValue] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sbmtMess, setSbmtMess] = useState('hide');
    const go = useNavigate();


    // useEffect(() => {
    //     if (!user) {
    //         console.log("failed");
    //         go('/');
    //     } else {
    //         console.log("success")
    //     }
    // }, [user]);
    if (error) {
        return (
            <h1>Error {error.message}</h1>
        )
    }
    if (loading) {
        return (
            <main>
                <div className="overlay flx-center" style={{height:'100vh'}}>
                    <ReactLoading type={'spin'} color={'#795548'} height={100} width={100}/>
                </div>
            </main>
        )
    }
    if (user) {
        if(!user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        {i18n.language === 'en' && <title>Muslim | Home</title>}
                        {i18n.language === 'ar' && <title>مُـسـلِـم  |  الرئيسية</title>}
                    </Helmet>
                    <Header />
                    <main>
                        <div className='preLogin not-verify overlay flx-center'>
                            <h1>{t('hello')} {user.displayName}</h1>
                            {i18n.language == 'en' && <p className='info'>please verify your email firstly <i className="fa-solid fa-circle-info"></i></p>}
                            {i18n.language == 'ar' && <p className='info'>أرجوك قُم بتأكيد إيميلك أولاً<i className="fa-solid fa-circle-info"></i></p>}
                            <div className='note'>{t("verMess")}</div>
                            <div className="btn">
                                {i18n.language == 'en' && <p>ٌResend Email Verif.</p>}
                                {i18n.language == 'ar' && <p>إعادة إرسال رسالة التأكيد</p>}
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            )
        }
        if (user.emailVerified) {
            return (
                <>
                    <Helmet>
                        {i18n.language === 'en' && <title>Muslim | TodoList</title>}
                        {i18n.language === 'ar' && <title>مُـسـلِـم  |  قائمة المهام</title>}
                    </Helmet>
                    <Header />
                    <main className='todo'>
                        <div className="overlay container">
                            <h1>{t('todoList')}</h1>
                            {/* filter was here */}
                            <Tasks user={user} />
                            <div onClick={() => setShowHide('show')} className="btn add-task flx-between">
                                <p>{t('addNewTask')}</p>
                                <i className="fa-solid fa-circle-plus"></i>
                            </div>
    
                            <form className={`add-task-form ${showHide}`}>
                                <i onClick={() => setShowHide('hide')} className="fa-solid fa-xmark"></i>
                                {/* <div className='isArabic flx-center'><p>if the task in arabic, click here</p> <button className="btn">Ar</button></div> */}
                                <input value={taskTitle} type="text" placeholder='Task Title' onChange={(e) => setTaskTitle(e.target.value)} /><br />
                                <div>
                                    <input value={subTaskValue} type="text" placeholder='Sub Task' onChange={(e) => setSubTaskValue(e.target.value)} />
                                    <input onClick={(e) => {
                                        e.preventDefault();
                                        subArr.includes(subTaskValue) ? "" : setSubArr([...subArr, subTaskValue]);
                                        setSubTaskValue('');
                                    }} className='btn add' type="button" value={t('add')} />
                                </div>
                                <ul className="sub-res">
                                    {subArr.map((el, index) => (<li key={index}>
                                        {el}
                                        <i onClick={() => setSubArr(subArr.filter((a) => a !== el))} className="fa-solid fa-xmark"></i>
                                    </li>))}
                                </ul>
                                {/* Submit Button */}
                                <button onClick={async (e) => {
                                    e.preventDefault();
    
                                    console.log("waiting  ...");
                                    setIsLoading(true);
    
                                    const taskId = new Date().getTime();
                                    await setDoc(doc(db, user.uid, `${taskId}`), {
                                        taskTitle: taskTitle,
                                        subTasks: subArr,
                                        id: taskId,
                                        completed: false,
                                    });
                                    setSbmtMess('show');
                                    setTimeout(() => {
                                        setSbmtMess('hide');
                                    }, 2000);
                                    console.log("-----  Done  ------");
                                    setIsLoading(false);
                                    setTaskTitle('');
                                    setSubTaskValue('');
                                    setSubArr([]);
                                    setShowHide('hide');
                                }} className='btn sub'>
                                    {isLoading ? (<div className='flx-center'><ReactLoading type={'bubbles'} color={'#795548'} height={15} width={15} /></div>) : t('submit')}
                                </button>
                            </form>
                            <p className={`show-mess flx-between ${sbmtMess}`}>
                                {i18n.language === 'en' && <p>task added successfuly</p>}
                                {i18n.language === 'ar' && <p>أُضيفت المُهمّة بنجاح</p>}
                                <i className="fa-regular fa-circle-check"></i>
                            </p>
                        </div>
                    </main>
                    <Footer />
                </>
            )
        }
    }

}

export default TodoList;