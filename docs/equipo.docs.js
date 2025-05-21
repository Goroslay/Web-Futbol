/**
 * @swagger
 * tags:
 *   name: Equipos
 *   description: Gestión de equipos
 * 
 * /api/v1/equipos:
 *   get:
 *     summary: Obtener todos los equipos
 *     tags: [Equipos]
 *     responses:
 *       200:
 *         description: Lista de equipos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipo'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 *   post:
 *     summary: Crear un nuevo equipo
 *     tags: [Equipos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipoInput'
 *     responses:
 *       201:
 *         description: Equipo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 * /api/v1/equipos/{id}:
 *   get:
 *     summary: Obtener un equipo por ID
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del equipo
 *     responses:
 *       200:
 *         description: Equipo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipo'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 *   put:
 *     summary: Actualizar un equipo por ID
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del equipo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipoInput'
 *     responses:
 *       200:
 *         description: Equipo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 *   delete:
 *     summary: Eliminar un equipo por ID
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del equipo a eliminar
 *     responses:
 *       200:
 *         description: Equipo eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'

 * components:
 *   schemas:
 *     Equipo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *         nombre:
 *           type: string
 *           example: "Atlético Nacional"
 *         torneoId:
 *           type: string
 *           format: uuid
 *           example: "b7e8c9d0-1234-5678-9abc-def012345678"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-20T15:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-20T16:00:00Z"
 * 
 *     EquipoInput:
 *       type: object
 *       required:
 *         - nombre
 *         - torneoId
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Deportivo Cali"
 *         torneoId:
 *           type: string
 *           format: uuid
 *           example: "b7e8c9d0-1234-5678-9abc-def012345678"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: "BAD_REQUEST"
 *         mensaje:
 *           type: string
 *           example: "El campo 'nombre' es obligatorio"
 *         detalles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["El campo 'nombre' es requerido."]

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

