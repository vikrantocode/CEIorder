import React, { useState, useEffect } from 'react';
import VendorPageHeading from './VendorPageHeading';
import ProductListView from '../Products/ProductListView';
import ProductListHeading from '../Products/ProductListHeadings';
import { useParams } from 'react-router';
import axios from 'axios';
const VendorProductList = ({ match }) => {
  const pageSizes = [15, 50, 100, 150, 200];
  const heading = 'Vendor Product List';
  const { id } = useParams();
  const [items, setItems] = useState([]);

  const fetchProductDetails = async () => {
    const { data, success } = await axios.get(
      `/api/inventory/getVendorAllProduct?vid=${id}`
    );
    console.log(
      data.data,
      'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
    );
    setItems(
      data.data.map((x) => {
        return { ...x };
      })
    );
    console.log(success);
  };
  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  const itemss = [
    {
      data: [
        {
          id: 99389,
          itemNumber: 'ZPPZUQCD128',
          packQuantity: 0,
          description25Char: 'DISINFECTANT,QUICK CL,LBE',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '55.04',
            costColumn1Price: '38.76',
          },
          imageDetail: { imageNameItem: '688831.JPG', imageNameProductLit: '' },
        },
        {
          id: 99388,
          itemNumber: 'ZPPR46124',
          packQuantity: 0,
          description25Char: 'SOAP,HAND,ANTIBAC,AMB',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '71.12',
            costColumn1Price: '47.41',
          },
          imageDetail: { imageNameItem: '688131.JPG', imageNameProductLit: '' },
        },
        {
          id: 99387,
          itemNumber: 'ZPPR46101',
          packQuantity: 0,
          description25Char: 'SOAP,HAND SOAP,12/CT,RD',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '78.24',
            costColumn1Price: '52.16',
          },
          imageDetail: { imageNameItem: '682923.JPG', imageNameProductLit: '' },
        },
        {
          id: 99386,
          itemNumber: 'ZPPR20824',
          packQuantity: 0,
          description25Char: 'SOAP,HND,CRM,1GAL',
          brandId: 48,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '119.92',
            costColumn1Price: '44.91',
          },
          imageDetail: { imageNameItem: '162838.JPG', imageNameProductLit: '' },
        },
        {
          id: 99385,
          itemNumber: 'ZPPR02301CT',
          packQuantity: 0,
          description25Char: 'DISINFECTANT,CLEANER&DEOD',
          brandId: 48,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '110.29',
            costColumn1Price: '41.68',
          },
          imageDetail: { imageNameItem: '162782.JPG', imageNameProductLit: '' },
        },
        {
          id: 99384,
          itemNumber: 'ZPP67923',
          packQuantity: 0,
          description25Char: 'DISINFECTANT,SPIRITII,CLR',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '55.99',
            costColumn1Price: '33.00',
          },
          imageDetail: { imageNameItem: '669500.JPG', imageNameProductLit: '' },
        },
        {
          id: 99383,
          itemNumber: 'ZPP67909',
          packQuantity: 0,
          description25Char: 'DISINFECTANT,SPIRIT II',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '92.69',
            costColumn1Price: '65.24',
          },
          imageDetail: { imageNameItem: '689396.JPG', imageNameProductLit: '' },
        },
        {
          id: 99382,
          itemNumber: 'ZPP650880',
          packQuantity: 0,
          description25Char: 'WIPES,CLEANEM SPIRITII,WH',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '52.99',
            costColumn1Price: '32.85',
          },
          imageDetail: { imageNameItem: '700733.JPG', imageNameProductLit: '' },
        },
        {
          id: 99381,
          itemNumber: 'ZPP416401',
          packQuantity: 0,
          description25Char: 'LUBRICANT,ZEP 2000,12,CLR',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '153.28',
            costColumn1Price: '97.00',
          },
          imageDetail: { imageNameItem: '690206.JPG', imageNameProductLit: '' },
        },
        {
          id: 99380,
          itemNumber: 'ZPP351501',
          packQuantity: 0,
          description25Char: 'DISINFECTANT,ZEPYNAMI,CLR',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '136.32',
            costColumn1Price: '90.88',
          },
          imageDetail: { imageNameItem: '670047.JPG', imageNameProductLit: '' },
        },
        {
          id: 99379,
          itemNumber: 'ZPP1050017',
          packQuantity: 0,
          description25Char: 'DISINFECTANT,SPRAY,CLR',
          brandId: 1996,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '102.72',
            costColumn1Price: '71.86',
          },
          imageDetail: { imageNameItem: '689180.JPG', imageNameProductLit: '' },
        },
        {
          id: 99378,
          itemNumber: 'ZPP1049470',
          packQuantity: 0,
          description25Char: 'SOAP,HAND,CLR,W/PUMP',
          brandId: 48,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '136.80',
            costColumn1Price: '75.84',
          },
          imageDetail: { imageNameItem: '307641.JPG', imageNameProductLit: '' },
        },
        {
          id: 99377,
          itemNumber: 'ZPP1049469',
          packQuantity: 0,
          description25Char: 'SOAP,HAND,CLR,NO PUMP',
          brandId: 48,
          pricesAndCost: {
            unitOfMeasure: 'CT',
            listPrice: '132.81',
            costColumn1Price: '75.15',
          },
          imageDetail: { imageNameItem: '307640.JPG', imageNameProductLit: '' },
        },
        {
          id: 99376,
          itemNumber: 'ZPP1049222',
          packQuantity: 0,
          description25Char: 'DISPENSER,HD,HAND SOAP',
          brandId: null,
          pricesAndCost: {
            unitOfMeasure: 'EA',
            listPrice: '56.40',
            costColumn1Price: '42.29',
          },
          imageDetail: { imageNameItem: '', imageNameProductLit: '' },
        },
        {
          id: 99375,
          itemNumber: 'ZPP1047565EA',
          packQuantity: 0,
          description25Char: 'LUBRICANT,AEROSOL,PTFE',
          brandId: 48,
          pricesAndCost: {
            unitOfMeasure: 'EA',
            listPrice: '13.21',
            costColumn1Price: '5.64',
          },
          imageDetail: { imageNameItem: '162790.JPG', imageNameProductLit: '' },
        },
      ],
      totalPage: 4502,
      totalItem: 67518,
    },
  ];
  return (
    <>
      <VendorPageHeading
        pageSizes={pageSizes}
        match={match}
        heading={heading}
      />
      {/* Table List Headings */}
      {items.length == 0 ? (
        ''
      ) : (
        <ProductListHeading
        //selectedItemsLength={selectedItems ? selectedItems.length : 0}
        //handleChangeSelectAll={handleChangeSelectAll}
        //itemsLength={items ? items.length : 0}
        />
      )}
      {items.map((product) => (
        <ProductListView
          index={items.indexOf(product) + 1}
          key={product.id}
          product={product}
        />
      ))}
    </>
  );
};

export default React.memo(VendorProductList);
