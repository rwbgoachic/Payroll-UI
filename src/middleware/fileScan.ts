import { Request, Response, NextFunction } from 'express';

interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
}

const defaultOptions: FileValidationOptions = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['application/pdf', 'image/jpeg', 'image/png']
};

export const fileScanMiddleware = (options: FileValidationOptions = defaultOptions) => {
  const { maxSize, allowedTypes } = { ...defaultOptions, ...options };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
      }

      const files = Array.isArray(req.files) ? req.files : Object.values(req.files);

      for (const file of files) {
        // Size validation
        if (file.size > maxSize) {
          return res.status(400).json({
            error: `File ${file.name} exceeds maximum size of ${maxSize / (1024 * 1024)}MB`
          });
        }

        // Type validation
        if (!allowedTypes.includes(file.mimetype)) {
          return res.status(400).json({
            error: `File type ${file.mimetype} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
          });
        }

        // Virus scan simulation (in production, integrate with actual antivirus API)
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      next();
    } catch (error) {
      console.error('File scanning error:', error);
      res.status(500).json({ error: 'File scanning failed' });
    }
  };
};

export const configureFileScan = (options?: FileValidationOptions) => {
  return fileScanMiddleware(options);
};