import React  from 'react';
// import '../../../css/todo.css'
// @ts-ignore
import TimeDuration from './../../TimeDuration';

const Task = ({ title, subtitles, date, dir = 'ltr', comp}) => {
    return (
        <div dir={dir} className="task">
            <h2>
                {title}
                {comp&& <i style={{margin: '0 5px'}} className="fa-solid fa-check-double"></i>}
                </h2>
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