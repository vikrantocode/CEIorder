import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
const imageServer = 'https://d3o5w1w6u67fah.cloudfront.net/';

const BrandListView = ({
  openModal,
  deleteModal,
  index,
  brand,
  isSelect,
  collect,
  onCheckItem,
}) => {
  return (
    <Colxx xxs="12" key={brand.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={brand.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div
            className="custom-control custom-checkbox pl-1 align-self-center px-4"
            style={{ cursor: 'pointer' }}
            onClick={(event) =>
              onCheckItem(event, brand.id, brand.imageNameBrandLogo)
            }
          >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${brand.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
          </div>
          <div className="custom-control custom-checkbox align-self-center px-5 w-15">
            {index}
          </div>
          <div className="w-15">
            <img
              src={`${imageServer}productimages/${brand.imageNameBrandLogo}`}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://res.cloudinary.com/nikitaocode/image/upload/v1610533300/cart_vaj8qb.png';
              }}
              style={{ height: '3.5rem', width: '3.5rem' }}
              className="list-thumbnail responsive border-0 px-2 pt-1 w-10"
            />
          </div>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-30 w-sm-100 ml-2">
                <p className="list-item-heading mb-1 truncate">
                  {brand.brandShortName}
                </p>
              </div>
              <div className="w-30 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {brand.brandLongName}
                </p>
              </div>
              <div className="w-10 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {brand.productscount}
                </p>
              </div>
              <p className="w-15 w-sm-100 align-self-center pt-3">
                <FaEdit
                  onClick={() => openModal(brand.id)}
                  style={{ cursor: 'pointer' }}
                  id={brand.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() =>
                    deleteModal(brand.id, brand.imageNameBrandLogo)
                  }
                  value={brand.id}
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading mx-2 "
                />
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};
export default React.memo(BrandListView);
