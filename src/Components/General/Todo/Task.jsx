import React from 'react';
// import '../../../css/todo.css'
// @ts-ignore
import TimeDuration from './../../TimeDuration';

const Task = ({ title, subtitles, date, dir = 'ltr' }) => {
    return (
        <div dir={dir} className="task">
            <h2>{title}</h2>
            <ul>
                {
                    subtitles.map((sub => (<li key={sub}>{sub}</li>)))
                }
            </ul>
            <div className="date">
                <TimeDuration date={date}/>
            </div>
        </div>
    )
}

export default Task;