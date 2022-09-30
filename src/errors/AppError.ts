class AppError extends Error {
	statusCode: number;
	constructor(statusCode: number = 400, message: string) {
		super();
		this.message = message;
		this.statusCode = statusCode;
	}
}

export default AppError;
