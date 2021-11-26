import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import CategoryListView from './CategoryListView';

function collect(props) {
  return { data: props.data };
}

const CategoryPageListing = ({
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
      {items.map((category) =>
            <CategoryListView
              index = {category.id}
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
        onChangePage={(i) => onChangePage(i,pagesize)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(CategoryPageListing);
