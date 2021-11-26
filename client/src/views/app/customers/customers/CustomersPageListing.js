import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import CustomersListView from './CustomersListView';

function collect(props) {
  return { data: props.data };
}

const CustomersPageListing = ({
  setModalBasic,
  openModal,
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  pagesize,
  deleteModal
}) => {

  return (
    <Row>
      {items.map((customer) =>
            <CustomersListView
              deleteModal = {deleteModal}
              index = {customer.id}
              key={customer.id}
              customer={customer}
              isSelect={selectedItems.includes(customer.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              openModal={openModal}
              setModalBasic={setModalBasic}
            />
      )}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(CustomersPageListing);
