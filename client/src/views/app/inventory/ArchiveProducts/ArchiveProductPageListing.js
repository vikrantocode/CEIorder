import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import ArchiveProductListView from './ArchiveProductListView';

function collect(props) {
  return { data: props.data };
}

const ArchiveProductPageListing = ({
  deleteModal,
  openModal,
  items,
  brand,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  EditProduct,
  setchange,
  change,
}) => {
  
  return (
    <Row>
      {/* {console.log(item)} */}
      {items.map((product) =>
            <ArchiveProductListView
            // {...console.log(product)}
            //  {...console.log(brand,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")}
              index = {items.indexOf(product) + 1}
              key={product.id} 
              product={product}
              isSelect={selectedItems.includes(product.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              openModal={openModal}
              deleteModal={deleteModal}
              EditProduct={EditProduct}
              brand={brand.length > 0 && product.brandId ? brand.find(element=> element.id === product.brandId)?.brandShortName : null}
      // {...console.log(brand.find(element=> element.id === product.brandId))}
            />
      )}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => { console.log(i); onChangePage(i); setchange(!change)}}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ArchiveProductPageListing);
