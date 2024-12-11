const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.PROXY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (e) {
    console.log("🚀 ~ connectDB ~ e:", e);
    process.exit();
  }
};

module.exports = connectDB;
