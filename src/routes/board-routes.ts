import { Router } from 'express'
import Joi from 'joi'
import _ from 'lodash'
import asyncHandler from 'express-async-handler'
import * as boardController from '../controller/board-controller'
import confirmPassword from '../middleware/confirmPassword'
import { validateInputData } from '../utils/utils'

export default function boardRoutes (router = Router()) {

  router.get('/board/list', asyncHandler(getBoardList))  // board list 조회
  router.get('/board/:id', asyncHandler(getBoard))  // board 하나 조회
  router.post('/board', asyncHandler(postBoard))  // board 등록
  router.put('/board/:id', asyncHandler(confirmPassword), asyncHandler(putBoard))  // board 수정

  async function getBoardList (req: any, res: any) {
    const { limit, offset } = validateInputData(req.query, {
      limit: Joi.number().default(30),
      offset: Joi.number().default(0)
    })

    const boardList = await boardController.fetchBoardList(limit, offset)
    res.send(boardList)
  }

  async function getBoard (req: any, res: any) {
    const {id: boardId} = validateInputData(req.params, { id: Joi.number().required() })
    const board = await boardController.fetchBoard(boardId)
    res.send(board)
  }

  async function postBoard (req: any, res: any) {
    const boardInfo = validateInputData(req.body, {
      writer: Joi.string().required(),
      password: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    })
    
    await boardController.createBoard(boardInfo)
    
    res.send({result: 'OK'})
  }

  async function putBoard (req: any, res: any) {
    const {id: boardId} = validateInputData(req.params, { id: Joi.number().required() })
    const boardInfo =  validateInputData(req.body, {
      writer: Joi.string().required(),
      password: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    })

     
    _.remove(boardInfo, 'password')
    await boardController.updateBoard(boardId, boardInfo)

    res.send({result: 'OK'})
  }

  return router
}