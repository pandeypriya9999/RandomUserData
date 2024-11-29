import axios from 'axios';
import User from '../models/User';
import fetchDataAndSaveUsers from '../services/userService';

jest.mock('axios');
jest.mock('../models/User');


describe('fetchDataAndSaveUsers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('should process batches and save users to the database', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { results: Array(60).fill({ name: 'John Doe' }) },
        });
        (User.insertMany as jest.Mock).mockResolvedValue([]);

        await fetchDataAndSaveUsers(300);

        expect(axios.get).toHaveBeenCalledTimes(5); // Assuming 5 requests for 300 users in batches of 60
        expect(User.insertMany).toHaveBeenCalledTimes(1);
        expect(User.insertMany).toHaveBeenCalledWith(expect.any(Array));
    }, 10000); // Increased timeout

    it('should handle errors while saving users to the database', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: { results: Array(60).fill({ name: 'John Doe' }) },
        });
        (User.insertMany as jest.Mock).mockRejectedValue(new Error('Database error'));

        await fetchDataAndSaveUsers(300);

        expect(User.insertMany).toHaveBeenCalled();
    }, 10000);
});

