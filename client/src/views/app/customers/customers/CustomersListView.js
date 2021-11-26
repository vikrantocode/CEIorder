import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { useHistory } from 'react-router'
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const activated = {
    color : 'yellow'
}

const CustomersListView = ({ openModal, deleteModal, index, customer, isSelect, collect, onCheckItem }) => {

  const history = useHistory();

  return (
    <Colxx xxs="12" key={customer.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={customer.id} collect={collect}>
        <Card
          style={{height:'4rem'}}   
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
        <div className="custom-control custom-checkbox pl-1 align-self-center px-4"
          style={{cursor:'pointer'}}
          onClick={(event) => onCheckItem(event, customer.id)}
        >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${customer.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
        </div>
        <div className="w-10 w-sm-100 align-self-center">
                <p className="list-item-heading mb-1 truncate">
                {customer.id}
                </p>
              </div>
              <div className="w-20 w-sm-100 align-self-center">
                <p className=" ml-2 list-item-heading mb-1 truncate" >
                {`${customer.firstName} ${customer.lastName ? customer.lastName : '' }`}
                </p>
              </div>
              <div className="w-40 w-sm-100 align-self-center">
                <p className="list-item-heading mb-1 truncate">
                {customer.email}
                </p>
              </div>
              <div className="w-15 w-sm-100 pl-5 align-self-center">
                <p className="list-item-heading mb-1  truncate" >
                {customer.orderCount}
                </p>
              </div>
              <p className="w-20 w-sm-100 align-self-center pt-3">
                <FaEye
                  onClick={()=>{history.push(`/app/customers/view-customer/${customer.id}`)}}
                  style={{ cursor: 'pointer'}}
                  id={customer.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaEdit
                  onClick={()=>{history.push(`/app/customers/edit-customer/${customer.id}`)}}
                  style={{ cursor: 'pointer'}}
                  id={customer.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() => {deleteModal(customer.id)}}
                  value={customer.id}
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading mx-2 "
                />
              </p>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
    
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CustomersListView);
