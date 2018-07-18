"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var notification_service_1 = require("../../../notification/notification.service");
var url_rewrite_service_1 = require("../service/url-rewrite.service");
var url_rewrite_1 = require("../url-rewrite");
var InboundRuleComponent = /** @class */ (function () {
    function InboundRuleComponent(_service, _notificationService) {
        this._service = _service;
        this._notificationService = _notificationService;
        this.deleteEvent = new core_1.EventEmitter();
        this._editing = false;
        this.toFriendlyActionType = url_rewrite_1.ActionTypeHelper.toFriendlyActionType;
    }
    InboundRuleComponent.prototype.ngOnChanges = function (changes) {
        if (changes["rule"]) {
            this._original = JSON.parse(JSON.stringify(changes["rule"].currentValue));
        }
    };
    InboundRuleComponent.prototype.edit = function () {
        this._editing = true;
    };
    InboundRuleComponent.prototype.delete = function () {
        var _this = this;
        this._notificationService.confirm("Delete Inbound Rule", "Are you sure you want to delete '" + this.rule.name + "'?")
            .then(function (confirmed) { return confirmed && _this._service.deleteInboundRule(_this.rule); });
    };
    InboundRuleComponent.prototype.save = function () {
        var _this = this;
        this._service.saveInboundRule(this.rule)
            .then(function () { return _this._original = JSON.parse(JSON.stringify(_this.rule)); });
        this._editing = false;
    };
    InboundRuleComponent.prototype.discard = function () {
        this.rule = JSON.parse(JSON.stringify(this._original));
        this._editing = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", url_rewrite_1.InboundRule)
    ], InboundRuleComponent.prototype, "rule", void 0);
    __decorate([
        core_1.Output('delete'),
        __metadata("design:type", core_1.EventEmitter)
    ], InboundRuleComponent.prototype, "deleteEvent", void 0);
    InboundRuleComponent = __decorate([
        core_1.Component({
            selector: 'inbound-rule',
            template: "\n        <div *ngIf=\"rule\" class=\"grid-item row\" [class.background-selected]=\"_editing\" (dblclick)=\"edit()\">\n            <div class=\"col-xs-8 col-sm-3 valign\">\n                <span class=\"pointer\" (click)=\"edit()\">{{rule.name}}</span>\n            </div>\n            <div class=\"visible-lg col-lg-2 valign\">\n                {{toFriendlyActionType(rule.action.type)}}\n            </div>\n            <div class=\"hidden-xs col-sm-3 col-lg-2 valign\">\n                {{rule.pattern}}\n            </div>\n            <div class=\"hidden-xs col-sm-4 valign\">\n                <span *ngIf=\"rule.action.type == 'redirect' || rule.action.type == 'rewrite'\">{{rule.action.url}}</span>\n            </div>\n            <div class=\"actions\">\n                <div class=\"action-selector\">\n                    <button title=\"More\" (click)=\"selector.toggle()\" (dblclick)=\"$event.preventDefault()\" [class.background-active]=\"(selector && selector.opened) || _editing || false\">\n                        <i class=\"fa fa-ellipsis-h\"></i>\n                    </button>\n                    <selector #selector [right]=\"true\">\n                        <ul>\n                            <li><button #menuButton class=\"edit\" title=\"Edit\" (click)=\"edit()\">Edit</button></li>\n                            <li><button #menuButton class=\"up\" title=\"Up\" (click)=\"_service.moveInboundUp(rule)\">Move Up</button></li>\n                            <li><button #menuButton class=\"down\" title=\"Down\" (click)=\"_service.moveInboundDown(rule)\">Move Down</button></li>\n                            <li><button #menuButton class=\"copy\" title=\"Copy\" (click)=\"_service.copyInboundRule(rule)\">Clone</button></li>\n                            <li><button #menuButton class=\"delete\" title=\"Delete\" (click)=\"delete()\">Delete</button></li>\n                        </ul>\n                    </selector>\n                </div>\n            </div>\n        </div>\n        <selector #editSelector [opened]=\"true\" *ngIf=\"_editing\" class=\"container-fluid\" (hide)=\"discard()\">\n            <inbound-rule-edit [rule]=\"rule\" (save)=\"save($event)\" (cancel)=\"discard()\"></inbound-rule-edit>\n        </selector>\n    "
        }),
        __metadata("design:paramtypes", [url_rewrite_service_1.UrlRewriteService, notification_service_1.NotificationService])
    ], InboundRuleComponent);
    return InboundRuleComponent;
}());
exports.InboundRuleComponent = InboundRuleComponent;
//# sourceMappingURL=inbound-rule.component.js.map