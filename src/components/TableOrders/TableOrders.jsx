import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  IoChevronDownCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import Cookies from 'js-cookie';

import { Loader } from '../Loader/Loader';
import { handleOrderById } from '../../services/APIrequests';

import s from './TableOrders.module.scss';

export const TableOrders = ({ isHeader, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get('authToken');

  const handleRequestOrderById = async (order_id) => {
    if (isExpanded) {
      setIsExpanded(false);
      setOrderDetails(null);
      return;
    }

    setIsExpanded(true);
    setIsLoading(true);
    setError(null);

    try {
      const result = await handleOrderById(order_id, token);
      setOrderDetails(result.material);
    } catch (error) {
      console.log('Ошибка!', error);
      setError('Не удалось получить данные.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isHeader) {
    return (
      <div className={s.table}>
        <div className={s.table_section}>Номер</div>
        <div className={s.table_section}>Завершен</div>
        <div className={s.table_section}>Продукция</div>
      </div>
    );
  }
  return (
    <>
      <div
        className={`${s.table} ${s.table__hover}`}
        onClick={() => handleRequestOrderById(data.id, token)}
      >
        <div className={s.table_section}>{data.number}</div>
        <div className={s.table_section}>
          {data.is_finished ? (
            <IoChevronDownCircleOutline className={s.icon} />
          ) : (
            <IoCloseCircleOutline className={s.icon} />
          )}
        </div>
        <div className={s.table_section}>
          {data.product?.name ? data.product.name : 'Название не указано'}
        </div>
      </div>
      {isExpanded && (
        <div className={`${s.details} ${s.details__animate}`}>
          {isLoading && <Loader />}
          {!isLoading && error && <p className={s.error}>{error}</p>}
          {!isLoading && orderDetails && (
            <div className={s.material_info}>
              <p>Код: {orderDetails.code}</p>
              <p>Название: {orderDetails.name}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

TableOrders.propTypes = {
  isHeader: PropTypes.bool,
  data: PropTypes.object,
};
