import { ZodError, ZodIssue } from "zod";

const zodErrorHandler = (err: ZodError) => {
  let errorMessage = "";
  let errorDetails: any = [];

  const errorSources = err.issues.map((issue: ZodIssue) => {
    errorDetails.push({
      field: issue?.path[0],
      message: `${issue?.path[0]} field is require`,
    });
    let message = `${issue?.path[issue?.path?.length - 1]} field is ${
      issue?.message
    } . `;

    return message;
  });

  errorMessage = errorSources.join(" ");

  return {
    message: errorMessage,
    errorDetails: {
      issus: errorDetails,
    },
  };
};

export default zodErrorHandler;
