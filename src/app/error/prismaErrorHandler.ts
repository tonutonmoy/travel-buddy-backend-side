const prismaErrorHandler = (err: any) => {
  let errorMessage = "";
  let errorDetails: any = [];

  if (err.code === "P2002") {
    // Unique constraint violation error
    errorMessage = `${err?.meta?.target[0]} already exists`;
    errorDetails = err;
  }

  return {
    message: errorMessage,
    errorDetails: {
      issus: errorDetails,
    },
  };
};

export default prismaErrorHandler;
