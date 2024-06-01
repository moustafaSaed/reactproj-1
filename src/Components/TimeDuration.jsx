import React, { useState, useEffect } from 'react';


function TimeDuration({date}) {
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const timestamp = date;

        const calculateDuration = () => {
            const currentDate = new Date();
            const previousDate = new Date(timestamp);
            const timeDifference = currentDate.getTime() - previousDate.getTime();

            // Calculate the time differences in different units
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(months / 12);

            // Create a duration object with the calculated values
            const duration = {
                years,
                months: months % 12,
                days: days % 30,
                hours: hours % 24,
                minutes: minutes % 60,
                seconds: seconds % 60
            };
            setDuration(duration);
        };

        calculateDuration();
    }, []);

    if (!duration) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {
                duration.years > 0 ? (<p>{duration.years} years ago</p>) : 
                    duration.months > 0 ? (<p>{duration.months} months ago</p>) : 
                        duration.days > 0 ? (<p>{duration.days} days ago</p>) : 
                            duration.hours > 0 ? (<p>{duration.hours} hours ago</p>) : 
                                duration.minutes > 0 ? (<p>{duration.minutes} minutes ago</p>) : (<p>{duration.seconds} seconds ago</p>)
            }
            
        </div>
    );
}

export default TimeDuration;