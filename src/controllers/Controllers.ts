import type { IncomingMessage, ServerResponse } from 'node:http';
import { UserService } from '../services/UserService';
import { HttpMethods, UserOperation, UserToOperation } from '../types/Types';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { sendError } from '../utils/response/sendError';
import { SourceNotFoundError } from '../utils/errors/SourceNotFoundError';
import { sendResult } from '../utils/response/sendResult';
import { readRequestBody } from '../utils/streams/ReadRequestBody';

export class UserController {
  private _userService: UserService = new UserService();
  private _usersRegExp = new RegExp(/^\/api\/users[\/]?$/i);
  private _usersUuidRegexp = new RegExp(/^\/api\/users(?:\/([^\/]+?))[\/]?$/i);

  private async GET(id: string | null): Promise<UserOperation> {
    return id
      ? this._userService.getUserById(id)
      : this._userService.getUsers();
  }

  private async POST(
    id: string | null,
    request: IncomingMessage
  ): Promise<UserOperation> {
    if (id) throw new BadRequestError();

    const user = (await readRequestBody(request)) as UserToOperation;

    return this._userService.createUser(user);
  }

  private async PUT(
    id: string | null,
    request: IncomingMessage
  ): Promise<UserOperation> {
    if (!id) throw new BadRequestError();

    const user = (await readRequestBody(request)) as UserToOperation;

    return this._userService.updateUser(id, user);
  }

  private async DELETE(id: string | null): Promise<UserOperation> {
    if (!id) throw new BadRequestError();

    return this._userService.deleteUser(id);
  }

  public async handleRequest(
    request: IncomingMessage,
    response: ServerResponse
  ) {
    const { method, url } = request;

    console.log(`${new Date().toLocaleString()} ${method} ${url}`);

    const isValidRoute = this._isValidRoute(url);
    const isValidMethod = this._isValidMethod(method);

    if (!isValidRoute || !isValidMethod) {
      return sendError({ response, err: new SourceNotFoundError() });
    }

    try {
      if (isValidMethod) {
        const id = this._getIdFromUrl(url);

        const result = await this[method](id, request);

        return sendResult({ response, result });
      }
    } catch (error) {
      return sendError({ response, err: error });
    }
  }

  private _isValidRoute(url = ''): boolean {
    return this._usersRegExp.test(url) || this._usersUuidRegexp.test(url);
  }

  private _isValidMethod(method = ''): method is HttpMethods {
    switch (method) {
      case HttpMethods.Delete:
      case HttpMethods.Get:
      case HttpMethods.Post:
      case HttpMethods.Put: {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  private _getIdFromUrl(url = ''): string | null {
    return (
      url
        .split('/')
        .filter((char) => !!char)
        .at(2) || null
    );
  }
}
