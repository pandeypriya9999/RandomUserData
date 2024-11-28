import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

// Validation rules
const validationRules: ValidationChain[] = [
  body('requestPerBatch')
    .isInt({ gt: 0 })
    .withMessage('requestPerBatch must be a positive integer'),
  body('requestsPerSecond')
    .isInt({ gt: 0 })
    .withMessage('requestsPerSecond must be a positive integer'),
  body('batchSleep')
    .isInt({ gt: 0 })
    .withMessage('batchSleep must be a positive integer'),
  body('apiEndpoint')
    .isURL()
    .withMessage('apiEndpoint must be a valid URL'),
];

// Middleware to handle validation results
const handleValidationResult: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return undefined;
  }
  next();
};

// Combine validation rules and result handler, cast explicitly
export const validateConfig = [...validationRules, handleValidationResult] as RequestHandler[];