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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const authService_1 = require("../services/authService");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        const newUser = yield (0, authService_1.registerUser)({ fullName, email, password });
        const token = (0, authService_1.generateToken)(newUser._id.toString());
        res.status(201).json({
            message: "Registered successfully",
            user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, authService_1.loginUser)(email, password);
        const token = (0, authService_1.generateToken)(user._id.toString());
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, fullName: user.fullName, email: user.email },
            token,
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.login = login;
