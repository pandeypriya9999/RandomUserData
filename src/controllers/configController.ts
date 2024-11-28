import { Request, Response } from 'express';
import Config from '../models/Config';

export const upsertConfig = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { requestPerBatch, requestsPerSecond, batchSleep, apiEndpoint, apiParams } = req.body;

    // Input validation (optional but recommended)
    if (requestPerBatch <= 0 || requestsPerSecond <= 0 || batchSleep <= 0) {
      res.status(400).json({ message: 'Invalid configuration values.' });
    }

    // Upsert configuration (create or update)
    const updatedConfig = await Config.findOneAndUpdate(
      {},
      { requestPerBatch, requestsPerSecond, batchSleep, apiEndpoint, apiParams },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Configuration updated successfully.',
      config: updatedConfig,
    });
  } catch (error) {
    console.error('Error in upserting configuration:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};