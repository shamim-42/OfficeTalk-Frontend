import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../api/auth';
import { selectActiveUser } from '../redux/features/layoutSlice';
import ChattingHeader from '../ui/chattingHeader/ChattingHeader';

const ChatHeader = () => {
  const { id } = useParams();
  const onlineUsers = useSelector(selectActiveUser)
  const [currentUserStatus, setCurrentUserStatus] = useState({})

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isOnline = onlineUsers.indexOf(parseInt(id)) !== -1;


  // get user online status function
  async function getOnlineUserStatus() {
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserStatus(res)
      // console.log(res)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await userActiveStatusApi(id, { successHandler, handleBadReq })
  }

  function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
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


  const activeStatusFunction = (dateParam) => {
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


  useEffect(() => {
    getOnlineUserStatus()
  }, [id, isOnline])

  return (
    <ChattingHeader 
    activeStatusFunction={activeStatusFunction}
    isOnline={isOnline}
     currentUserStatus={currentUserStatus} />
  );
};

export default ChatHeader;