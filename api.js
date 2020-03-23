const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(cors())

const options ={
  definition :{
    info :
      {
    "title": "Notes API",
    "description": "Notes API documentation.",
    "contact": {
      "name": "Puhpdeep Gangrade",
      "url": "https://github.com/pushpdeep-gangrade",
      "email": "pgangrad@uncc.edu"
    },
    "servers" : ["http://localhost:8080/"]
  }
},
    apis: ["api.js"]
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/',(req, res) => res.send('http://www.localhost:8080/notes/'));

app.get('/notes', (req, res) => res.send('{}'));

app.post('/notes', (req, res) => res.send('Notes added Successfully'));

app.delete('/notes/{title}', (req, res) => res.send('deleted Successfully'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/**
 * @swagger
 * definitions:
 *   notes:
 *     properties:
 *       note_title:
 *         type: string
 *       note_detail:
 *         type: string
 */

 /**
  * @swagger
  * definitions:
  *   getNotes:
  *     properties:
  *       title:
  *         type: string
  *       detail:
  *         type: string
  *       Created:
  *         type: string
  *       LastModified:
  *         type: string
  */

  /**
   * @swagger
   * definitions:
   *   affectedResponse:
   *     properties:
   *       fieldCount:
   *         type: integer
   *       affectedRows:
   *         type: integer
   *       insertId:
   *         type: integer
   *       serverStatus:
   *         type: integer
   *       warningCount:
   *         type: integer
   *       message:
   *         type: string
   *       protocol41:
   *         type: boolean
   *       changedRows:
   *         type: integer
   */

 /**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - notes
 *     summary: Get link to api-documentation
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
*           type: string
 *     responses:
 *       200:
 *         description: It will provide link to api-documentation
 */

 /**
 * @swagger
 * /notes:
 *   post:
 *     tags:
 *       - notes
 *     summary: Insert new record note in database
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: body
 *         in: body
 *         title: title
 *         detail: detail
 *         schema:
 *           $ref: '#/definitions/notes'
 *         required: true
 *     responses:
 *       200:
 *         description: list of all notes with newly inserted
 */

 /**
  * @swagger
  * /notes/{title}:
  *   get:
  *     tags:
  *       - notes
  *     summary: Return notes based on title
  *     description: Return notes based on title
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: title
  *         description: notes's title
  *         in: query
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: A single note
  *         schema:
  *           $ref: '#/definitions/getNotes'
  */

  /**
  * @swagger
  * /notes:
  *   get:
  *     tags:
  *       - notes
  *     summary: Get list of notes
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: List of user object
  *         schema:
  *           $ref: '#/definitions/getNotes'
  */

  /**
  * @swagger
  * /notes/{title}:
  *   put:
  *     tags:
  *       - notes
  *     summary: replace note with sepecific title
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: body and title required
  *         in: body
  *         title: title
  *         detail: detail
  *         schema:
  *           $ref: '#/definitions/notes'
  *         required: true
  *     responses:
  *       200:
  *         description: List of user object
  *         schema:
  *           $ref: '#/definitions/affectedResponse'
  */

  /**
  * @swagger
  * /notes/{title}:
  *   patch:
  *     tags:
  *       - notes
  *     summary: edit note with specific title
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: body and title required
  *         in: body
  *         title: title
  *         detail: detail
  *         required: true
  *         schema:
  *           $ref: '#/definitions/notes'
  *     responses:
  *       200:
  *         description: List of user object
  *         schema:
  *           $ref: '#/definitions/affectedResponse'
  */

  /**
  * @swagger
  * /notes/{title}:
  *   delete:
  *     tags:
  *       - notes
  *     summary: delete note with specific title
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: title
  *         description: notes's title
  *         in: query
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: Deleted Successfully
  */
