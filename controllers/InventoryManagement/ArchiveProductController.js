const { QueryTypes } = require('sequelize');
const sequelize = require('../../config/database')

const archiveProducts = async (req, res) => {
    var perPage = req.query.pagesize || 15
    var page = req.params.page || 1
    let columnOrder = req.query.orderBy
    let orderManner = req.query.orderManner
    let products;
    console.log(req.query)
    console.log(req.params)
    if(searchItem = req.query.searchItem){
        if(columnOrder.split('.')[1]) {
            products = await sequelize.query(`
            SELECT "basicProductDetails"."id",
            "basicProductDetails"."description25Char",
            "basicProductDetails"."itemNumber",
            "imageDetails"."imageNameItem",
            "manufacturers"."manufacturerPartNumber",
            "upcs"."UPCRetail"
            FROM public."basicProductDetails" as "basicProductDetails"
            INNER JOIN "upcs" AS "upcs"
            ON "basicProductDetails".id="upcs"."basicProductDetailId"
            INNER JOIN "imageDetails" AS "imageDetails"
            ON "basicProductDetails".id="imageDetails"."basicProductDetailId"
            INNER JOIN "manufacturers" AS "manufacturers"
            ON "basicProductDetails".id="manufacturers"."basicProductDetailId"
            WHERE "upcs"."UPCRetail" IN (SELECT "UPCRetail"
            FROM public."upcs"
            GROUP BY "UPCRetail"
            HAVING count(*) > 1) AND 
            ("basicProductDetails"."itemNumber" ILIKE '%${searchItem}%' OR 
            "basicProductDetails"."description25Char" ILIKE '%${searchItem}%' OR
            "upcs"."UPCRetail" ILIKE '%${searchItem}%'  OR
            "manufacturers"."manufacturerPartNumber" ILIKE '%${searchItem}%'
            )
            ORDER BY "${columnOrder.split('.')[0]}"."${columnOrder.split('.')[1]}" ${orderManner} LIMIT ${perPage} OFFSET ${(page-1)* perPage};
            `, { type : QueryTypes.SELECT});
        } else {
            products = await sequelize.query(`
            SELECT "basicProductDetails"."id",
            "basicProductDetails"."description25Char",
            "basicProductDetails"."itemNumber",
            "imageDetails"."imageNameItem",
            "manufacturers"."manufacturerPartNumber",
            "upcs"."UPCRetail"
            FROM public."basicProductDetails" as "basicProductDetails"
            INNER JOIN "upcs" AS "upcs"
            ON "basicProductDetails".id="upcs"."basicProductDetailId"
            INNER JOIN "imageDetails" AS "imageDetails"
            ON "basicProductDetails".id="imageDetails"."basicProductDetailId"
            INNER JOIN "manufacturers" AS "manufacturers"
            ON "basicProductDetails".id="manufacturers"."basicProductDetailId"
            WHERE "upcs"."UPCRetail" IN (SELECT "UPCRetail"
            FROM public."upcs"
            GROUP BY "UPCRetail"
            HAVING count(*) > 1) AND 
            ("basicProductDetails"."itemNumber" ILIKE '%${searchItem}%' OR 
            "basicProductDetails"."description25Char" ILIKE '%${searchItem}%' OR
            "upcs"."UPCRetail" ILIKE '%${searchItem}%'  OR
            "manufacturers"."manufacturerPartNumber" ILIKE '%${searchItem}%'
            )
            ORDER BY "basicProductDetails"."${columnOrder}" ${orderManner} LIMIT ${perPage} OFFSET ${(page-1)* perPage};
            `, { type : QueryTypes.SELECT});
        }
        result = await sequelize.query(`SELECT count(*)
        FROM public."basicProductDetails" as "basicProductDetails"
        INNER JOIN "upcs" AS "upcs"
        ON "basicProductDetails".id="upcs"."basicProductDetailId"
        INNER JOIN "imageDetails" AS "imageDetails"
        ON "basicProductDetails".id="imageDetails"."basicProductDetailId"
        INNER JOIN "pricesAndCosts" AS "pricesAndCosts"
        ON "basicProductDetails".id="pricesAndCosts"."basicProductDetailId"
        INNER JOIN "manufacturers" AS "manufacturers"
        ON "basicProductDetails".id="manufacturers"."basicProductDetailId"
        WHERE ("upcs"."UPCRetail" IN (SELECT "UPCRetail"
        FROM public."upcs"
        GROUP BY "UPCRetail"
        HAVING count(*) > 1) AND 
        ("basicProductDetails"."itemNumber" ILIKE '%${searchItem}%' OR 
        "basicProductDetails"."description25Char" ILIKE '%${searchItem}%' OR
        "upcs"."UPCRetail" ILIKE '%${searchItem}%'  OR
        "manufacturers"."manufacturerPartNumber" ILIKE '%${searchItem}%'
        ))`, { type : QueryTypes.SELECT})
    } else {
        if(columnOrder.split('.')[1]) {
            products = await sequelize.query(`
            SELECT "basicProductDetails"."id",
            "basicProductDetails"."description25Char",
            "basicProductDetails"."itemNumber",
            "imageDetails"."imageNameItem",
            "manufacturers"."manufacturerPartNumber",
            "upcs"."UPCRetail"
            FROM public."basicProductDetails" as "basicProductDetails"
            INNER JOIN "upcs" AS "upcs"
            ON "basicProductDetails".id="upcs"."basicProductDetailId"
            INNER JOIN "imageDetails" AS "imageDetails"
            ON "basicProductDetails".id="imageDetails"."basicProductDetailId"
            INNER JOIN "manufacturers" AS "manufacturers"
            ON "basicProductDetails".id="manufacturers"."basicProductDetailId"
            WHERE "upcs"."UPCRetail" IN (SELECT "UPCRetail"
            FROM public."upcs"
            GROUP BY "UPCRetail"
            HAVING count(*) > 1)
            ORDER BY "${columnOrder.split('.')[0]}"."${columnOrder.split('.')[1]}" ${orderManner} LIMIT ${perPage} OFFSET ${(page-1)* perPage};
            `, { type : QueryTypes.SELECT});
        } else {
            products = await sequelize.query(`
            SELECT "basicProductDetails"."id",
            "basicProductDetails"."description25Char",
            "basicProductDetails"."itemNumber",
            "imageDetails"."imageNameItem",
            "manufacturers"."manufacturerPartNumber",
            "upcs"."UPCRetail"
            FROM public."basicProductDetails" as "basicProductDetails"
            INNER JOIN "upcs" AS "upcs"
            ON "basicProductDetails".id="upcs"."basicProductDetailId"
            INNER JOIN "imageDetails" AS "imageDetails"
            ON "basicProductDetails".id="imageDetails"."basicProductDetailId"
            INNER JOIN "manufacturers" AS "manufacturers"
            ON "basicProductDetails".id="manufacturers"."basicProductDetailId"
            WHERE "upcs"."UPCRetail" IN (SELECT "UPCRetail"
            FROM public."upcs"
            GROUP BY "UPCRetail"
            HAVING count(*) > 1)
            ORDER BY "basicProductDetails"."${columnOrder}" ${orderManner} LIMIT ${perPage} OFFSET ${(page-1)* perPage};
            `, { type : QueryTypes.SELECT});
        }
        result = await sequelize.query(`
        SELECT count(*)
        FROM public."basicProductDetails" as "basicProductDetails"
        INNER JOIN "upcs" AS "upcs"
        ON "basicProductDetails".id="upcs"."basicProductDetailId"
        WHERE "upcs"."UPCRetail" IN (SELECT "UPCRetail"
        FROM public."upcs"
        GROUP BY "UPCRetail"
        HAVING count(*) > 1);
        `, { type : QueryTypes.SELECT});
    }
    count = result[0].count
    const totalPage = Math.ceil(count / perPage)
    return res.status(200).json({
        data: products,
        totalPage: totalPage,
        totalItem : count });
}

module.exports = {
    archiveProducts : archiveProducts
}