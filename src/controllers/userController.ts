import { Request, Response } from 'express';
import User from '../models/User';
import fetchDataAndSaveUsers from '../services/userService';

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', search = '{}' } = req.query;

    const searchObj = JSON.parse(search as string);

    const query: { [key: string]: any } = {};

    if (searchObj) {
      Object.keys(searchObj).forEach((key: string) => { 
        query[key] = { $regex: new RegExp(searchObj[key] as string, 'i') };
      });
    }

    // Find the users matching the query
    const users = await User.find(query)
      .sort(sortBy as string)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await User.countDocuments(query);

    // Return the result in the pagination format
    res.json({
      total,
      limit,
      page,
      sortBy,
      items: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An error occurred while fetching users.', error });
  }
};

export const populateUsers = async (req: Request, res: Response) => {
  const reqNumber = req.body.numUsers ? req.body.numUsers :1000 ;
  console.log("requested Num of users", reqNumber);
  try {
    await fetchDataAndSaveUsers(reqNumber);
    res.status(200).json({ message: 'Users populated successfully.' });
  } catch (error) {
    console.error('Error populating users:', error);
    res.status(500).json({ message: 'An error occurred while populating data.', error });
  }
};
