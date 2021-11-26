import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const isValidURL = string => {
  if(string){
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }
};

const imageServer = 'http://cdn.linqusacorp.com/productimages/'

const ProductView = ({ product, isSelect, onCheckItem }) => {
  
  const imageData = () => {
    if(isValidURL(product.imageDetail.imageNameItem)){
      return `${product.imageDetail.imageNameItem}&ImageType=3&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`
    } else {
      return `${imageServer}${product.imageDetail.imageNameItem}`
    }
  }

  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id}>
        <Card
          style={{height:'4rem'}}
          className='d-flex flex-row align-self-center '
        >
        <div className="custom-control custom-checkbox pl-1 align-self-center px-4"
          style={{cursor:'pointer'}}
          onClick={(event) => {
            onCheckItem(event, product.id)
            console.log(event)
            console.log(product.id)
          }}
        >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${product.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
        </div>
          <div className='align-self-center ml-3'>
            <img
              src={imageData()}
              style={{height:"3rem", maxWidth : "4rem"}}
              className="list-thumbnail responsive border-0 card-img-left"
              alt='not found'
              onError={(e)=>{e.target.onerror = null; e.target.src="https://img.icons8.com/plasticine/2x/no-image.png"}}
              
            />
          </div>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero ml-5">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <div className="w-10 w-sm-100 mr-2">
                <p className="mb-1 truncate">
                {product.itemNumber}
                </p>
              </div>
              <div className="w-30 w-sm-100 ml-2">
                <p className="list-item-heading mb-1 truncate">
                  {product.description25Char}
                </p>
              </div>
              <div className="w-10 w-sm-100">
                <p className="text-muted text-small mb-1 truncate">
                {product.pricesAndCost && `${product.pricesAndCost.listPrice}`}
                </p>
              </div>
              <div className=" w-10 w-sm-100 pl-2">
                <p className="text-muted text-small mb-1 truncate">
                {product.pricesAndCost && product.pricesAndCost.costColumn1Price}
                </p>
              </div>
              <div className=" w-10 w-sm-100 pl-3">
                <p className="text-muted text-small mb-1 truncate">
                {product.packQuantity}
                </p>
              </div>
              <div className=" w-10 w-sm-100 pl-3">
                <p className="text-muted text-small mb-1 truncate">
                {product.id} <i className="simple-icon-star text-warning"></i>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ProductView);