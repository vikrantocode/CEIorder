import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function VendorListHeading({
  selectedItemsLength,
  handleChangeSelectAll,
  itemsLength,
  manner,
  order,
  changeOrderBy,
  changeOrderManner,
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
                className="w-15 w-sm-100 text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({
                    column: 'id',
                    label: 'Id',
                  });
                }}
              >
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Id
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      order.column === 'id' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div className="w-10 w-sm-100 pl-2 text-center">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Logo
                </p>
              </div>
              <div
                className="w-25 w-sm-100 text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({
                    column: 'brandShortName',
                    label: 'Brand Short Name',
                  });
                }}
              >
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Short Name
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      order.column === 'brandShortName' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div
                className="w-30 w-sm-100 text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({
                    column: 'brandLongName',
                    label: 'Brand Long Name',
                  });
                }}
              >
                <p className="list-item-heading mb-1  truncate font-weight-bold">
                  Long Name
                  <i
                    style={{ float: 'right' }}
                    className={`${
                      order.column === 'brandLongName' ? arrow : defaultIcon
                    } font-weight-bold h5`}
                  ></i>
                </p>
              </div>
              <div
                className="w-10 w-sm-100 "
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  changeOrderBy({
                    column: 'productscount',
                    label: 'Products Count',
                  });
                }}
              >
                <p className="list-item-heading mb-1  truncate font-weight-bold">
                  Products
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
                  className="list-item-heading mb-1 truncate font-weight-bold"
                  style={{ paddingLeft: 40 }}
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
