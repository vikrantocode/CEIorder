import React from 'react';
import { Row, Card } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import VendorBrandListing from './VendorBrandListing';

const BrandPageListing = ({ items, currentPage, totalPage, onChangePage }) => {
  console.log('pages : ' + currentPage, totalPage);
  return (
    <Row>
      {items.map((brand) => (
        <VendorBrandListing
          index={items.indexOf(brand) + 1}
          key={brand.id}
          brand={brand}
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

export default React.memo(BrandPageListing);
