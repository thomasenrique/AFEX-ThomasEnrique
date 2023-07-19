import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({});

var objDebug = {
    paso: 1,
    id: null,
    data: null,
    dataFilter: null
}

export const handler = async (event) => {



    const dataEvent = JSON.parse(event.body);
    const id = dataEvent.id_video;

    objDebug.id = id

    try {
        const params = {
            TableName: 'video_info',
        };
        const data = await ddbClient.send(new ScanCommand(params));

        objDebug.data = data.Items;

        objDebug.dataFilter = data.Items.filter(data => data.id_video.S == id)

        var finalRes = {};
        var statusCode = 404;

        if (objDebug.dataFilter.length > 0) {
            finalRes = objDebug.dataFilter[0];
            statusCode = 200;
        }

        const response = {
            statusCode: statusCode,
            body: JSON.stringify(finalRes),
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
