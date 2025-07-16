import React, { useEffect, useRef } from 'react';
import socket from './socket';

const CollabBoard = () => {
  const textareaRef = useRef();

  useEffect(() => {
    socket.on('receive-changes', (data) => {
      textareaRef.current.value = data;
    });
    return () => socket.off('receive-changes');
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    socket.emit('send-changes', value);
  };

  return (
    <textarea
      ref={textareaRef}
      onChange={handleChange}
      placeholder="Start typing to collaborate..."
      rows="15"
      cols="80"
    ></textarea>
  );
};

export default CollabBoard;
