export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://clean-ts-api:KmCUOLyNxg9MbAlc@cluster0.lkslpja.mongodb.net/?retryWrites=true&w=majority',
  // mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050
}
