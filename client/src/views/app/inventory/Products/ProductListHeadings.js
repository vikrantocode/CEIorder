import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function ProductListHeading({selectedItemsLength,handleChangeSelectAll,itemsLength, changeOrderBy, manner, order}) {
  const arrow = manner.value=== 'ASC' ? `iconsminds-arrow-up-3` : `iconsminds-arrow-down-3`
  const defaultIcon = `iconsminds-scroller`  
  return (
        <Colxx style={{padding:"0"}} xxs="12" className="mb-2">
        <ContextMenuTrigger id="menu_id" >
        <Card style={{background : 'transparent',boxShadow : 'none'}}>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <CustomInput
                className="custom-checkbox mb-0 d-inline-block"
                type="checkbox"
                id="checkAll"
                style={{cursor:'pointer'}}
                checked={selectedItemsLength >= itemsLength}
                onChange={() => handleChangeSelectAll(true)}
              />
              <div className="w-10 w-sm-100 pl-4 mr-2">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Image
                </p>
              </div>
              {/* <div className="custom-control pl-5 align-self-center pr-5"></div> */}
              
              <div className="w-10 w-sm-100 pl-2 mr-2 pr-2" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'itemNumber', label: 'SKU' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  <div style={{float : 'left'}} >SKU</div> <i style={{float : 'right'}} className={`${(order.column === 'itemNumber') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-30 w-sm-100 pl-2 ml-2 pr-2" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'description25Char', label: 'Product Name' })}}>
                <p className="list-item-heading mb-1 truncate align-self-center font-weight-bold">
                  <div style={{float : 'left'}} >Product Name</div> <i style={{float : 'right'}} className={`${(order.column === 'description25Char') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className="w-10 w-sm-100 px-2" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'priceAndCost.listPrice', label: 'Price' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Price<i style={{float : 'right'}} className={`${(order.column === 'priceAndCost.listPrice') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className=" w-10 w-sm-100 px-2" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'priceAndCost.costColumn1Price', label: 'Product Cost' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Cost <i style={{float : 'right'}} className={`${(order.column === 'priceAndCost.costColumn1Price') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className=" w-10 w-sm-100 px-2 pr-2" style={{cursor:'pointer'}} onClick={ () => {changeOrderBy({ column: 'packQuantity', label: 'Qty' })}}>
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                <div style={{float : 'left'}} >Qty</div> <i style={{float : 'right'}} className={`${(order.column === 'packQuantity') ? arrow : defaultIcon } font-weight-bold h5`}></i>
                </p>
              </div>
              <div className=" w-10 w-sm-100 px-2">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Brand
                </p>
              </div>
              <div className=" w-10 w-sm-100 px-2">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Rating
                </p>
              </div>
              <div className=" w-10 w-sm-100 pl-3">
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

export default ProductListHeading
