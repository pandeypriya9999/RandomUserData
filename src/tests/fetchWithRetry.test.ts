import axios from 'axios';
import { fetchWithRetry } from '../services/userService';

jest.mock('axios');
jest.mock('../models/User');

describe('fetchWithRetry', () => {
    const url = 'https://randomuser.me/api?results=60';

    it('should return data when request is successful', async () => {
        // Mock successful response
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { results: [{ name: 'John Doe' }] } });

        const result = await fetchWithRetry(url, 3);

        expect(result).toEqual([{ name: 'John Doe' }]);
        expect(axios.get).toHaveBeenCalledWith(url);
        expect(axios.get).toHaveBeenCalledTimes(1);  // Should have been called only once
    }, 10000);

    it('should retry on 429 error and return data', async () => {
        // Mock 429 error followed by a successful response
        (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 429 } });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { results: [{ name: 'Jane Doe' }] } });

        const result = await fetchWithRetry(url, 3);

        expect(result).toEqual([{ name: 'Jane Doe' }]);
        expect(axios.get).toHaveBeenCalledTimes(3); // Should have retried once
    }, 10000);

    it('should retry on 502 error and return data', async () => {
        // Mock 502 error followed by a successful response
        (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 502 } });
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { results: [{ name: 'Alice Doe' }] } });

        const result = await fetchWithRetry(url, 3);

        expect(result).toEqual([{ name: 'Alice Doe' }]);
        expect(axios.get).toHaveBeenCalledTimes(5); // Should have retried once
    }, 10000);

    it('should return empty array after retries are exhausted', async () => {
        // Mock failure for all retries
        (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 502 } });
        (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 502 } });
        (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 502 } });

        const result = await fetchWithRetry(url, 3);

        expect(result).toEqual([]); // Return empty array after retries
        expect(axios.get).toHaveBeenCalledTimes(9); // All retries exhausted
    }, 10000);
});

