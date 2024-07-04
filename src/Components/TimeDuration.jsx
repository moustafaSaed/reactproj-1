import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


function TimeDuration({date}) {
    const { t, i18n } = useTranslation(); // new
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
                duration.years > 0 ? (<p> {i18n.language==='ar' && <span>منذ</span>} {duration.years}  {t('years')}</p>) : 
                    duration.months > 0 ? (<p> {i18n.language==='ar' && <span>منذ</span>} {duration.months} {t('months')}</p>) : 
                        duration.days > 0 ? (<p> {i18n.language==='ar' && <span>منذ</span>} {duration.days} {t('days')}</p>) : 
                            duration.hours > 0 ? (<p> {i18n.language==='ar' && <span>منذ</span>} {duration.hours} {t('hours')}</p>) : 
                                duration.minutes > 0 ? (<p> {i18n.language==='ar' && <span>منذ</span>} {duration.minutes} {t('minutes')}</p>) : (<p> منذ {duration.seconds} {t('seconds')}</p>)
            }
            
        </div>
    );
}

export default TimeDuration;