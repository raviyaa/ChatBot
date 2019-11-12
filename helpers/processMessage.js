const API_AI_TOKEN = "5fb2a2b2b3ca45c297383b2d6c956b77";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = "EAAKZBsPKQcPoBAFIz7iQUjh9ueQ0LtMy3WfHfwhyDVVOMzorAM6Ro8Ggobit8xvEUDA5ZCGifI7LTQnQU03RxWoGhuetRa6kVXZBh75TAcEwZCoqOCoLCngg62wSyRNlZChywxcQPlEuZARFptgnPRu7EsYnFF7TfVEbGWYYfmiwZDZD";
const request = require("request");
const sendTextMessage = (senderId, text) => {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: "POST",
        json: {
        recipient: { id: senderId },
        message: { text },
    }
 });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, { sessionId: "crowdbotics_bot" });
    apiaiSession.on("response", (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on("error", error => console.log(error));
    apiaiSession.end();
};