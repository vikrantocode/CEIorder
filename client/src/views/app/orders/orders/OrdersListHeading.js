import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function OrdersListHeading({
  selectedItemsLength,
  handleChangeSelectAll,
  itemsLength,
}) {
  return (
    <Colxx style={{ padding: '0' }} xxs="12" className="mb-2">
      <ContextMenuTrigger id="menu_id">
        <Card style={{ background: 'transparent', boxShadow: 'none' }}>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero">
              <CustomInput
                className="custom-checkbox mb-0 d-inline-block"
                type="checkbox"
                id="checkAll"
                style={{ cursor: 'pointer' }}
                checked={selectedItemsLength >= itemsLength}
                onChange={() => handleChangeSelectAll(true)}
              />
              <div className="ml-3 w-10 w-sm-100">
                <p className="list-item-heading mb-1 ml-4 truncate font-weight-bold">
                  Order Id
                </p>
              </div>
              <div className="ml-3 w-10 w-sm-100 pl-3 ">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Channel
                </p>
              </div>
              <div className="ml-3 w-20 w-sm-100 pl-5">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Date
                </p>
              </div>
              <div className="w-20 w-sm-100 pl-3">
                <p className="list-item-heading mb-1 truncate font-weight-bold" >
                  Sold To
                </p>
              </div>
              <div className="w-10 w-sm-100">
                <p className="list-item-heading mb-1  truncate font-weight-bold">
                Site Code
                </p>
              </div>
              <div className="w-10 w-sm-100">
                <p className="list-item-heading mb-1  truncate font-weight-bold">
                  RushOrder
                </p>
              </div>
              <div className="w-20 w-sm-100">
                <p className="list-item-heading mb-1  truncate font-weight-bold"style={{ marginLeft: 25 }} >
                  Status
                </p>
              </div>
              <div className="w-15 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Action
                </p>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
}

export default OrdersListHeading;
