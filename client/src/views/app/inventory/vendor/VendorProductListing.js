import React from 'react';
import { Card } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
const imageServer = 'https://d3o5w1w6u67fah.cloudfront.net/';

const isValidURL = (string) => {
  const res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};
const imageData = (image) => {
  if (image.imageNameItem) {
    console.log(image);
    if (image.imageNameItem.startsWith('https://images.truevalue.com/')) {
      return `${image.imageNameItem}&ImageType=1&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`;
    } else if (
      image.imageNameItem.startsWith('https://hoshizakiamerica.com/') ||
      image.imageNameItem.startsWith('https://images.globalindustrial.com/')
    ) {
      return `${image.imageNameItem}`;
    } else if (
      image.imageNameItem.startsWith('test-image/') ||
      image.imageNameItem.startsWith('productimages/') ||
      image.imageNameItem.startsWith('kroll/')
    ) {
      return `${imageServer}${image.imageNameItem}`;
    } else {
      return `${imageServer}productimages/${image.imageNameItem}`;
    }
  } else return `${imageServer}productimages/no-image.png`;
};

const ProductListView = ({ index, product }) => {
  return (
    <>
      {index === 1 && (
        <Colxx style={{ padding: '0' }} xxs="12" className="mb-2">
          <ContextMenuTrigger id="menu_id">
            <Card style={{ background: 'transparent', boxShadow: 'none' }}>
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
                  <div className=" w-10 w-sm-100 px-2">
                    <p className="list-item-heading mb-1 truncate font-weight-bold">
                      Cost
                    </p>
                  </div>
                  <div className=" w-10 w-sm-100 px-2">
                    <p className="list-item-heading mb-1 truncate font-weight-bold">
                      Qty
                    </p>
                  </div>
                  <div className=" w-10 w-sm-100 px-2">
                    <p className="list-item-heading mb-1 truncate font-weight-bold">
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </ContextMenuTrigger>
        </Colxx>
      )}
      <Colxx xxs="12" key={product.id} className="mb-3">
        <ContextMenuTrigger id="menu_id" data={product.id}>
          <Card
            style={{ height: '4rem' }}
            className="d-flex flex-row align-self-center"
          >
            <div
              className="align-self-center ml-4 pl-2"
              style={{ width: '5%' }}
            >
              <img
                src={imageData(product.imageDetail)}
                style={{ height: '3rem', maxWidth: '4rem' }}
                className="list-thumbnail responsive border-0 card-img-left"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://img.icons8.com/plasticine/2x/no-image.png';
                }}
              />
            </div>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero ml-5">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <div className="w-10 w-sm-100 mr-2">
                  <p className="mb-1 truncate">{product.itemNumber}</p>
                </div>
                <div className="w-30 w-sm-100 ml-2">
                  <p
                    onClick={() =>
                      window.open(
                        `/app/inventory/products/detail/${product.id}`,
                        '_blank'
                      )
                    }
                    style={{ cursor: 'pointer' }}
                    className="list-item-heading mb-1 truncate"
                  >
                    {product.description25Char}
                  </p>
                </div>
                <div className="w-10 w-sm-100">
                  <p className="text-muted text-small mb-1 truncate">
                    {product.pricesAndCost &&
                      `${product.pricesAndCost.listPrice}`}
                  </p>
                </div>
                <div className=" w-10 w-sm-100 pl-2">
                  <p className="text-muted text-small mb-1 truncate">
                    {product.pricesAndCost &&
                      product.pricesAndCost.costColumn1Price}
                  </p>
                </div>
                <div className=" w-10 w-sm-100 pl-3">
                  <p className="text-muted text-small mb-1 truncate">
                    {product.packQuantity}
                  </p>
                </div>
                <div className=" w-10 w-sm-100 pl-3">
                  <p className="text-muted text-small mb-1 truncate">
                    {product.id}{' '}
                    <i className="simple-icon-star text-warning"></i>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    </>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ProductListView);
