// Sort all messages by date
export function getDateWiseMessages(list) {
  let dateList = []
  function addDateTimefieldToItem(array) {
    let messageArray = array.map(item => {
      let [date, time] = item.createdAt.split("T");
      let newItem = { ...item, date, time };
      dateList.push(date);
      return newItem
    })

    return messageArray
  }
  let formattedArray = list.length > 0 ? addDateTimefieldToItem(list) : []
  let uniqDates = [...new Set(dateList)];

  let formattedMessageArray = [];

  let datewiseFilteredObj = {}
  for (let ud of uniqDates) {
    datewiseFilteredObj[ud] = []
  }
  if (formattedArray.length) {


    for (let msg of formattedArray) {
      datewiseFilteredObj[msg.date].push(msg)
    }

    for (let key in datewiseFilteredObj) {
      formattedMessageArray.push({
        [key]: {
          date: new Date(key).toDateString(),
          data: datewiseFilteredObj[key],
        }
      })
    }
  }
  const reverseMessages = formattedMessageArray.reverse();

  return reverseMessages
}

// Check is messages contain link
export function checkLink(text) {
  const geturl = new RegExp(
    "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
    , "g"
  );

  const url = text.match(geturl);
  if (url) {
    return url;
  } else {
    return false;
  }
}

// Time formating funtion
export function timeFormat(time) {
  const newTime = new Date(time).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  return newTime;
}

// date formating funtion
function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  const period = hours < 12 ? 'AM' : 'PM';

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes} ${period}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${day}. ${month} at ${hours}:${minutes} ${period}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes} ${period}`;
}

// active time formating function
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


// Date and time formating function for conversations list
// date formating funtion
function getFormattedDateTime(date, prefomattedDate = false, hideYear = false) {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = 'PM';
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }
  if (hours > 12) {
    hours = hours - 12;
    if (hours < 10){
      hours = `0${hours}`
    }
    period = 'PM'
  }



  if (prefomattedDate) {
    if (prefomattedDate === 'Today') {
      if (!hours) {
        return 'Today';
      }
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

// active time formating function
export function conversationTimeFormat(dateParam) {
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
    return getFormattedDateTime(date, 'Today'); //  10:20 AM
  } else if (isYesterday) {
    return getFormattedDateTime(date, 'Yesterday'); // Yesterday at 10:20 AM
  } else if (isThisWeek) {
    return getFormattedDateTime(date, 'Week'); // Yesterday at 10:20 AM
  } else if (isThisYear) {
    return getFormattedDateTime(date, false, true); // 10. January at 10:20
  }

  return getFormattedDateTime(date);
};








