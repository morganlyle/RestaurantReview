import express from 'express'
import RestaurantsCtrl from './restaurantsCtrl.js'
import ReviewsCtrl from './reviewsCtrl.js'

const router = express.Router()

router.route('/').get(RestaurantsCtrl.apiGetRestaurants)


router
    .route("/review")
    .post(ReviewCtrl.apiPostReview)
    .put(ReviewCtrl.apiReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router