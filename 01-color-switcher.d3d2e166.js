!function(){function t(t){return t&&t.__esModule?t.default:t}var e={};Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};var o={};function n(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(t,e,o){e&&n(t.prototype,e);o&&n(t,o);return t};var r={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]"),body:document.querySelector("body")},u=new(function(){"use strict";function n(o){var u=o.onClick;t(e)(this,n),this.colorID=null,this.onClick=u,r.stopButton.setAttribute("disabled",!0)}return t(o)(n,[{key:"onStartButtonClick",value:function(){this.colorID=setInterval(this.onClick,1e3),r.startButton.setAttribute("disabled",!0),r.stopButton.removeAttribute("disabled")}},{key:"onStopButtonClick",value:function(){clearInterval(this.colorID),r.startButton.removeAttribute("disabled"),r.stopButton.setAttribute("disabled",!0)}},{key:"getRandomHexColor",value:function(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}}]),n}())({onClick:function(){return r.body.style.backgroundColor=u.getRandomHexColor()}});r.startButton.addEventListener("click",u.onStartButtonClick.bind(u)),r.stopButton.addEventListener("click",u.onStopButtonClick.bind(u))}();
//# sourceMappingURL=01-color-switcher.d3d2e166.js.map