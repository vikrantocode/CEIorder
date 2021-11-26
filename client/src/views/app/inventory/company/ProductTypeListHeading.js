import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function ProductTypeListHeading({selectedItemsLength,handleChangeSelectAll,itemsLength}) {
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
              <div className="w-10 w-sm-100 pl-4">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Type ID
                </p>
              </div>
              <div className="w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Default
                </p>
              </div>
              <div className="w-25 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Type Name
                </p>
              </div>
              <div className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Buy.com Category
                </p>
              </div>
              <div className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                NewEgg Category
                </p>
              </div>
              <div className="w-15 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Price Level
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
