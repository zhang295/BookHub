module.exports = function (mongoose, autoIncrement){
    var Schema = mongoose.Schema;
    // set up a mongoose model and pass it using module.exports
    var bookSchema  =  new Schema({
        user: {
            type:String,
            required:true
        },
        booktitle: {
            type: String,
            required: true
        },
        author: {
            type: String
        },
        ISBN: {
            type: String
        },
        courseCode: {
            type: String
        },
        price:{
            type: Number,
            required: true
        },
        condition:{
            type: Number
        },
        description:{
            type: String
        },
        image: {
            data: Buffer,
            contentType: String
        },
        sold: {
            type: Boolean
        },
        created_at: Date,
        updated_at: Date
    },{
        collection: 'book'
    });

    bookSchema.pre('save', function (next) {

        // get the current date
        var currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
          this.created_at = currentDate;
        next();
    });

    bookSchema.plugin(autoIncrement.plugin, {
        model: 'book',
        field: 'bookId',
        startAt: 1,
        incrementBy: 1
    });

    return mongoose.model('book', bookSchema);
}
