import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import ProductGroupListView from './ProductGroupListView';

function collect(props) {
  return { data: props.data };
}

const ProductGroupPageListing = ({
  deleteModal,
  openModal,
  addModal,
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((productGroup) =>
            <ProductGroupListView
              index = {items.indexOf(productGroup) + 1}
              key={productGroup.id}
              productGroup={productGroup}
              isSelect={selectedItems.includes(productGroup.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              openModal={openModal}
              deleteModal={deleteModal}
              addModal={addModal}
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

export default React.memo(ProductGroupPageListing);
