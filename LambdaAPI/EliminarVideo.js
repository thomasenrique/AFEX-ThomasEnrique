const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event, context) => {
    try {

        const data = JSON.parse(event.body);

        const params = {
            TableName: "video_info",
            keyToDelete: data.keyToDelete
        };

        await dynamoDB.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Elemento eliminado correctamente.')
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