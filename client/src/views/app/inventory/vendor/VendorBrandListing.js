import React from 'react';
import { Card } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
const imageServer = 'https://d3o5w1w6u67fah.cloudfront.net/productimages/';

const brandListView = ({ index, brand }) => {
  return (
    <>
      {index === 1 && (
        <Colxx style={{ padding: '0' }} xxs="12" className="mb-2">
          <ContextMenuTrigger>
            <Card
              style={{
                height: '4rem',
                background: 'transparent',
                boxShadow: 'none',
              }}
              className="d-flex flex-row align-self-center"
            >
              <div
                className="align-self-center ml-4 pl-4 w-25 h5"
                style={{ width: '5%' }}
              >
                Image
              </div>
              <div className="pl-2 d-flex flex-grow-1 min-width-zero ml-5">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="w-35 w-sm-100 mr-2">
                    <p className="mb-1 truncate h5">Brand Short Name</p>
                  </div>
                  <div className="w-40 w-sm-100">
                    <p className="mb-1 truncate h5">Brand Long Name</p>
                  </div>
                </div>
              </div>
            </Card>
          </ContextMenuTrigger>
        </Colxx>
      )}
      <Colxx xxs="12" key={brand.id} className="mb-3">
        <ContextMenuTrigger data={brand.id}>
          <Card
            style={{ height: '4rem' }}
            className="d-flex flex-row align-self-center"
          >
            <div
              className="align-self-center ml-4 pl-2 w-25"
              style={{ width: '5%' }}
            >
              <img
                src={`${imageServer}${brand.imageNameBrandLogo}`}
                style={{ height: '3rem', width: '4rem' }}
                className="list-thumbnail responsive border-0 card-img-left"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://img.icons8.com/plasticine/2x/no-image.png';
                }}
              />
            </div>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero ml-5">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="w-35 w-sm-100 mr-2">
                  <p className="mb-1 truncate">{brand.brandShortName}</p>
                </div>
                <div className="w-40 w-sm-100">
                  <p className="text-muted text-small mb-1 truncate">
                    {brand.brandLongName}
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
export default React.memo(brandListView);
