import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function VariantListHeading({selectedItemsLength,handleChangeSelectAll,itemsLength}) {
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
              <div className=" w-5 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Id
                </p>
              </div>
              <div className="pl-4 w-25 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Attribute
                </p>
              </div>
              <div className=" w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Value
                </p>
              </div>
              <div className="pl-2 w-15 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Category
                </p>
              </div>
              <div className="pl-1 w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                Status
                </p>
              </div>
              <div className="pl-3 w-10 w-sm-100">
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

export default VariantListHeading
