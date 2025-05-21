/**
 * @swagger
 * tags:
 *   name: Jugadores
 *   description: Gestión de jugadores de fútbol
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Jugador:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nombres:
 *           type: string
 *         apellidos:
 *           type: string
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *         nacionalidad:
 *           type: string
 *         posicion:
 *           type: string
 *           enum: [PO, LD, DF, LI, MCD, MC, MCO, MI, MD, EI, ED, DC]
 *         dorsal:
 *           type: integer
 *         equipoId:
 *           type: integer
 *           nullable: true
 *     RespuestaJugador:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Jugador'
 *     JugadorCreacion:
 *       type: object
 *       required:
 *         - nombres
 *         - apellidos
 *         - fechaNacimiento
 *         - nacionalidad
 *         - posicion
 *         - dorsal
 *       properties:
 *         nombres:
 *           type: string
 *         apellidos:
 *           type: string
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *         nacionalidad:
 *           type: string
 *         posicion:
 *           type: string
 *           enum: [PO, LD, DF, LI, MCD, MC, MCO, MI, MD, EI, ED, DC]
 *         dorsal:
 *           type: integer
 *     JugadorEdicion:
 *       type: object
 *       properties:
 *         nombres:
 *           type: string
 *         apellidos:
 *           type: string
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *         nacionalidad:
 *           type: string
 *         posicion:
 *           type: string
 *           enum: [PO, LD, DF, LI, MCD, MC, MCO, MI, MD, EI, ED, DC]
 *         dorsal:
 *           type: integer
 */

/**
 * @swagger
 * /api/v1/jugadores:
 *   get:
 *     summary: Obtener jugadores con filtros opcionales
 *     tags: [Jugadores]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del jugador
 *       - in: query
 *         name: nombres
 *         schema:
 *           type: string
 *         description: Nombres del jugador
 *       - in: query
 *         name: apellidos
 *         schema:
 *           type: string
 *         description: Apellidos del jugador
 *       - in: query
 *         name: fechaNacimiento
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de nacimiento del jugador
 *       - in: query
 *         name: nacionalidad
 *         schema:
 *           type: string
 *         description: Nacionalidad del jugador
 *       - in: query
 *         name: posicion
 *         schema:
 *           type: string
 *           enum: [PO, LD, DF, LI, MCD, MC, MCO, MI, MD, EI, ED, DC]
 *         description: Posición del jugador
 *       - in: query
 *         name: dorsal
 *         schema:
 *           type: integer
 *         description: Número de dorsal
 *       - in: query
 *         name: equipoId
 *         schema:
 *           type: integer
 *         description: ID del equipo al que pertenece
 *     responses:
 *       200:
 *         description: Lista de jugadores
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
 *                     $ref: '#/components/schemas/Jugador'
 *
 *   post:
 *     summary: Crear nuevo jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JugadorCreacion'
 *     responses:
 *       201:
 *         description: Jugador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaJugador'
 *       404:
 *         description: Equipo no encontrado
 *       409:
 *         description: Jugador duplicado o dorsal en uso
 */

/**
 * @swagger
 * /api/v1/jugadores/{id}:
 *   get:
 *     summary: Obtener jugador por ID
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaJugador'
 *       404:
 *         description: Jugador no encontrado
 *
 *   put:
 *     summary: Editar jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JugadorEdicion'
 *     responses:
 *       200:
 *         description: Jugador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaJugador'
 *       404:
 *         description: Jugador o equipo no encontrado
 *       409:
 *         description: Dorsal en uso
 *
 *   delete:
 *     summary: Eliminar jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaJugador'
 *       404:
 *         description: Jugador no encontrado
 */

/**
 * @swagger
 * /jugadores/{jugadorId}/{equipoId}:
 *   post:
 *     summary: Asignar jugador a un equipo
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: jugadorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: equipoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador asignado al equipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaJugador'
 *       404:
 *         description: Jugador o equipo no encontrado
 *       409:
 *         description: Dorsal en uso
 *
 *   delete:
 *     summary: Quitar jugador de un equipo
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: jugadorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: equipoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador eliminado del equipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespuestaJugador'
 *       400:
 *         description: El jugador no pertenece al equipo
 *       404:
 *         description: Jugador o equipo no encontrado
 */
