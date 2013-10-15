///<reference path="../References.ts" />
//Wrapper around Raphael.js to provide support for groups and drawing elements inside groups.
var PaperGroup = (function () {
    function PaperGroup(paper, group) {
        this.paper = paper;
        this.group = group;
    }
    PaperGroup.prototype.newGroup = function () {
        var newRaphaelGroup = this.paper.group();
        this.group.push(newRaphaelGroup);
        var newPaperGroup = new PaperGroup(this.paper, newRaphaelGroup);
        return newPaperGroup;
    };

    PaperGroup.prototype.rect = function (x, y, width, height, r) {
        var element = this.paper.rect(x, y, width, height, r);
        this.group.push(element);
        return element;
    };
    return PaperGroup;
})();
