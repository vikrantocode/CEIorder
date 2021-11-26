import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import WareHousesListView from './warehouse-list-view';

function collect(props) {
  return { data: props.data };
}

const WarehousesPageListing = ({
  setModalBasic,
  edit,
  view,
  deleteObject,
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
}) => {
  return (
    <Row>
      {items.map((order) => (
        <WareHousesListView
          edit={edit}
          view={view}
          deleteObject={deleteObject}
          index={order.id}
          key={order.id}
          order={order}
          isSelect={selectedItems.includes(order.id)}
          collect={collect}
          onCheckItem={onCheckItem}
          openModal={openModal}
          setModalBasic={setModalBasic}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i, pagesize)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(WarehousesPageListing);
