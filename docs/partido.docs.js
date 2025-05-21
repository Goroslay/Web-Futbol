/**
 * @swagger
 * tags:
 *   name: Partidos
 *   description: Gestión de partidos de fútbol
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Partido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         torneoId:
 *           type: integer
 *         equipoLocalId:
 *           type: integer
 *         equipoVisitanteId:
 *           type: integer
 *         golesLocal:
 *           type: integer
 *         golesVisitante:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date-time
 *         estado:
 *           type: string
 *           enum: [programado, curso, finalizado, suspendido]
 *     PartidoCreacion:
 *       type: object
 *       required:
 *         - torneoId
 *         - equipoLocalId
 *         - equipoVisitanteId
 *         - fecha
 *       properties:
 *         torneoId:
 *           type: integer
 *         equipoLocalId:
 *           type: integer
 *         equipoVisitanteId:
 *           type: integer
 *         golesLocal:
 *           type: integer
 *         golesVisitante:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date-time
 *         estado:
 *           type: string
 *           enum: [programado, curso, finalizado, suspendido]
 *     PartidoEdicion:
 *       type: object
 *       properties:
 *         torneoId:
 *           type: integer
 *         equipoLocalId:
 *           type: integer
 *         equipoVisitanteId:
 *           type: integer
 *         golesLocal:
 *           type: integer
 *         golesVisitante:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date-time
 *         estado:
 *           type: string
 *           enum: [programado, curso, finalizado, suspendido]
 *     RespuestaPartido:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Partido'
 */

/**
 * @swagger
 * /api/v1/partidos:
 *   get:
 *     summary: Obtener lista de partidos con filtros opcionales
 *     tags: [Partidos]
 *     parameters:
 *       - in: query
 *         name: torneoId
 *         schema:
 *           type: integer
 *         description: ID del torneo
 *       - in: query
 *         name: equipoLocalId
 *         schema:
 *           type: integer
 *         description: ID del equipo local
 *       - in: query
 *         name: equipoVisitanteId
 *         schema:
 *           type: integer
 *         description: ID del equipo visitante
 *       - in: query
 *         name: golesLocal
 *         schema:
 *           type: integer
 *         description: Goles del equipo local
 *       - in: query
 *         name: golesVisitante
 *         schema:
 *           type: integer
 *         description: Goles del equipo visitante
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha del partido
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [programado, curso, finalizado, suspendido]
 *         description: Estado del partido
 *     responses:
 *       200:
 *         description: Lista de partidos
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
 *                     $ref: '#/components/schemas/Partido'
 */

/**
 * @swagger
 * /api/v1/partidos/{id}:
 *   get:
 *     summary: Obtener un partido por su ID
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del partido
 *     responses:
 *       200:
 *         description: Partido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaPartido'
 *       404:
 *         description: Partido no encontrado
 */

/**
 * @swagger
 * /partidos:
 *   post:
 *     summary: Crear nuevo partido
 *     tags: [Partidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartidoCreacion'
 *     responses:
 *       201:
 *         description: Partido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaPartido'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Torneo o equipos no encontrados
 */

/**
 * @swagger
 * /partidos/{id}:
 *   put:
 *     summary: Editar un partido existente
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del partido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartidoEdicion'
 *     responses:
 *       200:
 *         description: Partido actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaPartido'
 *       404:
 *         description: Partido o entidades relacionadas no encontradas
 *       409:
 *         description: Conflicto de horario o equipos duplicados
 */

/**
 * @swagger
 * /partidos/{id}:
 *   delete:
 *     summary: Eliminar un partido
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del partido
 *     responses:
 *       200:
 *         description: Partido eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaPartido'
 *       404:
 *         description: Partido no encontrado
 */
