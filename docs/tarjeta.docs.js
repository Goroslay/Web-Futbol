/**
 * @swagger
 * tags:
 *   name: Tarjetas
 *   description: Gestión de tarjetas mostradas a los jugadores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarjeta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         partidoId:
 *           type: integer
 *           example: 10
 *         jugadorId:
 *           type: string
 *           example: "jug123"
 *         minuto:
 *           type: integer
 *           example: 45
 *         tipo:
 *           type: string
 *           enum: [amarilla, roja]
 *           example: "amarilla"
 *     TarjetaCreate:
 *       type: object
 *       required:
 *         - partidoId
 *         - jugadorId
 *         - minuto
 *         - tipo
 *       properties:
 *         partidoId:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         minuto:
 *           type: integer
 *         tipo:
 *           type: string
 *           enum: [amarilla, roja]
 *     TarjetaUpdate:
 *       type: object
 *       properties:
 *         partidoId:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         minuto:
 *           type: integer
 *         tipo:
 *           type: string
 *           enum: [amarilla, roja]
 *     RespuestaTarjeta:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Tarjeta'
 */

/**
 * @swagger
 * /api/v1/tarjetas:
 *   get:
 *     summary: Obtener una lista de tarjetas con filtros opcionales
 *     tags: [Tarjetas]
 *     parameters:
 *       - in: query
 *         name: partidoId
 *         schema:
 *           type: integer
 *         description: ID del partido
 *       - in: query
 *         name: jugadorId
 *         schema:
 *           type: string
 *         description: ID del jugador
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [amarilla, roja]
 *         description: Tipo de tarjeta
 *     responses:
 *       200:
 *         description: Lista de tarjetas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tarjeta'
 */

/**
 * @swagger
 * /api/vi/tarjetas/{id}:
 *   get:
 *     summary: Obtener una tarjeta por ID
 *     tags: [Tarjetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarjeta
 *     responses:
 *       200:
 *         description: Tarjeta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTarjeta'
 *       404:
 *         description: Tarjeta no encontrada
 */

/**
 * @swagger
 * /tarjetas:
 *   post:
 *     summary: Crear una nueva tarjeta
 *     tags: [Tarjetas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TarjetaCreate'
 *     responses:
 *       201:
 *         description: Tarjeta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTarjeta'
 *       400:
 *         description: Datos inválidos o conflictos lógicos (por ejemplo, tarjeta duplicada)
 */

/**
 * @swagger
 * /tarjetas/{id}:
 *   put:
 *     summary: Actualizar una tarjeta existente
 *     tags: [Tarjetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarjeta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TarjetaUpdate'
 *     responses:
 *       200:
 *         description: Tarjeta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTarjeta'
 *       404:
 *         description: Tarjeta no encontrada
 */

/**
 * @swagger
 * /tarjetas/{id}:
 *   delete:
 *     summary: Eliminar una tarjeta por ID
 *     tags: [Tarjetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarjeta a eliminar
 *     responses:
 *       200:
 *         description: Tarjeta eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTarjeta'
 *       404:
 *         description: Tarjeta no encontrada
 */

