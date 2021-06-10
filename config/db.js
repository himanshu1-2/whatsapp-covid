const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false
}
).then(() => console.log('Connected to database...'));
