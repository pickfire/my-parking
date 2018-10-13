module.exports = { roundOff, formatFloat, formatHourMinute }

function roundOff(n, p) {
    try {
        const n1 = n * Math.pow(10, p + 1);
        const n2 = Math.floor(n1 / 10);
        if (n1 >= (n2 * 10 + 5)) {
            return (n2 + 1) / Math.pow(10, p);
        }
        return n2 / Math.pow(10, p);
    } catch (err) {
        return 0;
    }
}

function formatFloat(n, p, textIfNull = null) {
    let formatted = roundOff(n, p).toFixed(p);
    if (textIfNull == null) {
        return formatted;
    }
    return formatted == '0' ? textIfNull : formatted;
}

function formatHourMinute(duration = 0, textIfNull = "0hr") {

    if (!Boolean(duration) || duration == 0) {
        return textIfNull;
    }

    let fractionalHour = duration % 1;
    let hours = Math.floor(duration).toString();
    let minutes = formatFloat(fractionalHour * 60, 0);
    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }

    return hours + "hr " + minutes + "min";
}