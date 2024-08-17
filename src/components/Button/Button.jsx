import PropTypes from 'prop-types';

import s from './Button.module.scss';

export const Button = ({ name, handleClick, disabled }) => {
  return (
    <button className={s.button} onClick={handleClick} disabled={disabled}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string || PropTypes.element,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};
