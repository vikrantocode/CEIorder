import React from 'react';
import { Row, Card } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import VendorProductListing from './VendorProductListing';

function collect(props) {
  return { data: props.data };
}

const ProductPageListing = ({
  items,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  console.log(currentPage, totalPage);
  return (
    <Row>
      {items.map((product) => (
        <VendorProductListing
          index={items.indexOf(product) + 1}
          key={product.id}
          product={product}
          collect={collect}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => {
          console.log(i);
          onChangePage(i);
        }}
      />
      <ContextMenuContainer />
    </Row>
  );
};

export default React.memo(ProductPageListing);
