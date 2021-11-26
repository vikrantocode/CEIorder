import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function VendorListHeading({
  selectedItemsLength,
  handleChangeSelectAll,
  itemsLength,
  changeOrderBy,
  order,
  manner,
}) {
  const defaultIcon = `iconsminds-scroller`;
  const arrow =
    manner.value === 'ASC'
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

              <div
                className="w-sm-100 ml-5"
                style={{ width: '5%', cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({ column: 'id', label: 'Id' });
                }}
              >
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Id{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      order.column === 'id' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div
                className="w-25 w-sm-100 ml-5 pr-3"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({ column: 'name', label: 'Product Name' });
                }}
              >
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Vendor Name{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      order.column === 'name' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-25 w-sm-100">
                <p className="list-item-heading mb-1  truncate font-weight-bold">
                  Vendor Email
                </p>
              </div>
              <div
                className="w-15 w-sm-100 "
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({
                    column: 'productscount',
                    label: 'Products Count',
                  });
                }}
              >
                <p
                  className="list-item-heading mb-1  truncate font-weight-bold"
                  style={{ paddingLeft: 0 }}
                >
                  Products{' '}
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      order.column === 'productscount' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-15 w-sm-100 ">
                <p
                  className="list-item-heading mb-1  truncate font-weight-bold"
                  style={{ paddingLeft: 0 }}
                >
                  Brands{' '}
                </p>
              </div>
              <div className="w-15 w-sm-100 ">
                <p
                  className="list-item-heading mb-1 truncate font-weight-bold"
                  style={{ paddingLeft: 10 }}
                >
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

export default VendorListHeading;
