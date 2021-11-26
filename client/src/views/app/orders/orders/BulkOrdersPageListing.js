import React from 'react';
import { Row } from 'reactstrap';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import OrdersListView from './BulkOrdersListView';

function collect(props) {
  return { data: props.data };
}

const OrdersPageListing = ({
  deleteModal,
  setModalBasic,
  items,
  onContextMenu,

}) => {

  return (
    <Row>
      {items.map((order, index) =>
            <OrdersListView
              index = {index+1}
              key={order.id}
              order={order}
              collect={collect}
              setModalBasic={setModalBasic}
              deleteModal={deleteModal}
            />
      )}
      <ContextMenuContainer
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(OrdersPageListing);
