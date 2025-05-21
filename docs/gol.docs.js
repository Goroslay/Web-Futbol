/**
 * @swagger
 * tags:
 *   - name: Goles
 *     description: Gestión de goles en los partidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Gol:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del gol
 *         partidoId:
 *           type: integer
 *           description: ID del partido en el que se marcó el gol
 *         jugadorId:
 *           type: string
 *           description: ID del jugador que anotó el gol
 *         minuto:
 *           type: integer
 *           description: Minuto del partido en el que se marcó el gol
 *         deEquipoId:
 *           type: integer
 *           description: ID del equipo que anotó el gol
 *         aEquipoId:
 *           type: integer
 *           description: ID del equipo al que se le anotó el gol
 *
 *     GolCreateRequest:
 *       type: object
 *       required:
 *         - partidoId
 *         - jugadorId
 *         - minuto
 *         - deEquipoId
 *         - aEquipoId
 *       properties:
 *         partidoId:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         minuto:
 *           type: integer
 *         deEquipoId:
 *           type: integer
 *         aEquipoId:
 *           type: integer
 *
 *     GolUpdateRequest:
 *       type: object
 *       properties:
 *         partidoId:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         minuto:
 *           type: integer
 *         deEquipoId:
 *           type: integer
 *         aEquipoId:
 *           type: integer
 *
 *     GolFiltro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         partidoId:
 *           type: integer
 *         jugadorId:
 *           type: string
 *         minuto:
 *           type: integer
 *         deEquipoId:
 *           type: integer
 *         aEquipoId:
 *           type: integer
 *
 *     GolResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Gol'
 *
 *     GolListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Gol'
 */

/**
 * @swagger
 * /api/v1/gol:
 *   get:
 *     summary: Obtener goles con filtros opcionales
 *     tags: [Goles]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del gol
 *       - in: query
 *         name: partidoId
 *         schema:
 *           type: integer
 *         description: ID del partido
 *       - in: query
 *         name: jugadorId
 *         schema:
 *           type: string
 *         description: ID del jugador que anotó
 *       - in: query
 *         name: minuto
 *         schema:
 *           type: integer
 *         description: Minuto del gol
 *       - in: query
 *         name: deEquipoId
 *         schema:
 *           type: integer
 *         description: ID del equipo que anotó
 *       - in: query
 *         name: aEquipoId
 *         schema:
 *           type: integer
 *         description: ID del equipo que recibió el gol
 *     responses:
 *       200:
 *         description: Lista de goles obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GolListResponse'
 *
 *
 *   post:
 *     summary: Crear un nuevo gol
 *     tags: [Goles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GolCreateRequest'
 *     responses:
 *       201:
 *         description: Gol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GolResponse'
 *       400:
 *         description: Error de validación o minuto inválido
 */

/**
 * @swagger
 * /api/v1/gol/{id}:
 *   get:
 *     summary: Obtener un gol por su ID
 *     tags: [Goles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gol
 *     responses:
 *       200:
 *         description: Gol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GolResponse'
 *       404:
 *         description: Gol no encontrado
 *
 *   put:
 *     summary: Actualizar un gol existente
 *     tags: [Goles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GolUpdateRequest'
 *     responses:
 *       200:
 *         description: Gol actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GolResponse'
 *       404:
 *         description: Gol no encontrado
 *
 *   delete:
 *     summary: Eliminar un gol
 *     tags: [Goles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del gol
 *     responses:
 *       200:
 *         description: Gol eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GolResponse'
 *       404:
 *         description: Gol no encontrado
 */
