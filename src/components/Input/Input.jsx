import PropTypes from 'prop-types';

import s from './Input.module.scss';

export const Input = ({
  children,
  type = 'text',
  placeholder,
  handleChange,
  value,
}) => {
  return (
    <div className={s.input_wrapper}>
      {children}
      <input
        type={type}
        className={s.input}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.element,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};
