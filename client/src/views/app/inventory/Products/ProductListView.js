import React from 'react';
import { Card, CustomInput } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const imageServer = 'https://d3o5w1w6u67fah.cloudfront.net/';
const ProductListView = ({
  deleteModal,
  product,
  isSelect,
  collect,
  onCheckItem,
  EditProduct,
  brand,
  brandDetail,
  brandimg,
}) => {
  const imageData = () => {
    if (product.imageDetail) {
      if (
        product.imageDetail.imageNameItem &&
        product.imageDetail.imageNameItem != null &&
        product.imageDetail.imageNameItem != undefined
      ) {
        if (
          product.imageDetail.imageNameItem.startsWith(
            'https://images.truevalue.com/'
          )
        ) {
          return `${product.imageDetail.imageNameItem}&ImageType=1&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`;
        } else if (
          product.imageDetail.imageNameItem.startsWith(
            'https://hoshizakiamerica.com/'
          ) ||
          product.imageDetail.imageNameItem.startsWith(
            'https://images.globalindustrial.com/'
          )
        ) {
          return `${product.imageDetail.imageNameItem}`;
        } else if (
          product.imageDetail.imageNameItem.startsWith('test-image/') ||
          product.imageDetail.imageNameItem.startsWith('productimages/') ||
          product.imageDetail.imageNameItem.startsWith('kroll/')
        ) {
          return `${imageServer}${product.imageDetail.imageNameItem}`;
        } else {
          return `${imageServer}productimages/${product.imageDetail.imageNameItem}`;
        }
      } else if (
        product.imageDetail.imageNameSKUGroup &&
        product.imageDetail.imageNameSKUGroup != null &&
        product.imageDetail.imageNameSKUGroup != undefined){
          return `${imageServer}productimages/${product.imageDetail.imageNameSKUGroup}`;

          
        }

 

      else return `${imageServer}productimages/${brandimg}`;
    } else {
      if (product['imageDetail.imageNameItem']) {
        if (
          product['imageDetail.imageNameItem'].startsWith(
            'https://images.truevalue.com/'
          )
        ) {
          return `${product['imageDetail.imageNameItem']}&ImageType=1&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`;
        } else if (
          product['imageDetail.imageNameItem'].startsWith(
            'https://hoshizakiamerica.com/'
          ) ||
          product['imageDetail.imageNameItem'].startsWith(
            'https://images.globalindustrial.com/'
          )
        ) {
          return `${product['imageDetail.imageNameItem']}`;
        } else if (
          product['imageDetail.imageNameItem'].startsWith('test-image/') ||
          product['imageDetail.imageNameItem'].startsWith('productimages/') ||
          product['imageDetail.imageNameItem'].startsWith('kroll/')
        ) {
          return `${imageServer}${product['imageDetail.imageNameItem']}`;
        } else {
          return `${imageServer}productimages/${product['imageDetail.imageNameItem']}`;
        }
      }
    }
  };
  const getPrice = () => {
    if (product.pricesAndCost) {
      return parseFloat(product.pricesAndCost.listPrice).toFixed(2);
    } else {
      return parseFloat(product['pricesAndCost.listPrice']).toFixed(2);
    }
  };
  const getCost = () => {
    if (product.pricesAndCost) {
      return parseFloat(product.pricesAndCost.costColumn1Price).toFixed(2);
    } else {
      return parseFloat(product['pricesAndCost.costColumn1Price']).toFixed(2);
    }
  };

  const history = useHistory();
  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div
            className="custom-control custom-checkbox pl-1 align-self-center px-4"
            style={{ cursor: 'pointer' }}
            onClick={(event) => {
              onCheckItem(event, product.id);
              console.log(event);
              console.log(product.id);
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
          <NavLink
            style={{ width: '5%' }}
            to={`${history.location.pathname}/detail/${product.id}`}
            className="align-self-center"
          >
            <img
              src={imageData()}
              style={{ height: '3rem', maxWidth: '4rem' }}
              className="list-thumbnail responsive border-0 card-img-left"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  `${imageServer}productimages/${brandimg}`;
              }}
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-10 w-sm-100 mr-2">
                <p className="mb-1 truncate">{product.itemNumber}</p>
              </div>
              <div className="w-30 w-sm-100 ml-2">
                <p className="list-item-heading mb-1 truncate">
                  {product.description25Char}
                </p>
              </div>
              <div className="w-10 w-sm-100">
                <p className="text-muted text-small mb-1 truncate">
                  {getPrice()}
                </p>
              </div>
              <div className=" w-10 w-sm-100 pl-2">
                <p className="text-muted text-small mb-1 truncate">
                  {getCost()}
                </p>
              </div>
              <div className=" w-10 w-sm-100 pl-3">
                <p className="text-muted text-small mb-1 truncate">
                  {product.packQuantity}
                </p>
              </div>
              <div className=" w-10 w-sm-100">
                <p className="text-muted text-small mb-1 truncate">{brand}</p>
              </div>
              <div className=" w-10 w-sm-100 pl-3">
                <p className="text-muted text-small mb-1 truncate">
                  {product.id} <i className="simple-icon-star text-warning"></i>
                </p>
              </div>
              <p className="w-10 w-sm-100 align-self-center pt-3">
                <FaEye
                  onClick={() =>
                    window.open(
                      `${history.location.pathname}/detail/${product.id}`,
                      '_blank'
                    )
                  }
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading  mx-1 text-warning"
                />

                <FaEdit
                  onClick={() => EditProduct(product.id)}
                  style={{ cursor: 'pointer' }}
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
export default React.memo(ProductListView);
