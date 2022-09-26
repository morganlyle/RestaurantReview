import mongoDB from 'mongoDB';

const ObjectID = mongodb.ObjectID

let reviews

export default class ReviewsDAO {
    static async injectDB(conn){
        if (reviews){
            return
        }
        try {
            review = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews')
        }
        catch (e) {
            console.error(`Unable to connect to: ${e}`)
        }
    }
}