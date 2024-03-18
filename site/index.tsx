import site from "./_config.ts";

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

export default function () {
  const sortedPages = site.pages.filter((page) => page.data.url.startsWith("/posts/")).sort(
    (a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    },
  )

  const sortedPageDates = sortedPages.map((page) => page.data.date.toISOString().slice(0, 10));

  const today = Temporal.Now.plainDateISO();
  const daysAgo = today.subtract({ years: 1 });

  let streak = 0;
  const History = getDatesBetween(daysAgo, today).map((date) => {

    if (date === null) {
      return <div className="day empty"></div>
    }

    if (sortedPageDates.includes(date)) {
      streak += 1;
      return (
        <a
          id={`activity-${date}`}
          className="day active"
          href={`/#post-${date}`}
        />
      )
    }

    streak = 0;
    return (
      <div
        id={`activity-${date}`}
        className="day"
      />
    )
  });


  return (
    <>
      <div className="meta">
        <div className="update-checker"></div>
        <div className="activity">
          <div className="graph">
            {History}
          </div>
          {streak > 1 ? (<p className="streak">{streak} day streak</p>) : ""}
        </div>
      </div>
      <div className="post-list">
        {sortedPages.map(
          (page) => {
            const paragraphs = (page.data.content as string).split("\n\n");

            return (
              <div key={page.data.url} className="post-card" id={`post-${page.data.basename}`}>
                <a href={`./posts/${page.data.basename}`}>
                  <h2 className="post-title">
                    {page.data.basename.replaceAll("-", ".")}
                    {page.data.title ? ` ${page.data.title}` : ""}
                  </h2>
                  <p>
                    {paragraphs[1].slice(undefined, 80).replace("\\n", "")}
                    {paragraphs[1].length > 80 || paragraphs.length > 2
                      ? "..."
                      : ""}
                  </p>
                </a>
              </div>
            );
          },
        )}
      </div>
    </>
  );
}
