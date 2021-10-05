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
                if (!query) throw {message: "query doesn't exists"}
                return res.json({success: true, discussions: query.discussions});
            } catch (error) {
                return res.json({success: false, error: error.message});
            }

        case "POST":
            try {
                const { id, answer } = body;
                let query = await Query.findById(id).exec();
                if (!query) throw {message: "query doesn't exists"}
                if (query.resolved) throw {message: "Query is marked as resolved! can't perform this action."}
                if (query.by == user._id || user.type === 'admin') {
                    await query.discussions.push({
                        user: user._id, answer
                    });
                    await query.save();
                    return res.json({success: true, discussions: query.discussions});
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
                    if (thatQuery.resolved) throw {message: "Query is marked as resolved! can't perform this action."}
                    if (thatQuery.by == user._id || user.type === 'admin') {
                        const thatAnswer = await thatQuery.discussions.id(discussionID)
                        if (thatAnswer) {
                            // instead of `===`, use `==`, this way objectId can be compared to string id
                            if (thatAnswer.user == user._id || user.type === 'admin')
                                await thatAnswer.remove();
                            else
                                throw {message: "you cannot delete admin's answer."}
                        } 
                        else throw {message: "Answer doesn't exists"}
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