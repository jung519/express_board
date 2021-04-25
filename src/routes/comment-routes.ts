import { Router } from 'express'
import Joi from 'joi'
import _ from 'lodash'
import asyncHandler from 'express-async-handler'
import { validateInputData } from '../utils/utils'
import * as commentController from '../controller/comment-controller'

export default function commentRoutes (router = Router()) {

  router.get('/comment/:boardId', asyncHandler(getCommentForBoardId))  // 해당 board에 comment 조회
  router.post('/comment', asyncHandler(postComment))  // comment 등록

  async function getCommentForBoardId (req, res) {
    const { boardId } = validateInputData(req.params, { boardId: Joi.number().required() })
    const {limit, offset} = validateInputData(req.query, {
      limit: Joi.number().default(30),
      offset: Joi.number().default(0)
    })

    const commentList = await commentController.fetchCommentListForBoard(boardId, limit, offset)
    res.send(commentList)
  }

  async function postComment (req, res) {
    const commentInfo = validateInputData(req.body, {
      boardId: Joi.number().required(),
      writer: Joi.string().required(),
      content: Joi.string().required(),
      upCommentId: Joi.number().default(null)
    })

    await commentController.createComment(commentInfo)
    res.send({result: 'OK'})
  }

  return router
}