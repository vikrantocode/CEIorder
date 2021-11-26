import React, { useEffect } from 'react';
import axios from 'axios';
import { Card, CustomInput, Badge } from 'reactstrap';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const activated = {
  color: '#6600FF',
};

const OrdersListView = ({
  deleteModal,
  index,
  order,
  isSelect,
  collect,
  onCheckItem,
}) => {
 
  const history = useHistory();
  const [customer, setCustomer] = useState('');
  
  
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/api/customers/details/${order.customerId}`
      );
      setCustomer(`${data.customer.firstName} ${data.customer.lastName}`);
    })();
  }, []);

  const orderSource = () => {
    if (order.orderSource === 'eBayOrder') {
      return 'https://pngimg.com/uploads/ebay/ebay_PNG22.png';
    } else if (order.orderSource === 'Amazon') {
      return 'http://pngimg.com/uploads/amazon/amazon_PNG5.png';
    } else {
      return null;
    }
  };

  return (
    <Colxx xxs="12" key={order.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={order.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div
            className="custom-control custom-checkbox pl-1 align-self-center px-4"
            style={{ cursor: 'pointer' }}
            onClick={(event) => onCheckItem(event, order.id)}
          >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${order.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
          </div>
          <div className="w-10 custom-control custom-checkbox align-self-center">
            {index}
            {/* {category.id} */}
          </div>
          <div
            className="align-self-center mr-4"
            style={{
              height: '3.8rem',
              width: '3.8rem',
              backgroundImage: `url(${orderSource()})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* <img src={`${category.categoryimg}`} alt="Image not found" onError={(e)=>{e.target.onerror = null; e.target.src="https://res.cloudinary.com/nikitaocode/image/upload/v1610533300/cart_vaj8qb.png"}} style={{height:"3rem" , width:"3rem"}} className="list-thumbnail responsive border-0 card-img-left"/> */}
          </div>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="w-20 w-sm-100 list-item-heading mb-1 ml-2 truncate">
                D : {order.timeOfOrder.split('T')[0]} <br />T :{' '}
                {order.timeOfOrder
                  .split('T')[1]
                  .substr(0, order.timeOfOrder.split('T')[1].indexOf('.'))}
              </p>
              <p className="w-20 w-sm-100 list-item-heading mb-1 ml-2 truncate">
                {customer}
              </p>
              <p className="w-10 w-sm-100 list-item-heading mb-1 ml-2 truncate">
                {order.siteCode}
              </p>
              <p className="w-10 w-sm-100 list-item-heading mb-1 ml-2 truncate">
                <i
                  data-toggle="tooltip"
                  title={order.isRushOrder ? 'Rush Order' : 'Not Rush Order'}
                  className={`iconsminds-thunder ${
                    order.isRushOrder ? 'text-danger' : 'text-warning'
                  }`}
                ></i>
              </p>
              <div className="w-15 w-sm-100">
              <Badge color={order.status.toLowerCase() == 'cancelled'? "danger" : order.status.toLowerCase() == 'inprogress'?"warning": "success" } pill>
                
                  {order.status}
                </Badge>
              </div>
              <p className="w-20 w-sm-100 align-self-center pt-3">
                <FaEye
                  onClick={() =>
                    history.push(`/app/orders/view-order/${order.id}`)
                  }
                  style={{ cursor: 'pointer' }}
                  id={order.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaEdit
                  onClick={() =>
                    history.push(`/app/orders/edit-order/${order.id}`)
                  }
                  style={{ cursor: 'pointer' }}
                  id={order.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                
                   <FaTrash
                  onClick={() =>deleteModal(order.id)}
                  value={order.id}
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading mx-2 "
                />
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(OrdersListView);
