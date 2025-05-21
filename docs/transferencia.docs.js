/**
 * @swagger
 * tags:
 *   name: Transferencias
 *   description: Gestión de transferencias de jugadores entre equipos
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
 *           example: 1
 *         jugadorId:
 *           type: string
 *           example: "abc123"
 *         equipoOrigenId:
 *           type: integer
 *           example: 2
 *         equipoDestinoId:
 *           type: integer
 *           example: 5
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2024-06-01"
 *         monto:
 *           type: number
 *           format: float
 *           example: 1500000.00
 *         tipo:
 *           type: string
 *           enum: [traspaso, prestamo, libre]
 *           example: "traspaso"
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

 *     RespuestaTransferencia:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Transferencia'
 */

/**
 * @swagger
 * /transferencias:
 *   get:
 *     summary: Obtener todas las transferencias (con filtros opcionales)
 *     tags: [Transferencias]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: jugadorId
 *         schema:
 *           type: string
 *       - in: query
 *         name: equipoOrigenId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: equipoDestinoId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [traspaso, prestamo, libre]
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
 * /api/v1transferencias/{id}:
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
 *               $ref: '#/components/schemas/RespuestaTransferencia'
 *       404:
 *         description: Transferencia no encontrada
 */

/**
 * @swagger
 * /api/v1/transferencias:
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
 *               $ref: '#/components/schemas/RespuestaTransferencia'
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
 *               $ref: '#/components/schemas/RespuestaTransferencia'
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
 *               $ref: '#/components/schemas/RespuestaTransferencia'
 *       404:
 *         description: Transferencia no encontrada
 */