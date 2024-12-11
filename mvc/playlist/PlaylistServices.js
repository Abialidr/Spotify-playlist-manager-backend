var q = require("q");
var PlaylistModels = require("./PlaylistModel");

function PlaylistsServices() {
  async function GetOne(condition) {
    try {
      return await PlaylistModels.findOne(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  async function GetCategory(condition) {
    try {
      return (await PlaylistModels.find(condition)).map((val) => val.category);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  function CreatePlaylists(data) {
    var deferred = q.defer();
    PlaylistModels.create(data)
      .then(function (result) {
        var resp = {
          success: true,
          message: "You are Playlist Successfully",
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

  function GetPlaylists(condition, page, skip) {
    var deferred = q.defer();
    PlaylistModels.find(condition)
      .skip((page - 1) * skip)
      .limit(skip)
      .then(function (result) {
        var resp = {
          success: true,
          message: "Playlists Gets Successfully",
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

  function UpdatePlaylists(condition, data) {
    var deferred = q.defer();
    PlaylistModels.findOneAndUpdate(
      condition,
      { $set: data },
      { useFindAndModify: false }
    )
      .then(function (result) {
        var resp = {
          success: true,
          message: "Update Playlists Successfully",
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

  function DeletePlaylists(condition) {
    var deferred = q.defer();
    PlaylistModels.deleteOne(condition)
      .then(function (result) {
        var resp = {
          success: true,
          message: "Delete Playlists Successfully",
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
      return await PlaylistModels.countDocuments(condition);
    } catch (error) {
      console.error(`🚀 ~ file: UserServices.js:46 ~ GetUser ~ error:`, error);

      return error;
    }
  }
  return {
    CreatePlaylists: CreatePlaylists,
    GetPlaylists: GetPlaylists,
    UpdatePlaylists: UpdatePlaylists,
    DeletePlaylists: DeletePlaylists,
    GetOne,
    countDocuments,
    GetCategory,
  };
}

module.exports = PlaylistsServices();
