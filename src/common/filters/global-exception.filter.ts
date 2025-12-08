import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from 'express';
import { ProfileIdNotFoundError } from "src/items/errors";

// global-exception.filter.ts
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // 1. Preserve built-in behavior for HttpException
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse();

            const body =
                typeof res === 'string'
                    ? {
                        statusCode: status,
                        message: res,
                    }
                    : res;

            return response.status(status).json(body);
        }
        // 2. Map domain errors to Http-style shape
        if (exception instanceof ProfileIdNotFoundError) {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message,
                error: 'Not Found',
                path: request.url,
                timestamp: new Date().toISOString(),
            });
        }

        // 3. Fallback – unknown error
        return response.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: 'Internal Server Error',
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
