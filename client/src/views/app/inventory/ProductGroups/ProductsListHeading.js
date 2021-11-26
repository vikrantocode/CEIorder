import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const ProductsList = ({checker,handleChangeSelectAll, selectedProducts, productIds}) => {
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
                checked={checker(selectedProducts,productIds)}
                onChange={() => handleChangeSelectAll(true)}
              />
              <div className="w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Image
                </p>
              </div>
              <div className="pl-3 w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                SKU
                </p>
              </div>
              <div className="pl-3 w-30 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Product Name
                </p>
              </div>
              <div className="pl-3 w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Price
                </p>
              </div>
            </div>
          </div>
        </Card>
        </ContextMenuTrigger>
      </Colxx>
     );
}
 
export default ProductsList;