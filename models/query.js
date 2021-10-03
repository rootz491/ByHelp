const mongoose = require('mongoose');

var discussionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },
    answer: {
        type: String
    }
});

var querySchema = new mongoose.Schema({
    by: { 
        type: mongoose.Types.ObjectId,
        ref: "User", 
        required: true 
    },
    date: {
        type: Date,
        default: new Date().getDate()
    },
    question: {
        type: String,
        required: true,
        unique: true
    },
    /* subdoc => [ { user, answer }, {...}, ... ] */
    discussion:  [{
        type: discussionSchema,
        required: false,
        unique: false,
        default: []
    }]
});

mongoose.models = {};

var Query = mongoose.model("Query", querySchema);

module.exports = Query;


// testing queries out loud.
/*
mongoose.connect('xyz')
.then(async _ => {
   
    /* get queries
    Query.find().then(data => {
        console.log(data);
    })
    */

    /*  post a query -> when a new query is created, discussion is empty array.
    const newQuery = new Query({by: "615135bead52133b9b6e137a", question: "How does that work?"})
    newQuery.save()
    .then(data => {
        console.log(data);
    })
    */

    /* get a particular query, and add answer to discussion 
    const thatQuery = await Query.findById('61582bd8e482c41d238362a4').exec();
    console.log("thatQuery: ",thatQuery);
    await thatQuery.discussion.push({
        user: "61513802ad52133b9b6e1394",
        answer: "so next this is, follow the link or scream you bitch. lolol"
    });
    const updatedQuery = await thatQuery.save();
    console.log("thatQuery after push: ", updatedQuery);
    */

    /* remove a particular answer from that query
    const thatQuery = await Query.findById('61582bd8e482c41d238362a4').exec();
    console.log("thatQuery: ", thatQuery);
    // pass the answer id of that discussion.
    await thatQuery.discussion.id('61582ee1832bfa0a7b6f81c2').remove();
    const updatedQuery = await thatQuery.save();
    console.log("updatedQuery: ", updatedQuery);

})
*/