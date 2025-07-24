import express from 'express'
import { deleteUser, editMyAvatar, getAllUsersDetails, getMyDetails } from '../controller/user.controller'

export const router = express.Router()


router.get('/get-my-details',getMyDetails)
router.get('/get-all-user-details',getAllUsersDetails)
router.put('/edit-avatar',editMyAvatar)
router.delete('/delete-user',deleteUser)

