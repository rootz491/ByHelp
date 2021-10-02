import Query from "../../../models/query";
import isAuthenticated from "../../../middlewares/isAuthenticated";

async function handler(req, res) {
    const {
        method,
        body,
        user
    } = req;

    switch(method) {

        case "GET":
            try {   //  only send question, and some details of owner without discussions.
                const queries = await Query.find().select('-discussion').populate('by').exec();
                return res.json({success: true, queries});
            } catch (error) {
                return res.json({success: false, error: error.message});
            }

        case "POST":
            try {
                const { question } = body;
                // validate params
                if (question.length < 10) throw {message: "Question's length too short!"}
                const newQuery = new Query({ by: user._id, question });
                return res.json({ success: true, query: await newQuery.save() });
            } catch (error) {
                return res.json({success: false, error: error.message});
            }

        default:
            res.status(405).end();

    }
}

export default isAuthenticated(handler);