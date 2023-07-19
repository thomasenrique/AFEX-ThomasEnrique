import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event) => {
    try {
        const params = {
            TableName: 'video_info',
        };
        const data = await ddbClient.send(new ScanCommand(params));

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
        return response;
    } catch (error) {
        console.error("Error:", error);
        const response = {
            statusCode: 500,
            body: JSON.stringify("Internal Server Error"),
        };
        return response;
    }
};
