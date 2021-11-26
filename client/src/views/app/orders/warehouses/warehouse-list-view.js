import React, { useEffect } from 'react';
import axios from 'axios';
import { Card, CustomInput, Badge } from 'reactstrap';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const activated = {
  color: '#6600FF',
};

const WarehouseListView = ({
  edit,
  view,
  deleteObject,
  openModal,
  setModalBasic,
  index,
  deleteModal,
  order: warehouse,
  isSelect,
  collect,
  onCheckItem,
}) => {
  const history = useHistory();
  const [customer, setCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log(warehouse);
      try {
        const { data } = await axios.get(
          `/api/manage/users/details/${warehouse.userId}`
        );
        console.log(data.email);
        setUser(data.email);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Colxx xxs="12" key={warehouse.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={warehouse.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div
            className="custom-control custom-checkbox pl-1 align-self-center px-4"
            style={{ cursor: 'pointer' }}
            onClick={(event) => onCheckItem(event, warehouse.id)}
          >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${warehouse.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
          </div>
          <div className="w-10 w-sm-100 align-self-center">
            <p className="list-item-heading mb-1 truncate">{warehouse.id}</p>
          </div>
          <div className="w-25 w-sm-100 align-self-center">
            <p className=" ml-2 list-item-heading mb-1 truncate">
              {`${warehouse.name}`}
            </p>
          </div>
          <div className="w-25 w-sm-100 align-self-center">
            <p className="list-item-heading mb-1 truncate">
              {loading ? 'fetching...' : user}
            </p>
          </div>
          <div className="w-20 w-sm-100 pl-5 align-self-center">
            <p className="list-item-heading mb-1  truncate">
              {warehouse.createdAt.substr(0, warehouse.createdAt.indexOf('T'))}
            </p>
          </div>
          <div className="w-15 w-sm-100 pl-5 align-self-center">
            <p className="list-item-heading mb-1 truncate font-weight-bold">
              <i
                data-toggle="tooltip"
                title={warehouse.sellable ? 'Sellable' : 'Not Sellable'}
                className={`iconsminds-financial h4 ${
                  warehouse.sellable && 'text-warning'
                }`}
              ></i>
              <i
                data-toggle="tooltip"
                title={warehouse.isDefault ? 'Default' : 'Non Default'}
                className={`iconsminds-down-2 ml-3 h4 ${
                  warehouse.isDefault && 'text-warning'
                }`}
              ></i>
            </p>
          </div>
          <p className="w-15 w-sm-100 align-self-center pt-3">
            <FaEye
              onClick={() => {
                history.push(`/app/orders/view-warehouse/${warehouse.id}`);
              }}
              style={{ cursor: 'pointer' }}
              id={warehouse.id}
              className="w-20 w-sm-100 list-item-heading  mx-2 "
            />
            <FaEdit
              onClick={() => {
                history.push(`/app/orders/edit-warehouse/${warehouse.id}`);
              }}
              style={{ cursor: 'pointer' }}
              id={warehouse.id}
              className="w-20 w-sm-100 list-item-heading  mx-2 "
            />
            <FaTrash
              onClick={() => {
                deleteObject(warehouse.id);
              }}
              value={warehouse.id}
              style={{ cursor: 'pointer' }}
              className="w-20 w-sm-100 list-item-heading mx-2 "
            />
          </p>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(WarehouseListView);
