var q = require("q");
var CustomerModels = require("./userModel");

function CustomerServices() {
  async function GetOne(condition) {
    try {
      return await CustomerModels.findOne(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  async function GetMany(condition) {
    try {
      return await CustomerModels.find(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  async function GetManyWithPagination(condition, page) {
    try {
      return await CustomerModels.find(condition)
        .skip((page - 1) * 20)
        .limit(20);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }

  async function UpdateUser(condition, data) {
    try {
      return await CustomerModels.findOneAndUpdate(condition, data, {
        useFindAndModify: false,
        new: true,
      });
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  async function CreateUser(data) {
    try {
      return await CustomerModels.create(data);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  async function countDocuments(condition) {
    try {
      return await CustomerModels.countDocuments(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  const RefreshUser = (user) => {
    const Customer = JSON.parse(JSON.stringify(user));
    delete Customer["password"];
    delete Customer["is_approved"];
    delete Customer["is_delete"];
    delete Customer["createdAt"];
    delete Customer["updatedAt"];
    delete Customer["__v"];
    return Customer;
  };
  return {
    GetOne,
    GetManyWithPagination,
    UpdateUser,
    GetMany,
    CreateUser,
    countDocuments,
    RefreshUser,
  };
}

module.exports = CustomerServices();
