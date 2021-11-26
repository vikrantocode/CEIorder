import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const isValidURL = string => {
  const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

const imageServer = 'https://cdn.linqusacorp.com/productimages/'

const ArchiveProductListView = ({ deleteModal, product, isSelect, collect, onCheckItem,EditProduct,brand }) => {
  const imageData = () => {
    if(isValidURL(product['imageNameItem'])){
      console.log(`${product['imageNameItem']}&ImageType=3&NoImageType=3&ColorImageSize=2&LineArtImageSize=2}`)
      return `${product['imageNameItem']}&ImageType=3&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`
    } else {
      console.log(`${imageServer}${product['imageNameItem']}`)
      return `${imageServer}${product['imageNameItem']}`
    }
  }
  const getManufacturerPartNumber = () => {
    if(!product['manufacturerPartNumber']) return 'Not Available'
      return product['manufacturerPartNumber']
  }
  const getUPC = () => {
    return product['UPCRetail']
  }

  const history = useHistory()
  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          style={{height:'4rem'}}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
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
          <NavLink style={{width : "5%"}} to={`${history.location.pathname}/detail/${product.id}`} className='align-self-center'>
            <img
              src={imageData()}
              style={{height:"3rem", maxWidth : "4rem"}}
              className="list-thumbnail responsive border-0 card-img-left"
              alt='not found'
              onError={(e)=>{e.target.onerror = null; e.target.src="https://img.icons8.com/plasticine/2x/no-image.png"}}
              
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
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
              <div className="w-20 w-sm-100">
                <p className="text-muted text-small mb-1 truncate">
                {getManufacturerPartNumber()}
                </p>
              </div>
              <div className=" w-20 w-sm-100 pl-3">
                <p className="text-muted text-small mb-1 truncate">
                {getUPC()}
                </p>
              </div>
              <p className="w-10 w-sm-100 align-self-center pt-3">
                <FaEye
                    onClick={()=>window.open(`/app/inventory/products/detail/${product.id}`, "_blank")}
                    style={{ cursor: 'pointer'}}
                    className="w-20 w-sm-100 list-item-heading  mx-1 text-warning"
                />
              
                <FaEdit
                    onClick={()=>EditProduct(product.id)}
                    style={{ cursor: 'pointer'}}
                    id={product.id}
                    className="w-20 w-sm-100 list-item-heading  mx-1 text-info"
                />
              
                <FaTrash
                  onClick={() => deleteModal(product.id)}
                  value={product.id}
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading mx-1 text-danger"
                />
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ArchiveProductListView);