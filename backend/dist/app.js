"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rateLimiter = __importStar(require("./middleware/rateLimiter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const auth_1 = __importDefault(require("./routes/auth"));
const rbacTest_1 = __importDefault(require("./routes/rbacTest"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs")); // yamljs has no types, see declaration file
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Basic security middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Rate limiting - general API limit
app.use(rateLimiter.general);
// API version prefix
const apiBase = '/api/v1';
app.use(`${apiBase}/auth`, auth_1.default);
app.use(`${apiBase}`, rbacTest_1.default);
// Swagger UI & JSON
const openapiPath = path_1.default.join(__dirname, '..', 'docs', 'openapi.yaml');
const swaggerDocument = yamljs_1.default.load(openapiPath);
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/api/openapi.json', (req, res) => {
    res.json(swaggerDocument);
});
// Health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Global error handler – must be after all routes
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map