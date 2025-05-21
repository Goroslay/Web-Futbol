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
 */
/**
 * @swagger
 * /tecnicos:
 *   get:
 *     summary: Obtener lista de técnicos (con filtros opcionales)
 *     tags: [Técnicos]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               nombres:
 *                 type: string
 *                 example: "Carlos"
 *               apellidos:
 *                 type: string
 *                 example: "Pérez"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1985-12-15"
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
 * /tecnicos/{id}:
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tecnico'
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
 *             type: object
 *             required:
 *               - nombres
 *               - apellidos
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: "Luis"
 *               apellidos:
 *                 type: string
 *                 example: "García"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Técnico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tecnico'
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
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: "Luis"
 *               apellidos:
 *                 type: string
 *                 example: "González"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1988-11-30"
 *     responses:
 *       200:
 *         description: Técnico actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tecnico'
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Tecnico'
 *       404:
 *         description: Técnico no encontrado
 */
