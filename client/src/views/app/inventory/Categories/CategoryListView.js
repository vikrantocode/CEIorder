import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
const imageServer = 'http://cdn.linqusacorp.com/';
const CategoryListView = ({
  openModal,
  deleteModal,
  index,
  category,
  isSelect,
  collect,
  onCheckItem,
}) => {
  return (
    <Colxx xxs="12" key={category.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={category.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div
            className="custom-control custom-checkbox pl-1 align-self-center px-4"
            style={{ cursor: 'pointer' }}
            onClick={(event) => onCheckItem(event, category.id)}
          >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${category.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
          </div>
          <div className="custom-control custom-checkbox align-self-center pr-5">
            {index}
            {/* {category.id} */}
          </div>
          <div
            className="align-self-center mr-4"
            style={{
              height: '3.8rem',
              width: '3.8rem',
              backgroundImage: `url(${
                category.categoryimg
                  ? 'http://d3o5w1w6u67fah.cloudfront.net/' +
                    category.categoryimg
                  : 'http://d3o5w1w6u67fah.cloudfront.net/categoryImage/cart.jpg'
              })`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${category.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 ml-2 truncate">
                  {category.category}
                </p>
              </NavLink>
              <div className="w-15 w-sm-100">
                {category.status ? (
                  <Badge color="success" pill>
                    Active
                  </Badge>
                ) : (
                  <Badge color="warning" pill>
                    Inactive
                  </Badge>
                )}
              </div>
              <p className="w-15 w-sm-100 align-self-center pt-3">
                <FaEdit
                  onClick={() => openModal(category.id)}
                  style={{ cursor: 'pointer' }}
                  id={category.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() => deleteModal(category.id)}
                  value={category.id}
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

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CategoryListView);
