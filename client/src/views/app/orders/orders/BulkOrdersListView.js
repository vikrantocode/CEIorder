import React, { useEffect } from 'react';
import { Card, Badge } from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaTrash } from 'react-icons/fa';

const activated = {
  color: '#6600FF',
};

const OrdersListView = ({
  deleteModal,
  index,
  order,
  isSelect,
  collect,

}) => {

  return (
    <Colxx xxs="12" key={order.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={order.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >          
      
          <div className="w-10 ml-5  pl-2 custom-control custom-checkbox align-self-center">
            {index}
          </div>
    
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="w-20 w-sm-100 list-item-heading mb-1 ml-2 truncate">
                {order}
              </p>
              <div className="w-15 w-sm-100">
              <Badge color={ "success" } pill>
                  {"success"}
                </Badge>
              </div>
              <p className="w-20 w-sm-100 align-self-center pt-3">                
                   <FaTrash
                  onClick={() =>deleteModal(order)}
                  value={order}
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
