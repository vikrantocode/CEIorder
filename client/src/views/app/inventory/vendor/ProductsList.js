import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../../containers/pages/Pagination';
import ProductView from  './ProductView'

const ProductPageListing = ({
  getData,
  lastSearched,
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onChangePage,
  setchange,
  change,
}) => {
  return (
    <Row>
      {/* {console.log(item)} */}
      {items.map((product) =>
            <ProductView
            // {...console.log(product)}
            //  {...console.log(brand,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")}
              index = {items.indexOf(product) + 1}
              key={product.id} 
              product={product}
              isSelect={selectedItems.includes(product.id)}
              onCheckItem={onCheckItem}
      // {...console.log(brand.find(element=> element.id === product.brandId))}
            />
      )}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => { console.log(i); onChangePage(i); getData(i);}}
      />
    </Row>
  );
};

export default React.memo(ProductPageListing);
