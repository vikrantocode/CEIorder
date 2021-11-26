import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import VariantListView from './VariantListView';

function collect(props) {
  return { data: props.data };
}

const VariantPageListing = ({
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
      {items.map((variant) =>
            <VariantListView
              index = {items.indexOf(variant) + 1}
              key={variant.id}
              variant={variant}
              isSelect={selectedItems.includes(variant.id)}
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

export default React.memo(VariantPageListing);
