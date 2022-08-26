class Locals {
  public static config(): any {
    const PORT: number = parseInt(process.env.PORT as string) || 9000;
    const COSMOS_URL: string = (process.env.COSMOSDB_URL as string)
      || 'mongodb+srv://surajxxx:MetEma4V1FgQslG7@cluster0.ik33b.mongodb.net/dapr-db-user?retryWrites=true&w=majority';
    const JWT_SECRET: string = (process.env.JWT_SECRET as string) || 'geekyants';
    const JWT_EXPIRE: string = (process.env.JWT_EXPIRE as string) || '90000s';
    const NODE_ENV: string = (process.env.NODE_ENV as string) || 'development';

    return {
      PORT,
      COSMOS_URL,
      JWT_EXPIRE,
      JWT_SECRET,
      NODE_ENV,
    };
  }
}

export default Locals;
