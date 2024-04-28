import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


class AwsRepository {
    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
            }
        })
    }

    async uploadFile(file) {
        const putObjectParams = {
            Bucket: process.env.BUCKET,
            Key: file.filename,
            Body: file.buffer
        }
        /**subida del file a aws en S3 */
        await this.s3Client.send(new PutObjectCommand(putObjectParams));

        /**obtener la url del file */
        const getObjectParams = {
            Bucket: "apijob",
            Key: file.filename,
        };
        return await getSignedUrl(this.s3Client, new GetObjectCommand(getObjectParams));
    }

    async deleteFile(filename) {
        const deleteObjectParams = {
            Bucket: "apijob",
            key: filename
        }
        await this.s3Client.send(new DeleteObjectCommand(deleteObjectParams))
    }
}


export default AwsRepository

