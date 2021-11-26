import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function ProductTypeListHeading({selectedItemsLength,handleChangeSelectAll,itemsLength, orderBy, orderManner, changeOrderBy}) {
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
              <div className="w-10 w-sm-100 pl-4" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'id', label: 'Id' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Id <i className={`${(orderBy.column === 'id') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-10 w-sm-100" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'default', label: 'Default Value' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Default <i className={`${(orderBy.column === 'default') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-25 w-sm-100 pl-2" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'name', label: 'Name' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Name <i className={`${(orderBy.column === 'name') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-20 w-sm-100" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'buyCategory', label: 'Buy.com Category' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Buy.com Category  <i className={`${(orderBy.column === 'buyCategory') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-20 w-sm-100" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'newEggCategory', label: 'New Egg Category' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                NewEgg Category <i className={`${(orderBy.column === 'newEggCategory') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-15 w-sm-100" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'price', label: 'Price' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Price Level <i className={`${(orderBy.column === 'price') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-15 w-sm-100 pl-4">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Action
                </p>
              </div>
            </div>
            
          </div>
        </Card>
        </ContextMenuTrigger>
      </Colxx>
    )
}

export default ProductTypeListHeading
