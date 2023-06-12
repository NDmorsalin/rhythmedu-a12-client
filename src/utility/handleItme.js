const utcTimeSendToDb = () => {
    const currentDate = new Date();
    const utcDate = new Date(
        currentDate.getTime() + currentDate.getTimezoneOffset() * 60000
    );
    const utcTimeString = utcDate.toUTCString();
    return utcTimeString
}

const utcToLocalTime = (storedTime) => {


    const storedDate = new Date(storedTime);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const userDate = new Date(
        storedDate.toLocaleString("en-US", { timeZone: userTimezone })
    );
    return userDate
}

export { utcTimeSendToDb, utcToLocalTime }