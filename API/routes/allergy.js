const AuthoMiddleware = require("../middleware/authorization");
const AllergyController = require("../controllers/allergyCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /allergy:
 *  get:
 *      tags:
 *         - Allergies
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AllergiesFound'
 *          404:
 *              $ref: '#/components/responses/AllergiesNotFound'
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/', AllergyController.getAllAllergy);
/**
 * @swagger
 * /allergy/{id}:
 *  get:
 *      tags:
 *         - Allergies
 *      parameters:
 *          - name: id
 *            description: ID d'un produit
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AllergiesIdFound'
 *          400:
 *              description: ID de l'allergie manquant
 *          404:
 *              $ref: '#/components/responses/AllergiesIdNotFound'
 *          500:
 *              description: Erreur serveur
 *
  */
router.get('/:id', AllergyController.getAllergy);

/**
 * @swagger
 * /allergy:
 *  post:
 *      tags:
 *          - Allergies
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AllergyAAjoute'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/NewAllergyCreated'
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
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AllergyController.postNewAllergy);

/**
 * @swagger
 * /allergy:
 *  patch:
 *      tags:
 *          - Allergies
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AllergyAUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/AllergyUpdated'
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
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AllergyController.updateAllergy);

/**
 * @swagger
 * /allergy:
 *  delete:
 *      tags:
 *          - Allergies
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/AllergyDeleted'
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
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, AllergyController.deleteAllergy);

module.exports = router