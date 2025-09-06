const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const newsController = require("../controllers/newsController");
const upload = require("../config/multer");
const validationToken = require("../middlewares/validation")

//USER methods

/**
 * @swagger
 * /users/SignIn:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/users/SignIn", userController.SignIn);

/**
 * @swagger
 * /users/LogIn:
 *   post:
 *     summary: Login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/users/LogIn", userController.login);

//NEWS methods

/**
 * @swagger
 * /news/create:
 *   post:
 *     summary: Criar nova notícia
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título da notícia"
 *               content:
 *                 type: string
 *                 example: "Conteúdo da notícia"
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Notícia criada com sucesso
 *       401:
 *         description: Token não fornecido
 */
router.post("/news/create", upload.single("img"), validationToken, newsController.create);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Editar notícia
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notícia
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Notícia atualizada com sucesso
 *       404:
 *         description: Notícia não encontrada
 */
router.put("/news/:id", upload.single("img"), validationToken, newsController.edit);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Deletar notícia
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notícia
 *     responses:
 *       200:
 *         description: Notícia deletada com sucesso
 *       404:
 *         description: Notícia não encontrada
 */
router.delete("/news/:id", validationToken, newsController.delete)

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Listar todas as notícias
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Lista de notícias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   img:
 *                     type: string
 */
router.get("/news", newsController.searchAllNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Obter detalhes de uma notícia
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notícia
 *     responses:
 *       200:
 *         description: Detalhes da notícia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 img:
 *                   type: string
 *       404:
 *         description: Notícia não encontrada
 */
router.get("/news/:id", newsController.getDetails)

module.exports = router;