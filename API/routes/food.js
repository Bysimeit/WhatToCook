const AuthoMiddleware = require("../middleware/authorization");
const FoodController = require("../controllers/foodCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /food:
 *  get:
 *      tags:
 *         - Foods
 *      responses:
 *          200:
 *              $ref: '#/components/responses/FoodsFound'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          404:
 *              $ref: '#/components/responses/FoodsNotFound'
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.getAllFood);

/**
 * @swagger
 * /food:
 *  post:
 *      tags:
 *          - Foods
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/FoodAAjoute'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/NewFoodCreated'
 *          400:
 *              description: Nom de l'allergie manquant
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.postNewFood);

/**
 * @swagger
 * /food:
 *  patch:
 *      tags:
 *          - Foods
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/FoodAUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/FoodUpdated'
 *          400:
 *              description: Données minimales manquantes
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.updateFood);

/**
 * @swagger
 * /food:
 *  delete:
 *      tags:
 *          - Foods
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/FoodDeleted'
 *          400:
 *              description: Données minimales manquantes
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, FoodController.deleteFood);

module.exports = router