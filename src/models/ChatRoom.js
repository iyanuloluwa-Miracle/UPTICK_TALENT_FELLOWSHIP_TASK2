const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Add other chat room fields as needed
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
