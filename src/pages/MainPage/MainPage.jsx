import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';

import { NavBar } from '../../components/NavBar/NavBar';
import { TableOrders } from '../../components/TableOrders/TableOrders';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader/Loader';
import { handleRequestOrders } from '../../services/APIrequests';

import s from './MainPage.module.scss';

export const MainPage = () => {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const token = Cookies.get('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async (token, page) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await handleRequestOrders(token, page);
        setOrders(result.results);
        setOriginalOrders(result.results);
        setNext(result.next?.slice(-1));
      } catch (error) {
        console.log('Ошибка!', error);
        setError('Не удалось получить данные с сервера.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders(token, currentPage);
  }, [token, currentPage]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, originalOrders]);

  const applyFilters = () => {
    const filteredOrders = originalOrders?.filter((order) => {
      const matchesSearch = order.number
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === '' ||
        (statusFilter === 'true' && order?.is_finished) ||
        (statusFilter === 'false' && !order?.is_finished);

      return matchesSearch && matchesStatus;
    });

    setOrders(filteredOrders);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterStatus = (status) => {
    setStatusFilter(status);
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/login');
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <h1>Наряд на производство</h1>
        <Button name={'Выход'} handleClick={handleLogout} disabled={false} />
      </header>
      <NavBar
        setSearchItem={handleSearch}
        setStatusFilter={handleFilterStatus}
      />
      <div className={s.table}>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <>
            <TableOrders isHeader={true} />
            {orders?.map((order) => (
              <TableOrders data={order} key={order.id} />
            ))}
            <div className={s.pagination}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {<IoArrowBackCircleOutline />}
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={next === undefined}
              >
                {<IoArrowForwardCircleOutline />}
              </button>
            </div>
          </>
        )}
        {!isLoading && error && <div className={s.error}>{error}</div>}
      </div>
    </div>
  );
};
