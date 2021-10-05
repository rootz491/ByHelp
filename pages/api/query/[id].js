import Query from "../../../models/query";
import isAuthenticated from "../../../middlewares/isAuthenticated";
async function handler(req, res) {
    const {
        method,
        query,
        user
    } = req;

    switch(method) {

        case "GET":
            try {
                const thatQuery = await Query.findById(query.id).populate('by').exec();
                return res.json({success: true, query: thatQuery});
            } catch (error) {
                return res.status(400).json({success: false, error: error.message});
            }

        case "DELETE":
            try {
                const thatQuery = await Query.findById(query.id).populate('by').exec();
                if (query.resolved) throw {message: "Query is marked as resolved! can't perform this action."}
                if (thatQuery) {
                    if (thatQuery.discussions.length > 2) throw {message: "query with 2 or more answers cannot be deleted directly, delete all the answers first!"}
                    if (thatQuery.by.id === user._id  || user.type === 'admin') {
                        await thatQuery.remove();
                        return res.json({success: true});
                    }
                    else throw {message: "Query doesn't belong to you"}
                }
                else throw {message: "Query doesn't exist"}
            } catch (error) {
                return res.status(403).json({success: false, error: error.message});
            }

        default:
            res.status(405).end();

    }
}

export default isAuthenticated(handler);