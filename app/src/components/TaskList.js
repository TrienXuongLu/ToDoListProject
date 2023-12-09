"use client";
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TaskList = ({ displayList, handleComplete }) => {
  const [sortType, setSortType] = useState('all');
  const [list, setList] = useState([]);
  const [display, setDisplay] = useState([]);

  console.log(sortType);

  useEffect(() => {
    if(displayList != null) {
      setList(displayList.filter((item) => item.complete === false ));
    }
  }, [displayList]);

  async function handleSortDisplayList(type) {
    if(sortType === 'all') {
      await setDisplay(type.filter((item) => item.complete === false ));
    } else if(sortType === 'important') {
      await setDisplay(type.filter((item) => item.complete === false && item.type === 'important'));
    } else if(sortType === 'urgent') {
      await setDisplay(type.filter((item) => item.complete === false && item.type === 'urgent'));
    }
  }

  useEffect(() => { 
    console.log(sortType);
    console.log(list);
    handleSortDisplayList(list);
  }, [sortType, list]);

  console.log(display);

  const sortButtonStyle = (buttonType) => ({
    marginRight: '10px', 
    border: '1px solid rgb(69, 10, 10)', 
    backgroundColor: sortType === buttonType ? 'green' : 'white',
    padding: '3px 10px',
  });

  return (
    
    <div className="ml-5">
      <div className="w-fit mb-2 top-0 left-0 font-inter font-semibold text-lg leading-7 text-black">
        Task List
      </div>
      <div className="w-[368px] h-[37px] top-[30px] left-0 font-inter font-semibold text-lg leading-7 text-black">
        <button onClick={() => setSortType('all')} style={sortButtonStyle('all')}>All</button>
        <button onClick={() => setSortType('important')} style={sortButtonStyle('important')}>Important</button>
        <button onClick={() => setSortType('urgent')} style={sortButtonStyle('urgent')}>Urgent</button>
        {display ? display.map((item, index) => {
          return (
            <TodoItem 
              key={index}
              todo={item}
              onComplete={() => handleComplete(item)} 
            />
          )
        })
        : ''}
        {/* ... more list items as needed ... */}
      </div>
    </div>
  );
};

export default TaskList;

