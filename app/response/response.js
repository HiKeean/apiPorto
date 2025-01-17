function requestError( success, messages, error)
{
    const data = {
        success: !!success,
        messages: messages,
        error: error
    }
    return data;
}

function requestTrue(success, messages, data)
{
    return {
        success: !!success,
        messages: messages,
        data: data
    }
}


module.exports = {
    requestError,
    requestTrue
}