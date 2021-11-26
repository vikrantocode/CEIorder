import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from 'reactstrap/lib/Button';

const ProductGroupListView = ({ openModal, addModal, deleteModal, index, productGroup, isSelect, collect, onCheckItem }) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    console.log('called');
    axios.get(`/api/user-details?id=${productGroup.userId}`)
      .then(res => {
        setUser(res.data.data);
      })
      .catch(ex => {
        console.log(ex);
      })
  }, [productGroup] )

  return (
    <Colxx xxs="12" key={productGroup.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={productGroup.id} collect={collect}>
        <Card
          style={{height:'4rem'}}
          className={classnames('d-flex flex-row align-self-center', {
            active: isSelect,
          })}
        >
        <div className="custom-control custom-checkbox  align-self-center "
        onClick={(event) => onCheckItem(event, productGroup.id)}
        >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${productGroup.id}`}
              checked={isSelect}
              label=""
            />
        </div>
        <div  className="w-sm-100 px-5 align-self-center">
          {productGroup.id}
        </div>
          <div className="d-flex flex-grow-1 min-width-zero ml-0 pl-0">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center ml-0 pl-0">
              <div className="w-20 w-sm-100  ml-0 pl-2">
                <p className="list-item-heading mb-1 truncate">
                  {productGroup.name}
                </p>
              </div>
              <div className="w-10 w-sm-100 text-center mr-4">
                {productGroup.productsCount}
              </div>
              <div className="w-20 w-sm-100 text-center ml-2">
                {productGroup.updatedAt.split('T')[0]} {productGroup.updatedAt.split('T')[1].split('.')[0]}
              </div>
              <div className="w-20 w-sm-100 text-center">
              {user.email}
              </div>
              <p className=" w-10 w-sm-100">
                <FaEdit
                  onClick={()=>openModal(productGroup.id, productGroup.name)}
                  style={{ cursor: 'pointer'}}
                  id={productGroup.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() => deleteModal(productGroup.id)}
                  value={productGroup.id}
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading mx-2 "
                />
              </p>
              <div className="w-sm-100">
                  <Button onClick={()=>addModal(productGroup.id)} color='success' >Assign Product(s)</Button>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ProductGroupListView);
