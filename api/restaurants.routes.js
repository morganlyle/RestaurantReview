import express from 'express'
import RestaurantsCtrl from './restaurantsCtrl.js'

const router = express.Router()

router.route('/').get(RestaurantsCtrl.apiGetRestaurants)


router
    .route("/review")
    .post(ReviewCtrl.apiPostReview)
    .put(ReviewCtrl.apiReview)

export default router