import { formatTime, translateCount } from '@/utils/util'
import { AxiosResponse } from 'axios'

export const convertComments = (res: AxiosResponse<any>) => {
  let { hotComments, comments, total } = res.data
  if (hotComments && hotComments.length > 0) {
    hotComments = hotComments.map((comment: any) => {
      let beReplied: Replied[] = []
      if (comment.beReplied.length) {
        beReplied = comment.beReplied.map(item => {
          return {
            id: item.user.userId,
            name: item.user.nickname,
            commentId: item.commentId,
            avatarUrl: item.user.avatarUrl,
            time: formatTime(item.time),
            likedCount: item.likedCount,
            content: item.content
          }
        })
      }
      return {
        id: comment.user.userId,
        name: comment.user.nickname,
        commentId: comment.commentId,
        avatarUrl: comment.user.avatarUrl,
        time: formatTime(comment.time),
        likedCount: comment.likedCount,
        content: comment.content,
        beReplied
      }
    })
  }

  comments = comments.map((comment: any) => {
    let beReplied: Replied[] = []
    if (comment.beReplied.length) {
      beReplied = comment.beReplied.map(item => {
        return {
          id: item.user.userId,
          name: item.user.nickname,
          commentId: item.commentId,
          avatarUrl: item.user.avatarUrl,
          time: formatTime(item.time),
          likedCount: item.likedCount,
          content: item.content
        }
      })
    }
    return {
      id: comment.user.userId,
      name: comment.user.nickname,
      commentId: comment.commentId,
      avatarUrl: comment.user.avatarUrl,
      time: formatTime(comment.time),
      likedCount: comment.likedCount,
      content: comment.content,
      beReplied
    }
  })
  return {
    hotComments: hotComments || [],
    comments,
    total
  }
}