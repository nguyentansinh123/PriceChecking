import express from 'express'
import { deleteUser, editMyAvatar, getAllUsersDetails, getMyDetails } from '../controller/user.controller'
import { userAuth } from '../middleware/userAuth'
import { upload } from '../middleware/multer'

export const router = express.Router()


router.get('/get-my-details',userAuth,getMyDetails)
router.get('/get-all-user-details',getAllUsersDetails)
router.put('/edit-avatar',userAuth,upload.single('avatar'),editMyAvatar)
router.delete('/delete-user',userAuth,deleteUser)

