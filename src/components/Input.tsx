import React from 'react';

interface IProps {
  htmlRef: React.Ref<HTMLInputElement>;
  keyPressHandler?: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<
  IProps &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ type, placeholder, htmlRef, keyPressHandler }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={htmlRef}
      className="rounded-md py-3 px-6 outline-none"
      onKeyUp={keyPressHandler}
    />
  );
};

export default Input;
