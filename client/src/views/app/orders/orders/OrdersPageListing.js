import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import OrdersListView from './OrdersListView';

function collect(props) {
  return { data: props.data };
}

const OrdersPageListing = ({
  deleteModal,
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
  pagesize
}) => {

  return (
    <Row>
      {items.map((order) =>
            <OrdersListView
              index = {order.id}
              key={order.id}
              order={order}
              isSelect={selectedItems.includes(order.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              openModal={openModal}
              setModalBasic={setModalBasic}
              deleteModal={deleteModal}
            />
      )}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i,pagesize)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(OrdersPageListing);
