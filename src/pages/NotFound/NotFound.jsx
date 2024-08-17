import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button/Button';

import s from './NotFound.module.scss'

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleComeBack = () => {
    navigate('/');
  };
  return (
    <div className={s.wrapper}>
      <h1>Такой страницы не существует!</h1>
      <Button
        name={'Вернуться на главную'}
        handleClick={handleComeBack}
        disabled={false}
      />
    </div>
  );
};
