/**
 * @swagger
 * tags:
 *   name: Estadísticas
 *   description: Gestión de estadísticas de jugadores

 * /api/v1/estadisticas:
 *   get:
 *     summary: Obtener estadísticas filtradas
 *     tags: [Estadísticas]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadisticaFiltro'
 *     responses:
 *       200:
 *         description: Lista de estadísticas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Estadistica'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 *   post:
 *     summary: Crear una nueva estadística
 *     tags: [Estadísticas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadisticaCreate'
 *     responses:
 *       201:
 *         description: Estadística creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Estadistica'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 * /api/v1/estadisticas/{id}:
 *   get:
 *     summary: Obtener una estadística por ID
 *     tags: [Estadísticas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estadística encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Estadistica'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 *   put:
 *     summary: Editar una estadística
 *     tags: [Estadísticas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadisticaUpdate'
 *     responses:
 *       200:
 *         description: Estadística editada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Estadistica'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 *   delete:
 *     summary: Eliminar una estadística
 *     tags: [Estadísticas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estadística eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Estadistica'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 * components:
 *   schemas:
 *     Estadistica:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         jugadorId:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-5678-90ab-cdef-1234567890ef"
 *         torneoId:
 *           type: integer
 *           example: 2025
 *         partidosJugados:
 *           type: integer
 *           example: 10
 *         goles:
 *           type: integer
 *           example: 5
 *         asistencias:
 *           type: integer
 *           example: 3
 *         tarjetasAmarillas:
 *           type: integer
 *           example: 2
 *         tarjetasRojas:
 *           type: integer
 *           example: 1
 *         minutosJugados:
 *           type: integer
 *           example: 800

 *     EstadisticaCreate:
 *       type: object
 *       required:
 *         - jugadorId
 *         - torneoId
 *       allOf:
 *         - $ref: '#/components/schemas/Estadistica'

 *     EstadisticaUpdate:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/Estadistica'

 *     EstadisticaFiltro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         torneoId:
 *           type: integer
 *         partidosJugados:
 *           type: integer
 *         goles:
 *           type: integer
 *         asistencias:
 *           type: integer
 *         tarjetasAmarillas:
 *           type: integer
 *         tarjetasRojas:
 *           type: integer
 *         minutosJugados:
 *           type: integer

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: "NOT_FOUND"
 *         mensaje:
 *           type: string
 *           example: "Estadística no encontrada"
 *         detalles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["No existe una estadística con el ID proporcionado"]

 *   responses:
 *     BadRequest:
 *       description: La solicitud contiene errores de validación
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'

 *     NotFound:
 *       description: Recurso no encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'

 *     InternalError:
 *       description: Error interno del servidor
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
