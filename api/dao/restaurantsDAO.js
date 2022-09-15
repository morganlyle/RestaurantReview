
let restaurants

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection('restaurants')
        }
        catch (e) {
            console.error(`Unable to establish a collection handle in restaurantsDAO ${e.message}`)
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 10,
    } = {}) {

        let query
        if (filters) {
            if ('name' in filters) {
                query = { $text: { $search: filters['name'] } }
            }
            else if ('cuisine' in filters) {
                query = { 'cuisine': { $equal: filters['cuisine'] } }
            }
            else if ('zipcode' in filters) {
                query = { 'address.zipcode': { $equal: filters['zipcode'] } }
            }
        }

        let cursor

        try {
            cursor = await restaurants
                .find(query)
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = page === 0 ? await restaurants.countDocuments(query)
            return { restaurantsList, totalNumRestaurants }
        }
        catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

}