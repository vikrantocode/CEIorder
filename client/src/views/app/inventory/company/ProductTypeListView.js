import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductTypeListView = ({ openModal, deleteModal, index, category: type, isSelect, collect, onCheckItem }) => {

  return (
    <Colxx xxs="12" key={type.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={type.id} collect={collect}>
        <Card
          style={{height:'4rem'}}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div className="d-flex flex-grow-1 min-width-zero">
            <div className="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero">
              <div className="custom-control custom-checkbox align-self-center pl-0"
                style={{cursor:'pointer'}}
                onClick={(event) => onCheckItem(event, type.id)}
              >
                  <CustomInput
                    className="item-check"
                    type="checkbox"
                    id={`check_${type.id}`}
                    checked={isSelect}
                    onChange={() => {}}
                    label=""
                  />
              </div>
              <div className="w-10 w-sm-100 pl-5 align-self-center">
                <p className="mb-1 truncate">
                {type.id}
                </p>
              </div>
              <div className="w-10 w-sm-100 align-self-center">
                <p className="mb-1 truncate">
                Default
                </p>
              </div>
              <div className="w-25 w-sm-100 align-self-center pl-4">
                <p className="mb-1 truncate">
                {type.category}
                </p>
              </div>
              <div className="w-20 w-sm-100 align-self-center pl-4">
                <p className="mb-1 truncate">
                {type.category}
                </p>
              </div>
              <div className="w-20 w-sm-100 align-self-center pl-4">
                <p className="mb-1 truncate">
                {type.category}
                </p>
              </div>
              <div className="w-15 w-sm-100 align-self-center pl-4">
                <p className="mb-1 truncate">
                {type.category}
                </p>
              </div>
              <p className="w-15 w-sm-100 align-self-center pt-3">
              <FaEdit
                  onClick={()=>openModal(type.id)}
                  style={{ cursor: 'pointer'}}
                  id={type.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() => deleteModal(type.id)}
                  value={type.id}
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
export default React.memo(ProductTypeListView);
