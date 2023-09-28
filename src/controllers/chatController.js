require('../models/database')
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
// Create a new chat room
exports.createChatRoom = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Chat room name is required.' });
    }

    // Check if the chat room name is already in use
    const existingChatRoom = await ChatRoom.findOne({ name });
    if (existingChatRoom) {
      return res.status(400).json({ message: 'Chat room with this name already exists.' });
    }

    // Create a new chat room
    const chatRoom = new ChatRoom({ name });
    await chatRoom.save();

    return res.status(201).json({ message: 'Chat room created successfully.', chatRoom });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// List all chat rooms
exports.listChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();
    return res.status(200).json(chatRooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Join a chat room
exports.joinChatRoom = async (req, res) => {
    try {
      const { chatRoomId } = req.params;
      const { userId } = req.body;
  
      // Check if the chat room exists
      const chatRoom = await ChatRoom.findById(chatRoomId);
  
      if (!chatRoom) {
        return res.status(400).json({ message: 'Chat room not found.' });
      }
  
      // Add the user to the chat room (you may need to define a schema for this relationship)
      // For simplicity, we assume that the chat room has a `users` field as an array of user IDs
      chatRoom.users.push(userId);
      await chatRoom.save();
  
      return res.status(200).json({ message: 'User joined the chat room successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
};


// Send a message to a chat room
exports.sendMessageToChatRoom = async (req, res) => {
    try {
      const { chatRoomId } = req.params;
      const { userId, text } = req.body;
  
      // Check if the chat room exists
      const chatRoom = await ChatRoom.findById(chatRoomId);
  
      if (!chatRoom) {
        return res.status(400).json({ message: 'Chat room not found.' });
      }
  
      // Create a new message
      const message = new Message({
        sender: userId,
        text,
        chatRoom: chatRoomId,
      });
  
      // Save the message to the database
      await message.save();
  
      // Send the message to all users in the chat room using WebSocket (you'll need to implement this)
  
      return res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Fetch all messages in a chat room
exports.getChatRoomMessages = async (req, res) => {
    try {
      const { chatRoomId } = req.params;
  
      // Check if the chat room exists
      const chatRoom = await ChatRoom.findById(chatRoomId);
  
      if (!chatRoom) {
        return res.status(400).json({ message: 'Chat room not found.' });
      }
  
      // Retrieve all messages for the chat room
      const messages = await Message.find({ chatRoom: chatRoomId }).populate('sender');
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
};


