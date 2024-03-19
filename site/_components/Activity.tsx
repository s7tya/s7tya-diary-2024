const getDatesBetween = (startDate: Temporal.PlainDate, endDate: Temporal.PlainDate): (string | null)[] => {
    const dateList = [];

    for (let i = 0; i < startDate.dayOfWeek; i++) {
        dateList.push(null)
    }

    for (let date = startDate; Temporal.PlainDate.compare(date, endDate) <= 0; date = date.add({ days: 1 })) {
        dateList.push(date.toString())
    }

    return dateList;
}

export const Activity = ({ dates }: { dates: (string | null)[] }) => {
    const today = Temporal.Now.plainDateISO("Asia/Tokyo").subtract({ days: 1 });
    const daysAgo = today.subtract({ years: 1 });

    let streak = 0;
    const History = getDatesBetween(daysAgo, today).map((date) => {

        if (date === null) {
            return <div key={`activity-${date}`} className="day empty"></div>
        }

        if (dates.includes(date)) {
            streak += 1;
            return (
                <a
                    key={`activity-${date}`}
                    id={`activity-${date}`}
                    className="day active"
                    href={`/#post-${date}`}
                />
            )
        }

        streak = 0;
        return (
            <div
                key={`activity-${date}`}
                id={`activity-${date}`}
                className="day"
            />
        )
    });

    return (
        <div className="activity">
            <div className="graph">
                {History}
            </div>
            {streak > 1 ? (<p className="streak">{streak} day streak</p>) : ""}
        </div>
    )
}