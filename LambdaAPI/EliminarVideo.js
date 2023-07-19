var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


export const handler = async (event) => {
    const { id_video } = event;

    try {

        var params = {
            TableName: 'TABLE',
            Key: {
                'KEY_NAME': { N: 'VALUE' }
            }
        };
        // Call DynamoDB to delete the item from the table
        ddb.deleteItem(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Registro eliminado correctamente' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar el registro' }),
        };
    }
};
