import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { listOrderMine } from '../actions/OrderActions';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  let loading,
    error,
    orders = [];
  if (orderMineList) {
    ({ loading, error, orders } = orderMineList);
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div className="main-pad">
      <h1 className="heading">Order History</h1>
      {loading ? (
        <p>Loading....</p>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders.length === 0 ? (
        <MessageBox variant="danger">No Orders Found.</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ordered On</th>
              <th>Ordered At</th>
              <th>Total Price</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td># {order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.createdAt.substring(11, 19)}</td>
                <td>
                  <strong>
                    <i className="fa fa-inr"></i>
                    {order.totalPrice}
                  </strong>
                </td>
                {order.isPaid ? (
                  <td className="success-sts">
                    {order.paidAt.substring(0, 10)}
                  </td>
                ) : (
                  <td className="danger-sts">Not Paid</td>
                )}

                {order.isDelivered ? (
                  <td className="success-sts">
                    {order.deliveredAt.substring(0, 10)}
                  </td>
                ) : (
                  <td className="danger-sts">Not Delivered</td>
                )}
                <td>
                  <button
                    type="button"
                    className="details"
                    onClick={() => {
                      navigate(`/orders/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
