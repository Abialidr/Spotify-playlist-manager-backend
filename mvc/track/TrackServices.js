var q = require("q");
var TrackModels = require("./TrackModel");

function TracksServices() {
  async function GetOne(condition) {
    try {
      return await TrackModels.findOne(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  async function GetCategory(condition) {
    try {
      return (await TrackModels.find(condition)).map((val) => val.category);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  function CreateTracks(data) {
    var deferred = q.defer();
    TrackModels.create(data)
      .then(function (result) {
        var resp = {
          success: true,
          message: "You are Track Successfully",
          data: result,
        };
        deferred.resolve(resp);
      })
      .catch(function (error) {
        var resp = {
          success: false,
          message: "Error in processing",
          data: error,
        };
        deferred.reject(resp);
      });
    return deferred.promise;
  }

  function GetTracks(condition, page, skip) {
    var deferred = q.defer();
    TrackModels.find(condition)
      .skip((page - 1) * skip)
      .limit(skip)
      .then(function (result) {
        var resp = {
          success: true,
          message: "Tracks Gets Successfully",
          data: result,
          page: page,
          pageSize: result.length,
        };
        deferred.resolve(resp);
      })
      .catch(function (error) {
        var resp = {
          success: false,
          message: "Error in processing",
          data: error,
        };
        deferred.reject(resp);
      });
    return deferred.promise;
  }

  function UpdateTracks(condition, data) {
    var deferred = q.defer();
    TrackModels.findOneAndUpdate(
      condition,
      { $set: data },
      { useFindAndModify: false }
    )
      .then(function (result) {
        var resp = {
          success: true,
          message: "Update Tracks Successfully",
          data: result,
        };
        deferred.resolve(resp);
      })
      .catch(function (error) {
        var resp = {
          success: false,
          message: "Error in processing",
          data: error,
        };
        deferred.reject(resp);
      });
    return deferred.promise;
  }

  function DeleteTracks(condition) {
    var deferred = q.defer();
    TrackModels.deleteOne(condition)
      .then(function (result) {
        var resp = {
          success: true,
          message: "Delete Tracks Successfully",
          data: result,
        };
        deferred.resolve(resp);
      })
      .catch(function (error) {
        var resp = {
          success: false,
          message: "Error in processing",
          data: error,
        };
        deferred.reject(resp);
      });
    return deferred.promise;
  }
  async function countDocuments(condition) {
    try {
      return await TrackModels.countDocuments(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  return {
    CreateTracks: CreateTracks,
    GetTracks: GetTracks,
    UpdateTracks: UpdateTracks,
    DeleteTracks: DeleteTracks,
    GetOne,
    countDocuments,
    GetCategory,
  };
}

module.exports = TracksServices();
