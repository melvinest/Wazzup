import React from 'react';

export default ({ textBoxInput, handleTextBoxInput, handleTextBoxChange }) => {
  return (
    <div className="textbox">
      <input
        className="input-field"
        onKeyPress={(e) => { handleTextBoxInput(e); }}
        onChange={(e) => { handleTextBoxChange(e); }}
        value={textBoxInput} type="text"
        placeholder="Type a message..."
      />
    </div>
  );
};
