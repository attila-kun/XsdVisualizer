var XsdVisualizer;
(function (XsdVisualizer) {
    ///<reference path="References.ts" />
    (function (Parser) {
        var ModelBuilder = (function () {
            function ModelBuilder() {
                this.types = {};
            }
            ModelBuilder.prototype.mapElements = function ($elements, callback) {
                var result = $elements.map(function (index, element) {
                    return callback($(element));
                }).toArray();
                return result;
            };

            ModelBuilder.prototype.registerTypes = function (types) {
                var _this = this;
                $.each(types, function (index, type) {
                    _this.types[type.name] = type;
                });
            };

            ModelBuilder.prototype.getTypeStub = function (typeName) {
                var typeStub = new XsdVisualizer.Model.Type();
                typeStub.name = typeName;
                typeStub.state = XsdVisualizer.Model.TypeState.Stub;
                return typeStub;
            };

            ModelBuilder.prototype.parseElement = function ($element) {
                return {
                    name: $element.attr("name"),
                    type: this.getTypeStub($element.attr("type"))
                };
            };

            ModelBuilder.prototype.parseSequence = function ($parseSequence) {
                var _this = this;
                return {
                    elements: this.mapElements(find($parseSequence, "xs:element"), function ($element) {
                        return _this.parseElement($element);
                    })
                };
            };

            ModelBuilder.prototype.parseComplexType = function ($complexType) {
                var complexType = new XsdVisualizer.Model.ComplexType();
                complexType.name = $complexType.attr("name");
                complexType.sequence = this.parseSequence(find($complexType, "xs:sequence"));
                complexType.state = XsdVisualizer.Model.TypeState.Concrete;
                return complexType;
            };

            ModelBuilder.prototype.traverseDocument = function (document, callback) {
            };

            //Overwriting type stubs with concrete types wherever possible.
            ModelBuilder.prototype.fixUpReferences = function (document) {
                var concreteTypes = document.types;
                var concreteTypeDictionary = toDictionary(document.types, function (type) {
                    return type.name;
                });

                var typeNames = $.map(concreteTypes, function (type, index) {
                    return type.name;
                });
            };

            ModelBuilder.prototype.parse = function (markup) {
                var _this = this;
                var $document = $($.parseXML(markup)), $schema = find($document, "xs:schema"), $elements = find($schema, "xs:element"), $complexTypes = find($schema, "> xs:complexType");

                var complexTypes = this.mapElements($complexTypes, function ($element) {
                    return _this.parseComplexType($element);
                });

                var document = {
                    types: [],
                    elements: []
                };
                return null;
            };
            return ModelBuilder;
        })();

        function find($node, selector) {
            return $node.find(selector.replace(":", "\\:"));
        }

        function toDictionary(elements, keySelector) {
            var dictionary = {};
            $.each(elements, function (index, element) {
                dictionary[keySelector(element)] = element;
            });
            return dictionary;
        }

        function parse(markup) {
            var modelBuilder = new ModelBuilder();
            return modelBuilder.parse(markup);
        }
        Parser.parse = parse;
    })(XsdVisualizer.Parser || (XsdVisualizer.Parser = {}));
    var Parser = XsdVisualizer.Parser;
})(XsdVisualizer || (XsdVisualizer = {}));
