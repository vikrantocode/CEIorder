const { Op, or } = require("sequelize");
const i = require("../../models/Product");
const Category = require("../../models/Categories");
const sequelize = require("../../config/database");
const csv = require("csvtojson");
const fs = require("fs");
const { uploadImage, deleteImages } = require("../AWS/aws.helper");

// Create Category
const createCategory = async (req, res) => {
  console.log(req.body);
  if (req.body.status === "Inactive") {
    req.body.status = false;
  } else {
    req.body.status = true;
  }
  uploadImage(req.file, "categoryImage", async (response) => {
    if (response.error) return res.status(500).send("Something Went Wrong!");
    try {
      console.log(response.Data.Key);
      let formData = {};
      formData.category = req.body.name;
      if (req.body.parentId === undefined) console.log("Inside");
      else formData.parentId = null;
      formData.status = req.body.status;
      formData.categoryimg = response.Data.Key;
      console.log(formData);
      await Category.create(formData);
      return res.status(200).send("Category Created Successfully");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something Went Wrong!");
    }
  });
};

// ADD CATEGORY
const addCategory = async (req, res) => {
  console.log(req.body);

  var status;
  if (req.body.status === "Inactive") {
    status = false;
  } else {
    status = true;
  }
  var data = {
    parentId: req.body.parentId,
    category: req.body.name.toLowerCase(),
    status: status,
  };
  if (req.body.categoryimg) {
    data.categoryimg = req.body.categoryimg;
  }

  Category.create(data)
    .then((response) => {
      const dateTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      req.io.emit("cei updates", {
        message: "Category Added",
        data: response.id,
        dateTime,
      });
      res.json({
        success: "Category added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: "something went wrong!",
      });
    });
};

// ADD CATEGORIES
const addCategories = async (req, res) => {
  const { data } = req.body;
  const categoryIds = [];
  for (i of data) {
    try {
      let { id } = await Category.create(i);
      categoryIds.push(id);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ [err.name]: [err.message] });
    }
  }
  const dateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  req.io.emit("cei updates", {
    message: "Category(s) Added",
    data: categoryIds,
    dateTime,
  });
  res.json({
    success: "Categories Added Successfully",
  });
};

// IMPORT CATEGORY
const importCategory = async (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      //console.log(jsonObj);
      solve(jsonObj, res, req.file.path);
    });
};

// MODIFY CSV FILE
async function solve(csvData, res, path) {
  var data = {
    parentId: null,
    category: null,
    status: true,
  };
  for (const el of csvData) {
    if ((await el.category) === "") {
      data = {
        parentId: null,
        category: el.parentId,
      };
      var aa = await Category.create(data);
      status = aa.dataValues.id;
      var value = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.parentId}' LIMIT 1`
      );
    } else if (el.a === "") {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.parentId}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.category,
      };
      await Category.create(data);
    } else if (el.b === "") {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.category}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.a,
      };
      await Category.create(data);
    } else if (el.c === "") {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.a}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.b,
      };
      await Category.create(data);
    } else if (el.d === "") {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.b}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.c,
      };
      await Category.create(data);
    } else if (el.e === "") {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.c}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.d,
      };
      await Category.create(data);
    } else if (el.f === "") {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.d}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.e,
      };
      await Category.create(data);
    } else if (el.e.length > 0) {
      var values = await Category.sequelize.query(
        `SELECT "id" FROM "categories" AS "categories" WHERE "categories"."category" = '${el.d}' LIMIT 1`
      );
      data = {
        parentId: values[0][0].id,
        category: el.e,
      };
      await Category.create(data);
    }
  }
  fs.unlink(
    path,
    () => {
      res.json({
        success: true,
      });
    },
    (err) => {
      console.log(err);
      res.json({
        success: false,
      });
    }
  );
}

// GET CATEGORIES
const getCategory = async (req, res) => {
  Category.findAll({})
    .then((response) => {
      // console.log(response)
      res.json({
        data: response,
      });
    })
    .catch((err) => {
      res.json({
        error: "something went wrong!",
      });
    });
};

