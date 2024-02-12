import { SendResultArguments } from "src/types/Types";

export const sendResult = ({
  response,
  result: { data, statusCode, statusMessage },
}: SendResultArguments) => {
  response.writeHead(statusCode, statusMessage, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
};
