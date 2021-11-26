import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

function VendorProductHeading() {
    return (
        <Colxx xxs="12" className="mb-2">
        <ContextMenuTrigger id="menu_id" >
        <Card>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-10 w-sm-100 pl-4 mr-2">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Image
                </p>
              </div>
              {/* <div className="custom-control pl-5 align-self-center pr-5"></div> */}
              <div className="w-10 w-sm-100 pl-2 mr-2">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  SKU
                </p>
              </div>
              <div className="w-30 w-sm-100 pl-2 ml-2">
                <p className="list-item-heading mb-1 truncate align-self-center font-weight-bold">
                  Product Name
                </p>
              </div>
              <div className="w-10 w-sm-100 px-2">
                <p className="list-item-heading mb-1 truncate font-weight-bold">
                  Price
                </p>
              </div>
            </div>
            
          </div>
        </Card>
        </ContextMenuTrigger>
      </Colxx>
    )
}

export default VendorProductHeading
