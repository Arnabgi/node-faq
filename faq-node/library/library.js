const crypto = require('crypto');
module.exports = {
    decrypt: function(encryptdata) {
    if (!encryptdata) return "";
    try {
        const cipher = crypto.createDecipheriv(process.env.JWT_SECRET_KEY);
        let decryptedData = cipher.update(encryptdata, "hex", "utf-8");
        decryptedData += cipher.final('utf-8');
        return decryptedData;
    } catch (e) {
        console.log(e);
    }
    }
}