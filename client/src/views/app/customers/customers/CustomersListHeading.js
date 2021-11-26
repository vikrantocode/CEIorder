import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function CustomersListHeading({
  selectedItemsLength,
  handleChangeSelectAll,
  itemsLength,
  orderManner,
  orderBy,
  changeOrderBy,
}) {
  const defaultIcon = `iconsminds-scroller`;
  const arrow =
    orderManner.value === 'ASC'
      ? `iconsminds-arrow-up-3`
      : `iconsminds-arrow-down-3`;
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
              <div className="w-10 w-sm-100">
                <p
                  className="list-item-heading mb-1 ml-4 truncate font-weight-bold "
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    changeOrderBy({ column: 'id', label: 'Id' });
                  }}
                >
                  Id{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      orderBy.column === 'id' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-20 w-sm-100">
                <p
                  className="pl-2 list-item-heading mb-1 truncate font-weight-bold ml-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    changeOrderBy({ column: 'firstName', label: 'Name' });
                  }}
                >
                  Full Name{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      orderBy.column === 'firstName' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-40 w-sm-100">
                <p
                  className="pl-2 list-item-heading mb-1 truncate font-weight-bold ml-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    changeOrderBy({ column: 'email', label: 'Email' });
                  }}
                >
                  Email{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      orderBy.column === 'email' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-25 w-sm-100 pl-5">
                <p
                  className="list-item-heading mb-1  truncate font-weight-bold ml-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    changeOrderBy({
                      column: 'orderCount',
                      label: 'Order Count',
                    });
                  }}
                >
                  Order Count{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      orderBy.column === 'orderCount' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-15 w-sm-100 pl-5">
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

export default CustomersListHeading;
