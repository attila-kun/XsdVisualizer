var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var XsdVisualizer;
(function (XsdVisualizer) {
    (function (Model) {
        (function (TypeState) {
            //Used during parsing, when object refrences are not fixed up yet.
            TypeState[TypeState["Stub"] = 0] = "Stub";

            TypeState[TypeState["Concrete"] = 1] = "Concrete";
        })(Model.TypeState || (Model.TypeState = {}));
        var TypeState = Model.TypeState;

        var Document = (function () {
            function Document() {
            }
            return Document;
        })();
        Model.Document = Document;

        var Type = (function () {
            function Type() {
            }
            Type.prototype.getReferencedTypes = function () {
                return [];
            };
            return Type;
        })();
        Model.Type = Type;

        var BuiltInType = (function (_super) {
            __extends(BuiltInType, _super);
            function BuiltInType() {
                _super.apply(this, arguments);
            }
            return BuiltInType;
        })(Type);
        Model.BuiltInType = BuiltInType;

        var SimpleType = (function (_super) {
            __extends(SimpleType, _super);
            function SimpleType() {
                _super.apply(this, arguments);
            }
            return SimpleType;
        })(Type);
        Model.SimpleType = SimpleType;

        var ComplexType = (function (_super) {
            __extends(ComplexType, _super);
            function ComplexType() {
                _super.apply(this, arguments);
            }
            ComplexType.prototype.getReferencedTypes = function () {
                var types = $.map(this.sequence.elements, function (element, index) {
                    return element.type;
                });
                return types;
            };
            return ComplexType;
        })(Type);
        Model.ComplexType = ComplexType;

        var Sequence = (function () {
            function Sequence() {
            }
            return Sequence;
        })();
        Model.Sequence = Sequence;

        var Element = (function () {
            function Element() {
            }
            return Element;
        })();
        Model.Element = Element;

        var Restriction = (function () {
            function Restriction() {
            }
            return Restriction;
        })();
        Model.Restriction = Restriction;
    })(XsdVisualizer.Model || (XsdVisualizer.Model = {}));
    var Model = XsdVisualizer.Model;
})(XsdVisualizer || (XsdVisualizer = {}));
