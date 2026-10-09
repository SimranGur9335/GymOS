"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = __importDefault(require("./utils/logger"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function start() {
    try {
        await prisma.$connect();
        logger_1.default.info('✅ Connected to PostgreSQL');
        app_1.default.listen(config_1.PORT, () => {
            logger_1.default.info(`🚀 Server running in ${config_1.NODE_ENV} mode on http://localhost:${config_1.PORT}`);
        });
    }
    catch (err) {
        logger_1.default.error('Failed to start server', err);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=server.js.map