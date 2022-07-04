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
  let formattedArray = list?.length > 0 ? addDateTimefieldToItem(list) : []
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
        date: key,
        data: {
          date: new Date(key).toISOString(),
          messages: datewiseFilteredObj[key],
        }
      })
    }
  }

  formattedMessageArray.sort(function (prev, next) {
    return new Date(prev.date) - new Date(next.date)
  })

  return formattedMessageArray
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

// Get first two characters of user full name
export function getTwoCharacters(text) {
  if (!text) return
  const words = text?.trim().split(/\s+/).length;
  if (words === 1) {
    return text.substring(0, 2).toUpperCase();
  }
  const matches = text?.match(/\b(\w)/g);
  const acronym = matches?.join('').substring(0, 2);
  const result = acronym?.toUpperCase();
  return result;
}

export function udateGroupMessageList(allMessages, res) {

  const allData = JSON.parse(JSON.stringify(allMessages));
  const prevMessage = allData?.find(data => data.id === res.prevMsgId);
  const lastMessage = allData?.find(data => data.id === res.lasMsgId);

  if (!res.prevMsgId) {
    lastMessage?.readMessage?.push(res.readMessage);
    return allData;
  }
  const userInPrev = prevMessage?.readMessage?.findIndex(user => user.id === res.readMessage.id);
  console.log(prevMessage.readMessage);
  if (userInPrev > -1) {
    prevMessage?.readMessage?.splice(userInPrev, 1);
  }

  const userInLast = lastMessage?.readMessage?.findIndex(user => user.id === res.user.id);
  if (userInLast === -1) {
    lastMessage?.readMessage?.push(res.readMessage);
  }
  return allData;
}

export function compareTwoTime(time1, time2) {
  const convertedTime1 = new Date(time1);
  const convertedTime2 = new Date(time2);
  const differentNumber = convertedTime1 - convertedTime2;
  const minutes = Math.floor(differentNumber / 60e3);
  return minutes;
}



export function checkDevided(prevMessage, message, index) {
  const result = (
    ((!(index > 0 && (prevMessage?.senderId === message.senderId))) ||
      (!(index > 0 && (prevMessage?.user?.id === message?.user?.id))))
    ||
    (
      (((index > 0 && (prevMessage?.senderId === message.senderId))) ||
        ((index > 0 && (prevMessage?.user?.id === message?.user?.id))))
      &&
      (compareTwoTime(message?.createdAt, prevMessage?.createdAt) > 11)
    )
  )
  return result;
}

export function checkMatch(prevMessage, message, index) {
  const result =
    ((!(index > 0 && (prevMessage?.senderId === message.senderId))) ||
      (!(index > 0 && (prevMessage?.user?.id === message?.user?.id))))

  return result;
}

export function deletePrevSeen(prevMessages, id) {
  prevMessages.map((message, msgIndex) => {
    const index = message.users_seen?.length > 0 && message.users_seen?.findIndex(user => user.id === id);
    if (index > -1) {
      const findMsg = prevMessages[msgIndex]
      findMsg.users_seen.splice(index, 1);
    }
    return prevMessages;
  })
}


export function updateMessageListOnReact(messages, res) {
  const copyPrevMessages = JSON.parse(JSON.stringify(messages));
  const result = res.result;
  const msgId = res.messageId;
  const message = copyPrevMessages.find(message => message.id === msgId);
  if (message?.EmojiTotal?.length > 0) {
    message.EmojiTotal[0].total_angry = result.total_angry;
    message.EmojiTotal[0].total_emoji = result.total_emoji;
    message.EmojiTotal[0].total_like = result.total_like;
    message.EmojiTotal[0].total_love = result.total_love;
    message.EmojiTotal[0].total_sad = result.total_sad;
    message.EmojiTotal[0].total_smile = result.total_smile;
    message.EmojiTotal[0].total_surprize = result.total_surprize;
  } else {
    const newReact = {
      total_angry: result.total_angry,
      total_emoji: result.total_emoji,
      total_like: result.total_like,
      total_love: result.total_love,
      total_sad: result.total_sad,
      total_smile: result.total_smile,
      total_surprize: result.total_surprize,
    }
    message.EmojiTotal.push(newReact);
  }

  return copyPrevMessages;
}