const getCategories = async (req, res) => {
  const page = req.params.page || 1;
  const pageSize = req.query.pageSize || 15;
  const orderBy = req.query.orderBy || "id";
  const orderManner = req.query.orderManner || "ASC";
  const searchItem = req.query.searchItem || "";
  try {
    const categories = await Category.findAll({
      where: or(
        {
          category: {
            [Op.iLike]: `%${searchItem}%`,
          },
        },
        sequelize.where(sequelize.cast(sequelize.col("id"), "varchar"), {
          [Op.iLike]: `%${searchItem}%`,
        })
      ),
      order: [[`${orderBy}`, `${orderManner}`]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const count = await Category.count({
      where: or(
        {
          category: {
            [Op.iLike]: `%${searchItem}%`,
          },
        },
        sequelize.where(sequelize.cast(sequelize.col("id"), "varchar"), {
          [Op.iLike]: `%${searchItem}%`,
        })
      ),
    });
    return res.status(200).json({ data: categories, count });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Something Went Wrong!!!`);
  }
};

const deleteCategory = async (req, res) => {
  console.log(req.query.id);
  if (typeof req.query.id == "string") {
    const category = await Category.findOne({ where: { id: req.query.id } });
    category.destroy().then((response) => {
      console.log(response);
      deleteImages(category.categoryimg, null, (obj) => {
        console.log(obj);
      });
      console.log(category);
      const dateTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      req.io.emit("cei updates", {
        message: "Category Deleted",
        data: req.query.id,
        dateTime,
      });
      res.json({
        success: "Deleted Successfully",
      });
    });
  } else if (typeof req.query.id == "object") {
    const categoryIds = [];
    for (let i of req.query.id) {
      categoryIds.push(i);
      const category = await Category.findOne({ where: { id: i } });
      await category.destroy();
      deleteImages(category.categoryimg, (obj) => {
        console.log(obj);
      });
    }
    const dateTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    req.io.emit("cei updates", {
      message: "Category(s) Deleted",
      data: categoryIds,
      dateTime,
    });
    res.json({
      success: "Deleted Successfully",
    });
  }
};
// CATEGORY DETAILS
const categoryDetails = async (req, res) => {
  console.log(req.query);
  const details = await Category.findOne({ where: { id: req.query.id } });
  console.log(details);
  res.json({
    data: details,
  });
};
// Edit CATEGORY
const editCategory = async (req, res) => {
  if (req.file) {
    uploadImage(req.file, "categoryImage", async (response) => {
      if (response.error) return res.status(500).send("Something Went Wrong!");
      try {
        req.body.categoryimg = response.Data.Key;
        const category = await Category.findOne({
          where: { id: req.query.id },
        });
        const deleteImage = category.categoryimg;
        await category.update(req.body);
        deleteImages(deleteImage, null, (obj) => {
          console.log(obj);
          return res.status(200).send("Category Updated.");
        });
      } catch (err) {
        console.log(err);
        return res.status(500).send("Something Went Wrong!");
      }
    });
  } else {
    try {
      console.log(req.body);
      await Category.update(req.body, {
        where: { id: req.query.id },
      });
      return res.status(200).send("Category Updated.");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something Went Wrong!");
    }
  }
};
// Activate CATEGORY
const activate = async (req, res) => {
  console.log(req.query);
  const categoryIds = [];
  for (let i of req.query.id) {
    categoryIds.push(i);
    await Category.update({ status: true }, { where: { id: i } });
  }
  const dateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  req.io.emit("cei updates", {
    message: "Category(s) Activated",
    data: categoryIds,
    dateTime,
  });
  res.json({
    success: "Status Changed",
  });
};
// deactivate CATEGORY
const deactivate = async (req, res) => {
  const categoryIds = [];
  console.log(req.query);
  for (let i of req.query.id) {
    categoryIds.push(i);
    await Category.update({ status: false }, { where: { id: i } });
  }
  const dateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  req.io.emit("cei updates", {
    message: "Category(s) Deactivated",
    data: categoryIds,
    dateTime,
  });
  res.json({
    success: "Status Changed",
  });
};

//category search for filter dropdown
const CategorySearchfilter = async (req, res) => {
  sequelize
    .query(
      `SELECT "id","category" FROM public."categories" WHERE to_tsvector("category") @@ to_tsquery('${req.query.search}:*')`
    )
    .then((response) => {
      // console.log(response)
      res.json({
        success: true,
        data: response[0],
      });
    })
    .catch((err) => {
      res.json({
        error: "something went wrong!",
        err: err,
      });
    });
};

// Test API
const testHandler = async (req, res) => {
  const jsonCategories = await csv().fromFile(req.file.path);
  fs.unlink(req.file.path, async () => {
    const categories = jsonCategories.map((item) => {
      return {
        parent: {
          parentId: item.parentId,
          parentCategory: item.parentCategory,
          [item.parentId]: "",
        },
        category: {
          id: item.id,
          category: item.category,
          [item.id]: "",
        },
      };
    });
    return res.status(200).json(categories);
  });
};

module.exports = {
  createCategory,
  addCategory: addCategory,
  getCategory: getCategory,
  deleteCategory: deleteCategory,
  categoryDetails: categoryDetails,
  editCategory: editCategory,
  activate: activate,
  deactivate: deactivate,
  getCategories: getCategories,
  addCategories: addCategories,
  importCategory: importCategory,
  CategorySearchfilter: CategorySearchfilter,
  testHandler: testHandler,
};
