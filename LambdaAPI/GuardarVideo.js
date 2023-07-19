import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        const video = JSON.parse(event.body);
        
        const newVideo = {
            ...video,
            id_video: randomUUID(),
        };
        
        await ddbDocClient.send(new PutCommand({
            TableName: "video_info",
            Item: newVideo,
        }));

        return {
            statusCode: 201,
            body: JSON.stringify(newVideo),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};