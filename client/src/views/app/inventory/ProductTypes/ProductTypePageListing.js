import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import ProductTypeListView from './ProductTypeListView';

function collect(props) {
  return { data: props.data };
}

const ProductTypePageListing = ({
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
}) => {
  return (
    <Row>
      {items.map((category) =>
            <ProductTypeListView
              index = {items.indexOf(category) + 1}
              key={category.id}
              category={category}
              isSelect={selectedItems.includes(category.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              openModal={openModal}
              deleteModal={deleteModal}
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

export default React.memo(ProductTypePageListing);
