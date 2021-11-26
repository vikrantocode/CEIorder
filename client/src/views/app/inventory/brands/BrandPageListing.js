import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import BrandListView from './BrandListView';

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
  pagesize
}) => {
  return (
    <Row>
      {items.map((brand)=>
        <BrandListView
        index = {brand.id}
        brand={brand}
        collect={collect}
        isSelect={selectedItems.includes(brand.id)}
        onCheckItem={onCheckItem}
        openModal={openModal}
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

export default React.memo(VendorPageListing);
