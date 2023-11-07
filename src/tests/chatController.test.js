const { listChatRooms } = require('../controllers/chatController');
const ChatRoom = require('../models/ChatRoom');

describe('listChatRooms', () => {
  it('should list all chat rooms', async () => {
    const mockChatRooms = [
      { _id: '1', name: 'Room 1' },
      { _id: '2', name: 'Room 2' },
    ]; // This is an example of mock chat rooms; you can create more as needed

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock the method to resolve with expected values
    ChatRoom.find = jest.fn().mockResolvedValue(mockChatRooms);

    await listChatRooms(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockChatRooms);
  });

  it('should handle errors and return 500 status on failure', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mocking the ChatRoom.find method to simulate an error
    ChatRoom.find = jest.fn().mockRejectedValue(new Error('Database error'));

    await listChatRooms(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error.' });
  });
  

});
