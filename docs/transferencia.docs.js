/**
 * @swagger
 * tags:
 *   name: Transferencias
 *   description: Gestión de transferencias de jugadores entre equipos
 */

/**
 * @swagger
 * /transferencias:
 *   get:
 *     summary: Obtener todas las transferencias (con filtros opcionales)
 *     tags: [Transferencias]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               jugadorId:
 *                 type: string
 *               equipoOrigenId:
 *                 type: integer
 *               equipoDestinoId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               monto:
 *                 type: number
 *                 format: float
 *               tipo:
 *                 type: string
 *                 enum: [traspaso, prestamo, libre]
 *     responses:
 *       200:
 *         description: Lista de transferencias filtradas
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
 *                     $ref: '#/components/schemas/Transferencia'
 */

/**
 * @swagger
 * /transferencias/{id}:
 *   get:
 *     summary: Obtener una transferencia por ID
 *     tags: [Transferencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la transferencia
 *     responses:
 *       200:
 *         description: Transferencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Transferencia'
 *       404:
 *         description: Transferencia no encontrada
 */

/**
 * @swagger
 * /transferencias:
 *   post:
 *     summary: Crear una nueva transferencia
 *     tags: [Transferencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevaTransferencia'
 *     responses:
 *       201:
 *         description: Transferencia creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Transferencia'
 *       400:
 *         description: Datos inválidos o jugador/equipo inexistente
 */

/**
 * @swagger
 * /transferencias/{id}:
 *   put:
 *     summary: Actualizar una transferencia
 *     tags: [Transferencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la transferencia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarTransferencia'
 *     responses:
 *       200:
 *         description: Transferencia actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Transferencia'
 *       404:
 *         description: Transferencia no encontrada
 */

/**
 * @swagger
 * /transferencias/{id}:
 *   delete:
 *     summary: Eliminar una transferencia
 *     tags: [Transferencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la transferencia a eliminar
 *     responses:
 *       200:
 *         description: Transferencia eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Transferencia'
 *       404:
 *         description: Transferencia no encontrada
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transferencia:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         equipoOrigenId:
 *           type: integer
 *         equipoDestinoId:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date
 *         monto:
 *           type: number
 *           format: float
 *         tipo:
 *           type: string
 *           enum: [traspaso, prestamo, libre]
 *
 *     NuevaTransferencia:
 *       type: object
 *       required:
 *         - jugadorId
 *         - equipoOrigenId
 *         - equipoDestinoId
 *         - fecha
 *         - tipo
 *       properties:
 *         jugadorId:
 *           type: string
 *         equipoOrigenId:
 *           type: integer
 *         equipoDestinoId:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date
 *         monto:
 *           type: number
 *           format: float
 *         tipo:
 *           type: string
 *           enum: [traspaso, prestamo, libre]
 *
 *     ActualizarTransferencia:
 *       type: object
 *       properties:
 *         jugadorId:
 *           type: string
 *         equipoOrigenId:
 *           type: integer
 *         equipoDestinoId:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date
 *         monto:
 *           type: number
 *           format: float
 *         tipo:
 *           type: string
 *           enum: [traspaso, prestamo, libre]
*/