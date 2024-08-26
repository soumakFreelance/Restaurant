const mongoose = require('mongoose');
// const mongoUri = 'mongodb+srv://bhojon:bhojon123@cluster0.9ozwewt.mongodb.net/bhojonmern?retryWrites=true&w=majority&appName=Cluster0';
const mongoUri = `mongodb+srv://bhojon:bhojon123@cluster0.9ozwewt.mongodb.net/bhojonmern?retryWrites=true&w=majority&appName=Cluster0`

const mongoDb = async () => {
    try {
        await mongoose.connect(mongoUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        const collection = mongoose.connection.db.collection("food_items");
        const itemData = await collection.find({}).toArray()

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray()

        global.food_items = itemData;
        global.categoryData = categoryData

    } catch (err) {
        console.error('Connection error:', err);
    }
};

module.exports = mongoDb;
