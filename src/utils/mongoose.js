module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooseArrays.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}