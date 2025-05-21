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
 */

/**
 * @swagger
 * /tarjetas:
 *   get:
 *     summary: Obtener una lista de tarjetas con filtros opcionales
 *     tags: [Tarjetas]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarjeta'
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
 * /tarjetas/{id}:
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
 *       201:
 *         description: Tarjeta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tarjeta'
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
 *       200:
 *         description: Tarjeta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tarjeta'
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tarjeta'
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tarjeta'
 *       404:
 *         description: Tarjeta no encontrada
 */
