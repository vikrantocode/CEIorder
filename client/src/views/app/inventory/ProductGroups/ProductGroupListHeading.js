import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { NavLink } from 'react-router-dom';
// import classnames from 'classnames';
// import { NotificationManager } from '../../components/common/react-notifications';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

function ProductGroupListHeading({
  selectedItemsLength,
  handleChangeSelectAll,
  itemsLength,
  orderBy,
  orderManner,
  changeOrderBy,
  changeOrderManner
}) {
  const arrow = orderManner.value=== 'ASC' ? `iconsminds-arrow-up-3` : `iconsminds-arrow-down-3`
  const defaultIcon = `iconsminds-scroller` 
    return (
        <Colxx style={{padding:"0"}} xxs="12" className="mb-2">
        <ContextMenuTrigger id="menu_id" >
        <Card style={{background : 'transparent',boxShadow : 'none'}}>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <CustomInput
                className="custom-checkbox mb-0 d-inline-block"
                type="checkbox"
                id="checkAll"
                style={{cursor:'pointer'}}
                checked={selectedItemsLength >= itemsLength}
                onChange={() => handleChangeSelectAll(true)}
              />
              <div className="w-sm-100 w-10 pl-4" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'id', label: 'Id' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Id <i className={`${(orderBy.column === 'id') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-20 w-sm-100" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'name', label: 'Name' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Name <i className={`${(orderBy.column === 'name') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-10 w-sm-100" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'productsCount', label: 'Products Count' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Products <i className={`${(orderBy.column === 'productsCount') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-20 w-sm-100 text-center">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Modified On
                </p>
              </div>
              <div className=" w-20 w-sm-100 text-center" >
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Modified By
                </p>
              </div>
              <div className=" w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Action
                </p>
              </div>
              <div className=" w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  
                </p>
              </div>
            </div>
          </div>
        </Card>
        </ContextMenuTrigger>
      </Colxx>
    )
}

export default ProductGroupListHeading
