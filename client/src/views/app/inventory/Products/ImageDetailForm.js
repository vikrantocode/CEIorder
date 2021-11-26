import React, { useState } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';

const isValidURL = (str) => {
  return str.startsWith('http');
};

const styles = {
  productImage: {
    height: '8rem',
    width: '8rem',
  },
  productGroupImage: {
    height: '5rem',
    width: '5rem',
  },
};

const defaultImage =
  'https://res.cloudinary.com/nikitaocode/image/upload/v1610533300/cart_vaj8qb.png';

const ImageDetailForm = ({
  productData,
  picture,
  setPicture,
  setTempPicture,
}) => {
  const [productImage, setProductImage] = useState(null);
  const [imageNameItemAlt, setImageNameItemAlt] = useState(null);
  const [lineDrawingImage, setLineDrawingImage] = useState(null);
  const [MSDSImage, setMSDSImage] = useState(null);
  const [productLitImage, setProductLitImage] = useState(null);
  const [SKUGroupImages, setSKUGroupImages] = useState(null);
  const [altSKUGroupImages, setAltSKUGroupImages] = useState(null);
  const [imageNameSwatches, setImageNameSwatches] = useState(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const { name } = e.target;
      setTempPicture(e.target.files[0]);
      const imageData = [];
      for (let i = 0; i < e.target.files.length; i++) {
        imageData.push(e.target.files[i]);
      }
      console.log(imageData);
      setPicture({ ...picture, [name]: e.target.files });
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (name === 'imageNameItem') setProductImage(reader.result);
        else if (name === 'imageNameItemAlt')
          setImageNameItemAlt(reader.result);
        else if (name === 'imageNameLineDrawing')
          setLineDrawingImage(reader.result);
        else if (name === 'imageNameMSDSPDF') setMSDSImage(reader.result);
        else if (name === 'imageNameProductLit')
          setProductLitImage(reader.result);
        else if (name === 'imageNameSKUGroup') setSKUGroupImages(reader.result);
        else if (name === 'imageNameSKUGroupAlt')
          setAltSKUGroupImages(reader.result);
        else if (name === 'imageNameSwatches')
          setImageNameSwatches(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <Row>
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12" className="text-center">
          <h5 className="mb-3 h6">Product Image</h5>
          {console.log(
            `https://d3o5w1w6u67fah.cloudfront.net/productimages/${productData.imageNameItem}`
          )}
          {productImage ? (
            <img style={styles.productImage} src={productImage} alt="" />
          ) : (
            <img
              style={styles.productImage}
              src={
                productData.imageNameItem &&
                isValidURL(productData.imageNameItem)
                  ? `${productData.imageNameItem}&ImageType=3&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`
                  : `https://d3o5w1w6u67fah.cloudfront.net/productimages/${productData.imageNameItem}`
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://img.icons8.com/plasticine/2x/no-image.png';
              }}
            />
          )}
          <br />
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameItem"
          >
            <IntlMessages id="Change Image" />
          </Label>
          <Input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            name="imageNameItem"
            id="imageNameItem"
          />
        </Colxx>
      </Row>
      <Separator className="my-3" />
      <Row>
        <Colxx sm="4" xxs="4" md="4" lg="4" xl="4" className="text-center">
          <h5 className="mb-3 h6">Line Drawing Image</h5>
          {lineDrawingImage ? (
            <img style={styles.productImage} src={lineDrawingImage} alt="" />
          ) : (
            <img
              style={styles.productImage}
              src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${productData.imageNameLineDrawing}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://img.icons8.com/plasticine/2x/no-image.png';
              }}
            />
          )}
          <br />
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameLineDrawing"
          >
            <IntlMessages id="Change Line Drawing Image" />
          </Label>
          <Input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameLineDrawing"
            name="imageNameLineDrawing"
          />
        </Colxx>

        <Colxx sm="4" xxs="4" md="4" lg="4" xl="4" className="text-center">
          <h5 className="mb-3 h6">MSDS PDF Image</h5>
          {MSDSImage ? (
            <img style={styles.productImage} src={MSDSImage} alt="" />
          ) : (
            <img
              style={styles.productImage}
              src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${productData.imageNameMSDSPDF}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://img.icons8.com/plasticine/2x/no-image.png';
              }}
            />
          )}
          <br />
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameMSDSPDF"
          >
            <IntlMessages id="Change MSDS Image" />
          </Label>
          <Input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameMSDSPDF"
            name="imageNameMSDSPDF"
          />
        </Colxx>
        <Colxx sm="4" xxs="4" md="4" lg="4" xl="4" className="text-center">
          <h5 className="mb-3 h6">Product Lit Image</h5>
          {productLitImage ? (
            <img style={styles.productImage} src={productLitImage} alt="" />
          ) : (
            <img
              style={styles.productImage}
              src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${productData.imageNameProductLit}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://img.icons8.com/plasticine/2x/no-image.png';
              }}
            />
          )}
          <br />
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameProductLit"
          >
            <IntlMessages id="Change Product Lit Image" />
          </Label>
          <Input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameProductLit"
            name="imageNameProductLit"
          />
        </Colxx>
      </Row>
      <Separator className="my-3" />
      <Row>
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <h5 className="mt-3 h6">Product Image Alt</h5>
        </Colxx>
        {imageNameItemAlt ? (
          <img style={styles.productImage} src={imageNameItemAlt} alt="" />
        ) : (
          productData.imageNameItemAlt &&
          productData.imageNameItemAlt.split(',').map((member) => (
            <Colxx sm="3" xxs="3" md="3" lg="3" xl="3" className="text-center">
              <img
                style={styles.productImage}
                src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${member.trim()}`}
                alt="Not Found"
              />
              <br />
            </Colxx>
          ))
        )}
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameItemAlt"
          >
            <IntlMessages id="Change Product Image Alt" />
          </Label>
          <input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameItemAlt"
            name="imageNameItemAlt"
            multiple
          />
        </Colxx>
      </Row>
      <Separator className="my-3" />
      <Row>
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <h5 className="mt-3 h6">Product SKU Group Images </h5>
        </Colxx>
        {SKUGroupImages ? (
          <img style={styles.productImage} src={SKUGroupImages} alt="" />
        ) : (
          productData.imageNameSKUGroup &&
          productData.imageNameSKUGroup.split(',').map((member) => (
            <Colxx sm="3" xxs="3" md="3" lg="3" xl="3" className="text-center">
              <img
                style={styles.productImage}
                src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${member.trim()}`}
                alt="Not Found"
              />
              <br />
            </Colxx>
          ))
        )}
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameSKUGroup"
          >
            <IntlMessages id="Change SKU Group Images" />
          </Label>
          <input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameSKUGroup"
            name="imageNameSKUGroup"
            multiple
          />
        </Colxx>
      </Row>
      <Separator className="my-3" />
      <Row>
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <h5 className="mt-3 h6">Alt Product SKU Group Images </h5>
        </Colxx>
        {altSKUGroupImages ? (
          <img style={styles.productImage} src={altSKUGroupImages} alt="" />
        ) : (
          productData.imageNameSKUGroupAlt &&
          productData.imageNameSKUGroupAlt.split(',').map((member) => (
            <Colxx sm="3" xxs="3" md="3" lg="3" xl="3" className="text-center">
              <img
                style={styles.productImage}
                src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${member.trim()}`}
                alt="Not Found"
              />
              <br />
            </Colxx>
          ))
        )}
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameSKUGroupAlt"
          >
            <IntlMessages id="Change Alt SKU Group Images" />
          </Label>
          <input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameSKUGroupAlt"
            name="imageNameSKUGroupAlt"
            multiple
          />
        </Colxx>
      </Row>
      <Separator className="my-3" />
      <Row>
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <h5 className="mt-3 h6"> Swatches Image</h5>
        </Colxx>
        {imageNameSwatches ? (
          <img style={styles.productImage} src={imageNameSwatches} alt="" />
        ) : (
          productData.imageNameSwatches &&
          productData.imageNameSwatches.split(',').map((member) => (
            <Colxx sm="3" xxs="3" md="3" lg="3" xl="3" className="text-center">
              <img
                style={styles.productImage}
                src={`https://d3o5w1w6u67fah.cloudfront.net/productimages/${member.trim()}`}
                alt="Not Found"
              />
              <br />
            </Colxx>
          ))
        )}
        <Colxx sm="12" xxs="12" md="12" lg="12" xl="12">
          <Label
            className="font-weight-bold edit-profile my-3 text-primary text-small"
            for="imageNameSwatches"
          >
            <IntlMessages id="Change Swatches Image" />
          </Label>
          <input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            id="imageNameSwatches"
            name="imageNameSwatches"
            multiple
          />
        </Colxx>
      </Row>
    </>
  );
};

export default ImageDetailForm;
