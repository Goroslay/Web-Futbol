/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: API de Gestión de Torneos
 *   description: API para la gestión, administración y consulta de torneos deportivos.
 *   version: 1.0.0
 * 
 * tags:
 *   - name: Torneos
 *     description: Endpoints para la gestión de torneos
 * 
 * paths:
 *   /api/v1/torneos:
 *     get:
 *       summary: Obtener lista de torneos con filtros opcionales
 *       description: Permite obtener una lista de torneos filtrando por nombre, temporada o rango de fechas.
 *       tags:
 *         - Torneos
 *       parameters:
 *         - in: query
 *           name: nombre
 *           description: "Filtrar por nombre del torneo"
 *           schema:
 *             type: string
 *         - in: query
 *           name: temporada
 *           description: "Filtrar por temporada (ej: 2025)"
 *           schema:
 *             type: string
 *         - in: query
 *           name: fechaInicio
 *           description: "Filtrar torneos a partir de esta fecha (formato: YYYY-MM-DD)"
 *           schema:
 *             type: string
 *             format: date
 *         - in: query
 *           name: fechaFin
 *           description: "Filtrar torneos hasta esta fecha (formato: YYYY-MM-DD)"
 *           schema:
 *             type: string
 *             format: date
 *       responses:
 *         '200':
 *           description: Lista de torneos obtenida exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Torneo'
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '500':
 *           $ref: '#/components/responses/InternalError'
 * 
 *     post:
 *       summary: Crear un nuevo torneo
 *       description: Registra un nuevo torneo con nombre, temporada, fechas y descripción opcional.
 *       tags:
 *         - Torneos
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [nombre, temporada, fechaInicio, fechaFin]
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: Copa Élite
 *                   description: "Nombre del torneo"
 *                 temporada:
 *                   type: string
 *                   example: "2025"
 *                   description: "Temporada a la que pertenece el torneo"
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                   example: "2025-01-15"
 *                   description: "Fecha de inicio del torneo (formato: YYYY-MM-DD)"
 *                 fechaFin:
 *                   type: string
 *                   format: date
 *                   example: "2025-04-30"
 *                   description: "Fecha de finalización del torneo (formato: YYYY-MM-DD)"
 *                 descripcion:
 *                   type: string
 *                   example: "Torneo clasificatorio regional"
 *                   description: "Descripción opcional del torneo"
 *       responses:
 *         '201':
 *           description: Torneo creado exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Torneo'
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '409':
 *           description: Conflicto - El torneo ya existe
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           $ref: '#/components/responses/InternalError'
 * 
 *   /api/v1/torneos/{id}:
 *     get:
 *       summary: Obtener torneo por ID
 *       tags:
 *         - Torneos
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: "ID único del torneo"
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Torneo encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Torneo'
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '404':
 *           description: Torneo no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           $ref: '#/components/responses/InternalError'
 * 
 *     put:
 *       summary: Editar un torneo por ID
 *       tags:
 *         - Torneos
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: "ID del torneo a editar"
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: "Copa Élite 2025"
 *                 temporada:
 *                   type: string
 *                   example: "2025"
 *                 fechaInicio:
 *                   type: string
 *                   format: date
 *                   example: "2025-01-15"
 *                 fechaFin:
 *                   type: string
 *                   format: date
 *                   example: "2025-04-30"
 *                 descripcion:
 *                   type: string
 *                   example: "Edición actualizada del torneo"
 *       responses:
 *         '200':
 *           description: Torneo actualizado exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Torneo'
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '404':
 *           description: Torneo no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '409':
 *           description: Conflicto - Ya existe un torneo con los mismos datos
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           $ref: '#/components/responses/InternalError'
 * 
 *     delete:
 *       summary: Eliminar un torneo por ID
 *       tags:
 *         - Torneos
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: "ID del torneo a eliminar"
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Torneo eliminado exitosamente
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '404':
 *           description: Torneo no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           $ref: '#/components/responses/InternalError'
 * 
 *   /api/v1/torneos/{id}/tabla:
 *     get:
 *       summary: Obtener tabla de posiciones del torneo
 *       tags:
 *         - Torneos
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: "ID del torneo"
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Tabla de posiciones generada correctamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     equipo:
 *                       type: string
 *                     puntos:
 *                       type: integer
 *                     partidosJugados:
 *                       type: integer
 *         '400':
 *           $ref: '#/components/responses/BadRequest'
 *         '404':
 *           description: Torneo no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         '500':
 *           $ref: '#/components/responses/InternalError'
 * 
 * components:
 *   schemas:
 *     Torneo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Copa Élite
 *         temporada:
 *           type: string
 *           example: "2025"
 *         fechaInicio:
 *           type: string
 *           format: date
 *           example: "2025-01-15"
 *         fechaFin:
 *           type: string
 *           format: date
 *           example: "2025-04-30"
 *         descripcion:
 *           type: string
 *           example: Torneo de la zona norte
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: BAD_REQUEST
 *         mensaje:
 *           type: string
 *           example: "Parámetros inválidos"
 *         detalles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["El campo 'nombre' es requerido."]
 * 
 *   responses:
 *     BadRequest:
 *       description: La solicitud contiene errores de validación
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


