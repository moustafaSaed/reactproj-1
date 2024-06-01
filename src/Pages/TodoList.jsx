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


const TodoList = () => {
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
if(error){
    return (
        <h1>Error {error.message}</h1>
    )
}
if(loading){
    return (
        <h1>Loading ...</h1>
    )
}
if(user){
    return (
        <>
            <Header />
            <main className='todo container'>
                <h1>todo list</h1>
                <div className="filter">
                    <div className="btn">newest first</div>
                    <div className="btn">oldest first</div>
                    <select className='btn' name="" id="">
                        <option value="all">all tasks</option>
                        <option value="comp">completed</option>
                        <option value="notcomp">not completed</option>
                    </select>
                </div>
                <Tasks user={user}/>
                <div onClick={() => setShowHide('show')} className="btn add-task flx-between">
                    <p>add new task</p>
                    <i className="fa-solid fa-circle-plus"></i>
                </div>

                <form className={`add-task-form ${showHide}`}>
                    <i onClick={() => setShowHide('hide')} className="fa-solid fa-xmark"></i>
                    <input value={taskTitle} type="text" placeholder='task title' onChange={(e)=> setTaskTitle(e.target.value)}/><br />
                    <div>
                        <input value={subTaskValue} type="text" placeholder='sub task' onChange={(e) => setSubTaskValue(e.target.value)} />
                        <input onClick={(e) => {
                            e.preventDefault();
                            subArr.includes(subTaskValue)? "" : setSubArr([...subArr, subTaskValue]);
                            setSubTaskValue('');
                        }} className='btn add' type="button" value="add" />
                    </div>
                    <ul className="sub-res">
                        {subArr.map((el, index) => (<li key={index}>
                            {el}
                            <i onClick={() => setSubArr(subArr.filter((a) => a !== el))} className="fa-solid fa-xmark"></i>
                        </li>))}
                    </ul>
                    {/* Submit Button */}
                    <button onClick={ async (e) => {
                        e.preventDefault();

                        console.log("waiting  ...");
                        setIsLoading(true);

                        const taskId = new Date().getTime();
                        await setDoc(doc(db, user.uid, `${taskId}` ), {
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
                        {isLoading? (<ReactLoading type={'spin'} color={'white'} height={15} width={15} />): 'submit'}
                        
                    </button>
                </form>
                <p className={`show-mess ${sbmtMess}`}>
                    task added successfuly
                    <i className="fa-regular fa-circle-check"></i>
                    </p>
            </main>
            <Footer />
        </>
    )
}
    
}

export default TodoList;