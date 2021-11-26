import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const isValidURL = string => {
  if(string){
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }
  else return false
};

const imageServer = 'https://cdn.linqusacorp.com/productimages/'

const ProductListView = ({ index, product, isSelect, collect, onCheckItem }) => {
  const history = useHistory()

  const imageData = () => {
    if(product.imageDetail){
      if(isValidURL(product.imageDetail.imageNameItem)){
        return `${product.imageDetail.imageNameItem}&ImageType=3&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`
      } else {
        return `${imageServer}${product.imageDetail.imageNameItem}`
      }
    } else {
      if(isValidURL(product['imageDetail.imageNameItem'])){
        return `${product['imageDetail.imageNameItem']}&ImageType=3&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`
      } else {
        return `${imageServer}${product['imageDetail.imageNameItem']}`
      }
    }
  }
 const getPrice = () => {
    if(product.pricesAndCost){
      return product.pricesAndCost.listPrice
    } else {
      return product['pricesAndCost.listPrice']
    }
  }

  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          style={{height:'4rem'}}
          className={classnames('d-flex flex-row align-self-center', {
            active: isSelect,
          })}
        >
        <div className="custom-control custom-checkbox pl-1 align-self-center px-4"
        onClick={(event) => onCheckItem(event, product.id)}
        >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${product.id}`}
              checked={isSelect}
              label=""
            />
        </div>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-10 w-sm-100">
                <img
                  src={imageData()}
                  style={{height:"3rem", maxWidth : "4rem"}}
                  className="list-thumbnail responsive border-0 card-img-left"
                  alt='not found'
                  onError={(e)=>{e.target.onerror = null; e.target.src="https://img.icons8.com/plasticine/2x/no-image.png"}}
                
                />
              </div>
              <div to={`?p=${product.id}`} className="w-20 w-sm-100">
                <p className=" text-small mb-1 truncate">
                  {product.itemNumber}
                </p>
              </div>
              <div className="w-30 w-sm-100">
              {product.description25Char}
              </div>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {getPrice()}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ProductListView);