const URL = 'http://localhost:8000/api/v1';

export const handleAuth = async (data) => {
  try {
    const response = await fetch(`${URL}/api-token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Ошибка! Статус: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Ошибка!', error);
    return null;
  }
};

export const handleRequestOrders = async (token, page = 1) => {
  try {
    const response = await fetch(`${URL}/workorders/?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка! Статус: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Ошибка!', error);
    return null;
  }
};

export const handleOrderById = async (order_id, token) => {
  try {
    const response = await fetch(`${URL}/workorders/${order_id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка! Статус: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Ошибка!', error);
    return null;
  }
};
