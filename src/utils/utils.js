/* eslint-disable no-control-regex */
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













