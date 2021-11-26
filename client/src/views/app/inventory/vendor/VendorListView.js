import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const imageServer = 'http://cdn.linqusacorp.com/';

const VendorListView = ({
  openModal,
  deleteModal,
  index,
  vendor,
  isSelect,
  collect,
  onCheckItem,
  match,
}) => {
  const history = useHistory();
  const data = [
    {
      firstName: 'aaaaaaaa',
      LastName: 'bbbbbbb',
      Business: 'Bussiness',
      Country: 'Country',
      Address: 'flat no, aaaa, city , state, country',
    },
  ];
  return (
    <Colxx xxs="12" key={vendor.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={vendor.id} collect={collect}>
        <Card
          style={{ height: '4rem' }}
          className={classnames('d-flex flex-row align-self-center ', {
            active: isSelect,
          })}
        >
          <div
            className="custom-control custom-checkbox pl-1 align-self-center px-4"
            style={{ cursor: 'pointer' }}
            onClick={(event) => onCheckItem(event, vendor.id)}
          >
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${vendor.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
            />
          </div>
          <div className="custom-control custom-checkbox align-self-center pr-5">
            {index}
          </div>

          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${vendor.id}`} className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate">{vendor.name}</p>
              </NavLink>
              <div className="w-20 w-sm-100 ml-0 pl-0">
                <p className="list-item-heading mb-1 truncate">
                  {vendor.email}
                </p>
              </div>
              <div className="w-10 w-sm-100 text-center">
                <p className="list-item-heading mb-1 truncate">
                  {`${vendor.productscount}`}
                </p>
              </div>
              <div
                className="w-10 w-sm-100 text-center"
                style={{ paddingRight: 10 }}
              >
                <p className="list-item-heading mb-1 truncate">
                  {`${vendor.brandCount}`}
                </p>
              </div>
              <p className="w-15 w-sm-100 align-self-center pt-3">
                <FaEye
                  onClick={() =>
                    window.open(
                      `${history.location.pathname}/detail/${vendor.id}`,
                      '_blank'
                    )
                  }
                  style={{ cursor: 'pointer' }}
                  className="w-20 w-sm-100 list-item-heading  mx-1 text-warning"
                />
                <FaEdit
                  //onClick={() => openModal(vendor.id)}
                  onClick={() =>
                    history.push({
                      pathname: `/app/inventory/edit-vendor/${vendor.id}`,
                      state: { detail: data },
                    })
                  }
                  style={{ cursor: 'pointer' }}
                  id={vendor.id}
                  className="w-20 w-sm-100 list-item-heading  mx-2 "
                />
                <FaTrash
                  onClick={() => deleteModal(vendor.id)}
                  value={vendor.id}
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
export default React.memo(VendorListView);
