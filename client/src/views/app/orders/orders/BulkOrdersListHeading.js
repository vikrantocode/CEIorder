import React from 'react';
import { Card } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function OrdersListHeading({

}) {
  return (
    <Colxx style={{ padding: '0' }} xxs="12" className="mb-2">
      <ContextMenuTrigger id="menu_id">
        <Card style={{ background: 'transparent', boxShadow: 'none' }}>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero">
   
              <div className="ml-3 w-10 w-sm-100">
                <p className="list-item-heading mb-1 ml-4 truncate font-weight-bold">
                  Sr No.
                </p>
              </div>
              <div className=" w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  File Name
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
