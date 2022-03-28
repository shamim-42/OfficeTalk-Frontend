import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';

const users = [
  {
    id: 0,
    name: 'Hasan Mahamud',
    img: 'https://i.ibb.co/n8yn9CM/Ellipse-4.png',
    status: true,
  },
  {
    id: 2,
    name: 'Abu Sayeed',
    img: 'https://i.ibb.co/ZMDbjf7/Ellipse-4-3.png',
    status: true,
  },
  {
    id: 3,
    name: 'Muaaj Muhammad',
    img: 'https://i.ibb.co/mXz61cM/Ellipse-4-1.png',
    status: true,
  },
  {
    id: 4,
    name: 'Saidul Islam',
    img: 'https://i.ibb.co/ZWwbcST/Ellipse-4-2.png',
    status: true,
  },
  {
    id: 5,
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: true,
  },
  {
    id: 6,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 7,
    name: 'Nayeem Hasan',
    img: 'https://i.ibb.co/f8vbXxB/Ellipse-18.png',
    status: true,
  },
  {
    id: 8,
    name: 'Shad Ahamed',
    img: 'https://i.ibb.co/FqN6tTg/Ellipse-14.png',
    status: true,
  },
  {
    id: 9,
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: false,
  },
  {
    id: 10,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 11,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 12,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 13,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 14,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: false,
  },
  {
    id: 15,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 16,
    name: 'Shamim Hossain',
    img: 'https://i.ibb.co/Q89Q7wV/Ellipse-8.png',
    status: true,
  },
]

const HomePage = () => {
  const dispatch = useDispatch();
  dispatch(setActiveUser(users));

  function handleChangeSearch(value) {
    console.log(value);
  }

  function onChangeSwitch(evt) {
    console.log(evt)
  }

  return (
    <HomeUi
      handleChangeSearch={handleChangeSearch}
      onChangeSwitch={onChangeSwitch}
      users={users} />
  );
};

export default HomePage;