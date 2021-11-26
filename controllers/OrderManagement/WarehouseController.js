const { Op, or } = require("sequelize");
const sequelize = require("../../config/database");
const Vendor = require("../../models/Vendor");
const Warehouse = require("../../models/Warehouse");

//? API to Create Warehouse
const createWarehouse = async (req, res) => {
  try {
    console.log(req.body);
    await Warehouse.create(req.body);
    return res.status(200).send("Warehouse Created Successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something Went Wrong!");
  }
};

//? API to List Warehouse
const getWarehouses = async (req, res) => {
  const page = req.params.page || 1;
  const pageSize = req.query.pageSize || 15;
  let orderBy = req.query.orderBy || "id";
  let orderManner = req.query.orderManner || "ASC";
  let searchItem = req.query.searchItem || "";
  try {
    const warehouses = await Warehouse.findAll({
      where: or(
        {
          name: {
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
    console.log(req.user);
    const count = await Warehouse.count();
    const totalPage = Math.ceil(count / pageSize);
    return res.status(200).json({
      data: warehouses,
      totalPage: totalPage,
      totalCount: count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Something Went Wrong!!!`);
  }
};

//? Get Warehouse by Id
const getWarehouse = async (req, res) => {
  const id = req.params.id;
  try {
    const warehouse = await Warehouse.findOne({
      where: { id },
    });
    if (!warehouse)
      return res.status(404).send("There is no Warehouse with the Provided Id");
    return res.status(200).send(warehouse);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something Went Wrong!");
  }
};

//? API to Update Warehouse Details
const updateWarehouse = async (req, res) => {
  const id = req.params.id;
  try {
    await Warehouse.update(req.body, { where: { id } });
    return res.status(200).send("Warehouse Updated Successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something Went Wrong!");
  }
};

//? API to Delete Warehouse(s)
const deleteWarehouse = async (req, res) => {
  try {
    if (typeof req.query.id == "string") {
      await Warehouse.destroy({ where: { id: parseInt(req.query.id) } });
      return res.status(200).send("Warehouse Deleted Successfully");
    } else {
      for (let id of req.query.id) {
        await Warehouse.destroy({ where: { id: parseInt(id) } });
      }
      return res.status(200).send("Warehouses Deleted Successfully");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something Went Wrong!");
  }
};

module.exports = {
  createWarehouse: createWarehouse,
  getWarehouses: getWarehouses,
  getWarehouse: getWarehouse,
  updateWarehouse: updateWarehouse,
  deleteWarehouse: deleteWarehouse,
};
