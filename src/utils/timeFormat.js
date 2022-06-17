const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Time formating for every single message
export function timeFormat(time) {
  const newTime = new Date(time).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  return newTime;
}

// date formating funtion
function getFormattedDateTime(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = hours < 12 ? 'AM' : 'PM';
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }
  if (hours > 12) {
    period = 'PM'
    hours = hours - 12;
  }
  if (hours < 10) {
    hours = `0${hours}`
  }

  if (prefomattedDate) {
    if (prefomattedDate === 'Today') {
      return `${hours}:${minutes} ${period}`;
    } else if (prefomattedDate === 'Week') {
      return date.toLocaleDateString(undefined, { weekday: 'long' })
    }
    return `${prefomattedDate}`;
  }

  if (hideYear) {
    return `${day} ${month}`;
  }
  return `${day} ${month} ${year}`;
}

// Date and time formating function for conversations list
export function conversationTimeFormat(dateParam, getToday = false) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const isToday = today.toDateString() === date.toDateString();
  const isThisWeek = Math.abs(today - date) < 604800001
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (isToday) {
    if (getToday) {
      return 'Today';
    }
    return getFormattedDateTime(date, 'Today'); //  10:20 AM
  } else if (isYesterday) {
    return getFormattedDateTime(date, 'Yesterday'); // Yesterday
  } else if (isThisWeek) {
    return getFormattedDateTime(date, 'Week'); // Friday
  } else if (isThisYear) {
    return getFormattedDateTime(date, false, true); // 10. January at 10:20
  }

  return getFormattedDateTime(date);
};


// date formating funtion
function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  const period = hours < 12 ? 'AM' : 'PM';

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (prefomattedDate) {
    return `${prefomattedDate} at ${hours}:${minutes} ${period}`;
  }
  if (hideYear) {
    return `${day}. ${month} at ${hours}:${minutes} ${period}`;
  }
  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes} ${period}`;
}

// user activity time formating function
export function activeTimeFormat(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date);
};