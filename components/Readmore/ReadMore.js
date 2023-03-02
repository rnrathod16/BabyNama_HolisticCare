import React, { useState } from 'react';

const ReadMore = ({ children, limit }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, limit) : text}
      <span
        onClick={toggleReadMore}
        className="!text-[#3286b3] cursor-pointer"
        style={{ cursor: 'pointer', color: '#03ACF2' }}
      >
        {isReadMore ? '...Read More' : ' Show Less'}
      </span>
    </p>
  );
};

export default ReadMore;
