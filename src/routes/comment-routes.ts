import { Router } from 'express'
import Joi from 'joi'
import _ from 'lodash'
import asyncHandler from 'express-async-handler'
import { validateInputData } from '../utils/utils'
import * as commentController from '../controller/comment-controller'

export default function commentRoutes (router = Router()) {

  router.get('/comment/:boardId', asyncHandler(getCommentForBoardId))  // 해당 board에 comment 조회
  router.post('/comment/:boardId', asyncHandler(postComment))  // comment 등록

  async function getCommentForBoardId (req: any, res: any) {
    const { boardId } = validateInputData(req.params, { boardId: Joi.number().required() })
    const {limit, offset} = validateInputData(req.query, {
      limit: Joi.number().required(),
      offset: Joi.number().required()
    })

    const commentList = await commentController.fetchCommentListForBoard(boardId, limit, offset)
    res.send(commentList)
  }

  async function postComment (req: any, res: any) {
    const { boardId } = validateInputData(req.params, { boardId: Joi.number().required() })
    const commentInfo = validateInputData(req.body, {
      writer: Joi.string().required(),
      content: Joi.string().required(),
      upCommentId: Joi.number().default(null)
    })

    await commentController.createComment({...commentInfo, boardId})
    res.send({result: 'OK'})
  }

  return router
}