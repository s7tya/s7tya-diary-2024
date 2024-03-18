import site from "./_config.ts";


const getDatesBetween = (startDate: Temporal.ZonedDateTime, endDate: Temporal.ZonedDateTime): (Date | null)[] => {
  const dateList = [];

  for (let i = 0; i < startDate.dayOfWeek; i++) {
    dateList.push(null)
  }

  for (let date = startDate; Temporal.ZonedDateTime.compare(date, endDate); date = date.add({ days: 1 })) {
    const dateObject = new Date(date.toInstant().toString());
    dateList.push(dateObject);
  }

  return dateList;
}

export default function () {
  const sortedPages = site.pages.filter((page) => page.data.url.startsWith("/posts/")).sort(
    (a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    },
  )

  const sortedPageDates = sortedPages.map((page) => page.data.date.toISOString());

  const todayAtUTC = Temporal.Now.zonedDateTimeISO('Utc').with({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const DaysAgoAtUTC = todayAtUTC.subtract({ years: 1 });

  const History = getDatesBetween(DaysAgoAtUTC, todayAtUTC).map((date) => {

    if (date === null) {
      return <div className="day empty"></div>
    }

    return (
      <a
        id={`activity-${date.toISOString()}`}
        className={`day${sortedPageDates.includes(date.toISOString()) ? " active" : ""}`}
        href={`/#post-${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getDate()}`}
      >
      </a>
    )
  });


  return (
    <>
      <div className="meta">
        <div className="update-checker"></div>
        <div className="activity">
          {History}
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
