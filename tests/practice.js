// Syncronous Callback
function greet(name, callback) {
    var message = "hello ".concat(name, " !");
    callback(message);
}
function displayMessage(msg1) {
    console.log(msg1);
}
function appendMessage(msg2) {
    var newmessage = "How are you ?";
    console.log(msg2 + newmessage);
}
function fetchData(inputData, callback) {
    console.log("Fetching data " + inputData);
    setTimeout(function () {
        callback(inputData);
    }, 4000);
}
function processData(data) {
    console.log("Processing finished for ".concat(data, " ..."));
}
greet("Vishvas", displayMessage);
greet("Vishvas", appendMessage);
fetchData("new users", processData);
