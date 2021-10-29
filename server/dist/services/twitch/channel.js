"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const getChannel = (token, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`;
    const res = yield service_1.default(token, baseUrl);
    if (res) {
        const data = res.data.data[0];
        if (data) {
            return data;
        }
        else {
            throw new Error('not found');
        }
    }
    else {
        throw new Error('not found');
    }
});
exports.default = getChannel;
//# sourceMappingURL=channel.js.map