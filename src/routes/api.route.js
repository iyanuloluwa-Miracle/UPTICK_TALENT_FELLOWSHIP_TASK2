const router = require('express').Router();
const chatController = require('../controllers/chatController');



router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
// Create a new chat room
router.post('/create', chatController.createChatRoom);

// List all chat rooms
router.get('/list', chatController.listChatRooms);

// Join a chat room
router.post('/join/:chatRoomId', chatController.joinChatRoom);

// Send a message to a chat room
router.post('/send-message/:chatRoomId', chatController.sendMessageToChatRoom);


module.exports = router;
