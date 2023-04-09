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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRecords = void 0;
var express_1 = __importDefault(require("express"));
var SingeTodo_1 = __importDefault(require("../models/SingeTodo"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var router = express_1.default.Router();
router.use(express_1.default.json());
var mydb = process.env.DB;
var todo_collection = process.env.TODO_COLLECTION;
router.get('/', function (req, res) {
    res.send('<h1>Israel is the best</h1>');
});
router.get('/h', function (req, res) {
    res.send('<h1>You are fake</h1>');
});
// add a new todo to the database
router.route('/').post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, todo, id, isDone, newSingleToDo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, todo = _a.todo, id = _a.id, isDone = _a.isDone;
                newSingleToDo = new SingeTodo_1.default({ todo: todo, id: id, isDone: isDone });
                return [4 /*yield*/, newSingleToDo.save()];
            case 1:
                _b.sent();
                res.json('new Single To Do added!');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log('There is an error');
                console.error(error_1);
                res.status(500).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get all records from the database
router.get('/allTodos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllRecords(mydb, todo_collection)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// delete a todo Item
router.delete('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                // Check if the input value for "id" is a valid number
                if (isNaN(id)) {
                    res.status(400).json({ message: 'Invalid input for ID parameter' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, SingeTodo_1.default.deleteOne({ id: id })];
            case 2:
                result = _a.sent();
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: "Todo item with ID ".concat(id, " deleted successfully") });
                }
                else {
                    res.status(404).json({ message: "Todo item with ID ".concat(id, " not found") });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Define the getAllRecords function
function getAllRecords(databaseName, collectionName) {
    return __awaiter(this, void 0, void 0, function () {
        var db, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Getting all records from \"".concat(collectionName, "\" collection in \"").concat(databaseName, "\" database"));
                    db = mongoose_1.default.connection.db;
                    if (!!db) return [3 /*break*/, 2];
                    console.log('Database connection not ready yet. Waiting for "connected" event...');
                    return [4 /*yield*/, new Promise(function (resolve) { return mongoose_1.default.connection.once('connected', resolve); })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, db.collection(collectionName)
                        .find()
                        .sort({ id: 1 })
                        .toArray()];
                case 3:
                    result = _a.sent();
                    console.log("Got ".concat(result.length, " records"));
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getAllRecords = getAllRecords;
// edit a todo item's todo field
router.put('/edit/todo/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, todo, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                todo = req.body.todo;
                if (typeof todo === 'undefined') {
                    return [2 /*return*/, res.status(400).json({ error: 'todo req missing in request body' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, SingeTodo_1.default.findOneAndUpdate({ id: id }, { $set: { todo: todo } }, { new: true })];
            case 2:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "Todo item with ID ".concat(id, " not found") })];
                }
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(500).json({ message: 'Server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Update a todo item's isDone field
router.put('/update/isDone/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, isDone, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                isDone = req.body.isDone;
                if (typeof isDone === 'undefined') {
                    return [2 /*return*/, res.status(400).json({ error: 'isDone req missing in request body' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, SingeTodo_1.default.findOneAndUpdate({ id: id }, { $set: { isDone: isDone } }, { new: true })];
            case 2:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "Todo item with ID ".concat(id, " not found") })];
                }
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(500).json({ message: 'Server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
