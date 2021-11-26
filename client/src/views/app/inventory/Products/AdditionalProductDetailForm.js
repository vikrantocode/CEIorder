import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const AdditionalProductDetailForm = ({
    productData, 
    formData, 
    setformData
}) => {
    return ( 
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Dual SKU Number" />
                    </Label>
                    <Input
                    defaultValue={productData.dualSKUNumber}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        dualSKUNumber: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Dual SKU Sequence" />
                    </Label>
                    <Input
                    defaultValue={productData.dualSKUSequence}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        dualSKUSequence: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <div className="mt-3">
                <Label>
                    <IntlMessages id="Product Long Description(125 Chracter)" />
                </Label>
                <Input
                    type="textarea"
                    defaultValue={productData.description125Character }
                    onChange={(e) => {
                    setformData({
                    ...formData,
                    description125Character : e.target.value,
                    });
                }}
                />
            </div>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Energy Star Rated Code" />
                    </Label>
                    <Input
                    defaultValue={productData.energyStarRatedCode}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        energyStarRatedCode: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="EPA/CPG Code" />
                    </Label>
                    <Input
                    defaultValue={productData.itemNumberSubstitute}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        EPAOrCPGCode: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Item Number Revised" />
                    </Label>
                    <Input
                    defaultValue={productData.itemNumberRevised}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemNumberRevised: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Item Number Substitute" />
                    </Label>
                    <Input
                    defaultValue={productData.itemNumberSubstitute}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemNumberSubstitute: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Item Reference Code" />
                    </Label>
                    <Input
                    defaultValue={productData.itemReferenceCode}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemReferenceCode: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Item Qty Pre Auth Code" />
                    </Label>
                    <Input
                    defaultValue={productData.itemQtyPreAuthCode}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemQtyPreAuthCode: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Item Video Url" />
                </Label>
                <Input
                defaultValue={productData.itemVideoUrl}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    itemVideoUrl: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Content Quality Class" />
                </Label>
                <Input
                defaultValue={productData.contentQualityClass}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    contentQualityClass: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Consolidated Item Copy" />
                </Label>    
                <Input
                defaultValue={productData.consolidatedItemCopy}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    consolidatedItemCopy: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Discontinued To Be - Disco" />
                </Label>
                <Input
                defaultValue={productData.discontinuedToBeDisco}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    discontinuedToBeDisco: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Discontinued Date" />
                </Label>
                <Input
                type='date'
                defaultValue={productData.discontinuedDate}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    discontinuedDate: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Discontinued Source" />
                </Label>
                <Input
                defaultValue={productData.discontinuedSource}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    discontinuedSource: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="MSDS Code" />
                </Label>
                <Input
                defaultValue={productData.MSDSCode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    MSDSCode: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Non-Returnabe Code" />
                </Label>
                <Input
                defaultValue={productData.nonReturnabeCode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    nonReturnabeCode: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Recycle Ctnt Prcntg Pre Cons" />
                </Label>
                <Input
                defaultValue={productData.recycleCtntPrcntgPreCons}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    recycleCtntPrcntgPreCons: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Recycle Ctnt Prcntg Post Cons" />
                </Label>
                <Input
                defaultValue={productData.recycleCtntPrcntgPostCons}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    recycleCtntPrcntgPostCons: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Recycle Ctnt Prcntg Total" />
                </Label>
                <Input
                defaultValue={productData.recycleCtntPrcntgTotal}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    recycleCtntPrcntgTotal: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Shipping Class Code" />
                </Label>
                <Input
                defaultValue={productData.shippingClassCode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    shippingClassCode: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="SKU Group Id" />
                </Label>
                <Input
                defaultValue={productData.SKUGroupId}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    SKUGroupId: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="SKU Group Name" />
                </Label>
                <Input
                defaultValue={productData.SKUGroupName}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    SKUGroupName: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="SKU Group Video Url" />
                </Label>
                <Input
                defaultValue={productData.SKUGroupVideoUrl}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    SKUGroupVideoUrl: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="State Restriction Code" />
                </Label>
                <Input
                defaultValue={productData.stateRestrictionCode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    stateRestrictionCode: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Stock Status Code" />
                </Label>
                <Input
                defaultValue={productData.stockStatusCode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    stockStatusCode: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <label>
                    <IntlMessages id="Stocking Indicator Description" />
                </label>
                <Input
                    defaultValue={productData.stockingIndicatorDescr}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        stockingIndicatorDescr: e.target.value,
                        });
                    }}
                    />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="TAA/GSA Code" />
                </Label>
                <Input
                defaultValue={productData.TAAOrGSACode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    TAAOrGSACode: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="ULCode" />
                </Label>
                <Input
                defaultValue={productData.ULCode}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    ULCode: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Unit Conversion Factor" />
                </Label>
                <Input
                defaultValue={productData.unitConversionFactor}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    unitConversionFactor: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Unit Conversion Qty" />
                </Label>
                <Input
                defaultValue={productData.unitConversionQty}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    unitConversionQty: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Unit Of Measure Qty" />
                </Label>
                <Input
                defaultValue={productData.unitOfMeasureQty}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    unitOfMeasureQty: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Unit Within UOM" />
                </Label>
                <Input
                defaultValue={productData.unitWithinUOM}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    unitWithinUOM: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="UNSPSC" />
                </Label>
                <Input
                defaultValue={productData.UNSPSC}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    UNSPSC: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Stock Status ALBAN-ALB-16" />
                </Label>
                <Input
                defaultValue={productData.stockStatusALBANALB16}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    stockStatusALBANALB16: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="On Hand Qty ALBAN-ALB-16" />
                </Label>
                <Input
                defaultValue={productData.onHandQtyALBANALB16}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    onHandQtyALBANALB16: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Stock Status ATLAN-ATL-01" />
                </Label>
                <Input
                defaultValue={productData.stockStatusATLANATL01}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    stockStatusATLANATL01: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="On Hand Qty ATLAN-ATL-01" />
                </Label>
                <Input
                defaultValue={productData.onHandQtyATLANATL01}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    onHandQtyATLANATL01: e.target.value,
                    });
                }}
                />
            </Col>
            </Row>
            <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Stock Status ATLAN-AGA-40" />
                </Label>
                <Input
                defaultValue={productData.stockStatusATLANAGA40}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    stockStatusATLANAGA40: e.target.value,
                    });
                }}
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="On Hand Qty ATLAN-AGA-40" />
                </Label>
                <Input
                defaultValue={productData.onHandQtyATLANAGA40}
                onChange={(e) => {
                    setformData({
                    ...formData,
                    onHandQtyATLANAGA40: e.target.value,
                    });
                }}
                />
            </Col>
        </Row>
        </>
     );
}

export default AdditionalProductDetailForm;