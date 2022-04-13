import React, { useState } from 'react';

const FilterPopover = () => {
  const [filter, setFilter] = useState("all")

  const onOptionChange = e => {
    setFilter(e.target.value)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="all">All</label>
        <input
          type="radio"
          value="all"
          id="all"
          checked={filter === "all"}
          onChange={onOptionChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="people">People</label>
        <input
          type="radio"
          value="people"
          id="people"
          checked={filter === "people"}
          onChange={onOptionChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="groups">Groups</label>
        <input
          type="radio"
          value="groups"
          id="groups"
          checked={filter === "groups"}
          onChange={onOptionChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="messages">Messages</label>
        <input
          type="radio"
          value="messages"
          id="messages"
          checked={filter === "messages"}
          onChange={onOptionChange}
        />
      </div>
    </div>
  );
};

export default FilterPopover;