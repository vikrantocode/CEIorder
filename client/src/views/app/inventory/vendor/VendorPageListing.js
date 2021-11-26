import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import VendorListView from './VendorListView';

function collect(props) {
  return { data: props.data };
}


const VendorPageListing = ({
  deleteModal,
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
  match
}) => {
  return (
    <Row>
      {items.map((vendor)=>
        <VendorListView
        index = {vendor.id}
        vendor={vendor}
        collect={collect}
        isSelect={selectedItems.includes(vendor.id)}
        onCheckItem={onCheckItem}
        openModal={openModal}
        deleteModal={deleteModal}
        match={match}
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

export default React.memo(VendorPageListing);
