import Query from "../../../models/query";
import isAuthenticated from "../../../middlewares/isAuthenticated";

async function handler(req, res) {
    const {
        method,
        user,
        body
    } = req;

    switch(method) {

        case "GET":
            try {
                const { id } = body;
                const query = await Query.findById(id).exec();
                return res.json({success: true, discussion: query.discussion});
            } catch (error) {
                return res.json({success: false, error: error.message});
            }
            
        case "POST":
            try {
                const { id, answer } = body;
                let query = await Query.findById(id).exec();
                if (query.by === user._id || user.type === 'admin') {
                    await query.discussion.create({
                        user: user._id, answer
                    });
                    await query.save();
                    return res.json({success: true});
                }
                else throw {message: "this query doesn't belong to you!"}
            } catch (error) {
                return res.status(403).json({success: false, error: error.message});
            }


        case "DELETE":
            try {
                const {queryID, discussionID} = body;

                const thatQuery = await Query.findById(queryID).exec();
                if (thatQuery) {
                    if (thatQuery.by === user._id || user.type === 'admin') {
                        await thatQuery.discussion.id(discussionID).remove();
                        await thatQuery.save();
                        return res.json({success: true});
                    }
                    else throw {message: "Query doesn't belong to you"}
                }
                else throw {message: "Query doesn't exist"}
            } catch (error) {
                return res.json({success: false, error: error.message});
            }

        default:
            res.status(405).end();

    }
}

export default isAuthenticated(handler);