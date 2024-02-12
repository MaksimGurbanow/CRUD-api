import { SendErrorArguments } from 'src/types/Types';
import { BasicHttpError } from '../errors/BasicHttpError';
import { InternalServerError } from '../errors/InternalServerError';

export const sendError = ({ response, err } : SendErrorArguments) => {
  const error = err instanceof BasicHttpError ? err : new InternalServerError();

  response.writeHead(error.statusCode, error.statusMessage, {
    'Content-Type': 'application/json',
  });

  response.end(JSON.stringify(error.message));
};
