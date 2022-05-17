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
      formattedMessageArray.push({ [key]: datewiseFilteredObj[key] })
    }
  }

  return formattedMessageArray

}