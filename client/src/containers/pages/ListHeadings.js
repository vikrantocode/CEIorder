import React from 'react'
import { Card, CustomInput } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { NotificationManager } from '../../components/common/react-notifications';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

function ListHeadings({selectedItemsLength,handleChangeSelectAll,itemsLength}) {
    return (
        <Colxx style={{padding:"0"}} xxs="12" className="mb-3">
        <ContextMenuTrigger id="menu_id" >
          {/* <Card style={{height:"4rem"}} className='justify-content-center'> */}
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              
              <div style={{padding:'.5rem'}} className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
             
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4 ">
              <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                />
              </div>
              <div className="pl-2 align-self-center pr-4">
                </div>
              <div className="custom-control pl-1 align-self-center pr-5">
                
              </div>
                <NavLink to={`?p=$2`} className="w-15 w-sm-100">
                  <p
                    style={{ textTransform: 'capitalize' }}
                    className="list-item-heading mb-1 truncate font-weight-bold"
                  >
                    First Name
                  </p>
                </NavLink>
                <p className="mb-1 w-15 w-sm-100 list-item-heading font-weight-bold">
                  {' '}
                  Last Name
                </p>
                <p className="mb-1 w-20 w-sm-100 list-item-heading font-weight-bold">
                  {' '}
                  Email
                </p>
                <p   className="mb-1 w-10 w-sm-100 list-item-heading truncate font-weight-bold">
                  Role
                </p>
                
                <p style={{marginRight:'1rem'}} className="mb-1 w-10 w-sm-100 list-item-heading truncate font-weight-bold">
                  Status
                </p>

                
                <p className="mb-1 w-2 w-sm-100 list-item-heading">
                {/* Edit */}
                </p>
                
                <p className="mb-1 w-2 w-sm-100 list-item-heading">
                {/* Delete */}
                </p>
              </div>
            </div>
          {/* </Card> */}
        </ContextMenuTrigger>
      </Colxx>
    )
}

export default ListHeadings
