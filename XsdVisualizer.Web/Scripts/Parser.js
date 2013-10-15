var XsdVisualizer;
(function (XsdVisualizer) {
    ///<reference path="References.ts" />
    (function (Parser) {
        //Useful for collecting all XsdVisualizer.Model.Element instances in a document.
        var ElementCollector = (function () {
            function ElementCollector() {
                this._elements = [];
            }
            ElementCollector.prototype.elements = function () {
                return this._elements;
            };

            ElementCollector.prototype.visitElement = function (element) {
                this._elements.push(element);
            };
            return ElementCollector;
        })();

        var ModelBuilder = (function () {
            function ModelBuilder() {
                this.types = [];
            }
            ModelBuilder.prototype.mapElements = function ($elements, callback) {
                var result = $elements.map(function (index, element) {
                    return callback($(element));
                }).toArray();
                return result;
            };

            ModelBuilder.prototype.getTypeStub = function (typeName) {
                var typeStub = new XsdVisualizer.Model.Type();
                typeStub.name = typeName;
                typeStub.state = XsdVisualizer.Model.TypeState.Stub;
                return typeStub;
            };

            ModelBuilder.prototype.parseElement = function ($element) {
                var element = new XsdVisualizer.Model.Element();
                element.name = $element.attr("name");
                var typeName = $element.attr("type");

                if (typeName)
                    element.type = this.getTypeStub(typeName);

                var $complexType = find($element, "> xs:complexType");

                if ($complexType.length > 0 && typeName)
                    throw new Error("Element can't have both type attribute and nested complexType defined!");

                if ($complexType.length > 1)
                    throw new Error("Element can't have more than one complexType child.");

                if ($complexType.length == 1) {
                    var complexType = this.parseComplexType($complexType);
                    element.type = complexType;
                }

                return element;
            };

            ModelBuilder.prototype.parseSequence = function ($parseSequence) {
                var _this = this;
                var sequence = new XsdVisualizer.Model.Sequence();
                sequence.elements = this.mapElements(find($parseSequence, "> xs:element"), function ($element) {
                    return _this.parseElement($element);
                });
                return sequence;
            };

            ModelBuilder.prototype.parseComplexType = function ($complexType) {
                var complexType = new XsdVisualizer.Model.ComplexType();
                complexType.name = $complexType.attr("name");
                complexType.sequence = this.parseSequence(find($complexType, "> xs:sequence"));
                complexType.state = XsdVisualizer.Model.TypeState.Concrete;
                this.types.push(complexType);
                return complexType;
            };

            //Overwriting type stubs with concrete types wherever possible.
            ModelBuilder.prototype.fixUpReferences = function (document) {
                var concreteTypes = document.types, concreteTypeDictionary = toDictionary(document.types, function (type) {
                    return type.name;
                }), elementCollector = new ElementCollector();

                document.accept(elementCollector);
                var elements = elementCollector.elements();

                $.each(elements, function (index, element) {
                    if (element.type.state === XsdVisualizer.Model.TypeState.Concrete)
                        return;

                    //overwrite the stubs with concrete types if possible
                    var typeName = element.type.name, concreteType = concreteTypeDictionary[typeName];

                    if (concreteType)
                        element.type = concreteType;
                });
            };

            ModelBuilder.prototype.parse = function (markup) {
                var _this = this;
                var $document = $($.parseXML(markup)), $schema = find($document, "xs:schema"), $rootElements = find($schema, "> xs:element"), $complexTypes = find($schema, "> xs:complexType");

                this.mapElements($complexTypes, function ($element) {
                    return _this.parseComplexType($element);
                });
                var elements = this.mapElements($rootElements, function ($element) {
                    return _this.parseElement($element);
                });
                var document = new XsdVisualizer.Model.Document();
                document.types = this.types;
                document.elements = elements;
                this.fixUpReferences(document);
                return document;
            };
            return ModelBuilder;
        })();

        function find($node, selector) {
            return $node.find(selector.replace(":", "\\:"));
        }

        //Creates a hashmap out of the passed in elements array.
        //The keys of the hashmap will be the array items' property values defined by keySelector.
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
