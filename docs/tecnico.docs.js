/**
 * @swagger
 * tags:
 *   name: Técnicos
 *   description: Gestión de técnicos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tecnico:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombres:
 *           type: string
 *           example: "Carlos"
 *         apellidos:
 *           type: string
 *           example: "Pérez"
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           example: "1985-12-15"
 *     TecnicoCreate:
 *       type: object
 *       required:
 *         - nombres
 *         - apellidos
 *       properties:
 *         nombres:
 *           type: string
 *           example: "Luis"
 *         apellidos:
 *           type: string
 *           example: "García"
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *     TecnicoUpdate:
 *       type: object
 *       properties:
 *         nombres:
 *           type: string
 *           example: "Luis"
 *         apellidos:
 *           type: string
 *           example: "González"
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           example: "1988-11-30"
 *     RespuestaTecnico:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Tecnico'
 */

/**
 * @swagger
 * /api/v1/tecnicos:
 *   get:
 *     summary: Obtener lista de técnicos con filtros opcionales
 *     tags: [Técnicos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del técnico
 *       - in: query
 *         name: nombres
 *         schema:
 *           type: string
 *         description: Nombres del técnico
 *       - in: query
 *         name: apellidos
 *         schema:
 *           type: string
 *         description: Apellidos del técnico
 *       - in: query
 *         name: fechaNacimiento
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de nacimiento del técnico
 *     responses:
 *       200:
 *         description: Lista de técnicos
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
 *                     $ref: '#/components/schemas/Tecnico'
 */

/**
 * @swagger
 * /api/v1/tecnicos/{id}:
 *   get:
 *     summary: Obtener técnico por ID
 *     tags: [Técnicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del técnico
 *     responses:
 *       200:
 *         description: Técnico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTecnico'
 *       404:
 *         description: Técnico no encontrado
 */

/**
 * @swagger
 * /tecnicos:
 *   post:
 *     summary: Crear nuevo técnico
 *     tags: [Técnicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TecnicoCreate'
 *     responses:
 *       201:
 *         description: Técnico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTecnico'
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /tecnicos/{id}:
 *   put:
 *     summary: Actualizar técnico por ID
 *     tags: [Técnicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del técnico a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TecnicoUpdate'
 *     responses:
 *       200:
 *         description: Técnico actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTecnico'
 *       404:
 *         description: Técnico no encontrado
 */

/**
 * @swagger
 * /tecnicos/{id}:
 *   delete:
 *     summary: Eliminar técnico por ID
 *     tags: [Técnicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del técnico a eliminar
 *     responses:
 *       200:
 *         description: Técnico eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaTecnico'
 *       404:
 *         description: Técnico no encontrado
 */
