import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VariantListView = ({ openModal, deleteModal, index, variant, isSelect, collect, onCheckItem }) => {

  return (
    <Colxx xxs="12" key={variant.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={variant.id} collect={collect}>
        <Card
          style={{height:'4rem'}}
          className={classnames('d-flex flex-row align-self-center', {
            active: isSelect,
          })}
        >
        <div className="custom-control custom-checkbox pl-1 align-self-center px-4"
        onClick={(event) => onCheckItem(event, variant.id)}
        >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${variant.id}`}
              checked={isSelect}
              label=""
            />
        </div>
        <div className="custom-control custom-checkbox align-self-center pr-5">
          {index}
        </div>
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${variant.id}`} className="w-25 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {variant.variant}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-10 w-sm-100">
                {variant.attributes.join(" | ")}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {variant.categories.join(", ")}
              </p>
              <div className="w-10 w-sm-100">
              {variant.status ? <Badge color="success" pill>
                  Active
                  </Badge> :<Badge color="warning" pill>
                  Inactive
                  </Badge>}
              </div>
              <p className="w-10 w-sm-100 align-self-center pt-3">
              
              <FaEdit
                  onClick={()=>openModal(variant.id)}
                  style={{ cursor: 'pointer'}}
                  id={variant.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() => deleteModal(variant.id)}
                  value={variant.id}
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
export default React.memo(VariantListView);
