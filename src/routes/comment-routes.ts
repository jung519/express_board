import { Router } from 'express'
import Joi from 'joi'
import _ from 'lodash'
import asyncHandler from 'express-async-handler'
import { validateInputData } from '../utils/utils'
import * as commentController from '../controller/comment-controller'

export default function commentRoutes (router = Router()) {

  router.post('/comment', asyncHandler(postComment))  // comment 등록

  async function postComment (req, res) {
    const commentInfo = validateInputData(req.body, {
      boardId: Joi.number().required(),
      writer: Joi.string().required(),
      content: Joi.string().required(),
    })

    await commentController.createComment(commentInfo)
    res.send({result: 'OK'})
  }

  return router
}