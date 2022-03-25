import React from 'react';
import HomeUi from '../ui/home/HomeUi';

const users = [
  {
    name: 'Hasan Mahamud',
    img: 'https://i.ibb.co/n8yn9CM/Ellipse-4.png',
    status: true,
  },
  {
    name: 'Abu Sayeed',
    img: 'https://i.ibb.co/ZMDbjf7/Ellipse-4-3.png',
    status: true,
  },
  {
    name: 'Muaaj Muhammad',
    img: 'https://i.ibb.co/mXz61cM/Ellipse-4-1.png',
    status: true,
  },
  {
    name: 'Saidul Islam',
    img: 'https://i.ibb.co/ZWwbcST/Ellipse-4-2.png',
    status: true,
  },
  {
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: true,
  },
  {
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    name: 'Nayeem Hasan',
    img: 'https://i.ibb.co/f8vbXxB/Ellipse-18.png',
    status: true,
  },
  {
    name: 'Shad Ahamed',
    img: 'https://i.ibb.co/FqN6tTg/Ellipse-14.png',
    status: true,
  },
  {
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: true,
  },
  {
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    name: 'Shamim Hossain',
    img: 'https://i.ibb.co/Q89Q7wV/Ellipse-8.png',
    status: true,
  },
]

const HomePage = () => {
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