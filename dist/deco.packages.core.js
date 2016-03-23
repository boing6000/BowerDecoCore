angular.module("deco.packages.core",["deco.packages.core.template","deco.packages.core.config","deco.packages.core.crypto","deco.packages.core.routes","deco.packages.core.keyactions","deco.packages.core.filters"]),angular.module("deco.packages.core.config",["restangular"]),function(){angular.module("deco.packages.core.filters",[])}(),angular.module("deco.packages.core.crypto",[]),angular.module("deco.packages.core.routes",[]),angular.module("deco.packages.core.template",[]),angular.module("deco.packages.core.keyactions",[]),angular.module("deco.packages.core.config").service("configRestangular",["Restangular",function(e){var t={},r=!1,o={};return t.decryption=function(){r&&e.addResponseInterceptor(function(e,t){var r;if("getList"===t){var o=[],n={},a=0;angular.isString(e.data)||angular.isObject(e.data)?(e.data=crypto.onDecode(e.data,!0),a=void 0!=e.data.total?e.data.total:0,void 0!==e.data.total&&delete e.data.total,angular.forEach(e.data,function(e,t){o[t]=e,n[t]=e})):(o=e.data,n=e.data),r=o,r.original=n,r.total=a,r.status=e.status}else r=void 0===e.data?e:crypto.onDecode(e.data,!0);return r})},t.headers=function(t){e.addRequestInterceptor(function(o,n){if("post"===n&&a.addHeader(t.post),"put"===n&&a.addHeader(t.post),"delete"===n&&a.addHeader(t.post),"get"===n&&a.addHeader(t.post),e.setDefaultHttpFields({withCredentials:!0}),r){var a={data:crypto.onEncode(o)};return $.param(a)}return o})},t.addHeader=function(t){t&&e.setDefaultHeaders(t)},this.config=function(n){angular.forEach(n,function(t,n){switch(n){case"url":e.setBaseUrl(t);break;case"encryption":r=!0;break;case"headers":o=t;break;case"suffix":e.setRequestSuffix(t)}}),t.decryption(),t.headers(o)},this}]),angular.module("deco.packages.core.config").provider("appConfig",[function(){var e="",t={},r={};this.setConfigJson=function(r){e=r,t.config={}},r.getConfigJson=function(){return e},r._parseConfig=function(e,r,o,n,a){var c=[],i=r.defer();e=angular.isString(e.config)?crypto.onDecode(e.config,!0):e,angular.forEach(e,function(e,r){t.config[r]=e}),Helper.setEnv(t.config.env),Helper.setTemplate(t.config.template),"Restangular"==t.config.api.type&&a.config(t.config.api);var l=t.config.routes.file,u=t.config.menu.file;return l&&u&&(c[0]=o.get(l),c[1]=o.get(u)),r.all(c).then(function(e){n.buildState(e[0].data.config),n.setMenus(e[1].data.config),t.menus=n.getMenus(),i.resolve(t)}),i.promise},this.$get=["$http","Router","$q","$compile","$urlRouter","configRestangular",function(e,t,o,n,a,c){return this.run=function(){return e.get(r.getConfigJson()).then(function(n){return r._parseConfig(n.data,o,e,t,c).then(function(e){return a.sync(),a.listen(),e})})},this}]}]),function(){angular.module("deco.packages.core.filters").filter("cgc",[function(){return function(e){var t=e+"";return 11==t.length?(t=t.replace(/\D/g,""),t=t.replace(/(\d{3})(\d)/,"$1.$2"),t=t.replace(/(\d{3})(\d)/,"$1.$2"),t=t.replace(/(\d{3})(\d{1,2})$/,"$1-$2")):(t=t.replace(/\D/g,""),t=t.replace(/^(\d{2})(\d)/,"$1.$2"),t=t.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"),t=t.replace(/\.(\d{3})(\d)/,".$1/$2"),t=t.replace(/(\d{4})(\d)/,"$1-$2")),t}}])}(),function(){angular.module("deco.packages.core.filters").filter("data",[function(){return function(e,t){return t=void 0==t?"DD/MM/YYYY":t,null!==e||""!==e?moment(e).format(t):""}}])}(),function(){angular.module("deco.packages.core.filters").filter("datatempo",[function(){return function(e){return""!==e?moment(e).format("DD/MM/YYYY - HH:MM"):""}}])}(),function(){angular.module("deco.packages.core.filters").filter("decodeList",[function(){return function(e,t){var r=[];return t=void 0==t?"content":t,angular.forEach(e,function(){e[t]=crypto.onDecode(e[t],!0),r.push(t)}),r}}])}(),function(){angular.module("deco.packages.core.filters").filter("fone",[function(){return function(e){var t=e+"";return t=t.replace(/\D/g,""),t=11===t.length?t.replace(/^(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):10===t.length?t.replace(/^(\d{2})(\d{4})(\d{4})/,"($1) $2-$3"):t.replace(/^(\d{4})(\d{4})/,"$1-$2")}}])}(),function(){angular.module("deco.packages.core.filters").filter("fromNow",[function(){return function(e){return moment(e).fromNow()}}])}(),function(){angular.module("deco.packages.core.filters").filter("moeda",[function(){return function(e,t){return t=void 0===t?2:t,"R$ "+number_format(e,t,",",".")}}])}(),function(){angular.module("deco.packages.core.filters").filter("number",[function(){return function(e,t){return t=void 0===t?2:t,number_format(e,t,",",".")}}])}(),function(){angular.module("deco.packages.core.filters").filter("text",[function(){return function(e,t){return void 0!==t?void 0!==e[t]?e[t]:"":e}}])}(),function(){angular.module("deco.packages.core.filters").filter("time",[function(){function e(e){return("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)}return function(t){return t instanceof Date||(t=new Date(t),!isNaN(t.getTime()))?e(t):void 0}}])}(),function(){angular.module("deco.packages.core.filters").filter("trustHtml",["$sce",function(e){return function(t){return e.trustAsHtml(t)}}])}(),function(){angular.module("deco.packages.core.filters").filter("useFilter",["$filter",function(e){return function(){var t=[].splice.call(arguments,1,1)[0];if(t.indexOf(":")>0){var r=t.split(":");return t=r[0],r[0]=arguments[0],e(t).apply(null,r)}return e(t).apply(null,arguments)}}])}(),function(){angular.module("deco.packages.core.filters").filter("boolean",[function(){return function(e){return angular.isNumber(e)?1==e:angular.isString(e)?"1"==e:!1}}])}(),angular.module("deco.packages.core.crypto").directive("decrypto",[function(){return{restrict:"E",templateUrl:Helper.dotStr2urlStr("templates.decopackages.tpl.diretivas.crypto.decrypto","html"),scope:{show:"="},link:function(e){e.txtDeco="d2G8VlzedUGbUU=t72f0fdb900e4838e35744a5f04609519ed6eea3b545b0553c586259d90b0684c"}}}]).filter("decrypt",function(){return function(e){var t=crypto.onDecode(e);return t}}).filter("encrypt",function(){return function(e){return crypto.onEncode(e)}}),angular.module("deco.packages.core.crypto").directive("crypto",[function(){return{restrict:"E",templateUrl:Helper.dotStr2urlStr("templates.decopackages.tpl.diretivas.crypto.crypto","html"),scope:{show:"="},link:function(e){e.txtToEnc="",e.objToEnc="",e.encode=function(){e.txtToEnc=crypto.onEncode(JSON.parse(json_encode(e.objToEnc)))}}}}]),angular.module("deco.packages.core.routes").service("Router",["$state","$q",function($state,$q){var router={},urlCollection={};return router.buildState=function(data){var defer=$q.defer(),url="";data=angular.isString(data)?crypto.onDecode(data,!0):data,angular.forEach(data.states,function(value,key){if(!$state.get(value.state)){var obj=value;void 0!==obj.views&&void 0!==obj.views.layout&&void 0!==obj.views.layout.templateUrl&&(obj.views.layout.templateUrl=eval(obj.views.layout.templateUrl)),void 0!==obj.views&&void 0!==obj.views.content?void 0!==obj.views.content.templateUrl&&(obj.views.content.templateUrl=eval(obj.views.content.templateUrl)):void 0!==obj.views&&void 0!==obj.views[obj.parent]&&void 0!==obj.views[obj.parent].templateUrl&&(obj.views[obj.parent].templateUrl=eval(obj.views[obj.parent].templateUrl)),$stateProviderRef.state(value.state,obj),Helper.isBoolean(value.default)&&(url=value.url)}}),$urlRouterProviderRef.when("",url),$urlRouterProviderRef.when("/",url),$urlRouterProviderRef.otherwise("/404")},router.getMenus=function(){return urlCollection},router.setMenus=function(e){e=angular.isString(e)?crypto.onDecode(e,!0):e,angular.forEach(e,function(e){urlCollection[e.id]=e.itens})},router}]),angular.module("deco.packages.core.template").directive("template",["$http","TemplatePositionService",function(e,t){var r=null;return{restrict:"A",template:'<div ng-if="tpl != undefined" ng-include="tpl"></div>',link:function(o,n,a){o.tpl=void 0;var c=function(){e.get([r,"theme.json"].join("/")).then(function(e){o.tpl=[r,"tpl","index.html"].join("/"),i(e.data),l(e.data)})},i=function(e){angular.forEach(e.attrs,function(e){var t=Object.keys(e).toString(),r=e[t];n.attr(t,r.join(" "))})},l=function(e){angular.forEach(e.positions,function(e){t.setPosition(e.name,Helper.getLayout(e.tpl))})};a.$observe("template",function(e){void 0!=e&&(r=Helper.getTemplate(),""!==r&&c())})}}}]),function(){angular.module("deco.packages.core.template").service("TemplatePositionService",[function(){var e={},t={};return e.setPosition=function(e,r){t[e]=r},e.getPosition=function(e){return t[e]},e.getAllPositions=function(){return t},e}])}();var core=angular.module("deco.packages.core.keyactions");core.directive("ngEnter",function(){return function(e,t,r){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(r.ngEnter)}),t.preventDefault())})}}),core.directive("ngTab",function(){return function(e,t,r){t.bind("keydown keypress",function(t){9===t.which&&(e.$apply(function(){e.$eval(r.ngTab)}),t.preventDefault())})}}),angular.module("deco.packages.core").run(["$templateCache",function(e){e.put("templates/decopackages/tpl/diretivas/gauge/main.html",'<div class="delightmeter"><svg viewbox="-50 25 500 200" class="svg-content" xmlns="http://www.w3.org/2000/svg"><g><path class="arc" id="arc1" d=""></path><path class="arc" id="arc2" d=""></path><path class="arc" id="arc3" d=""></path><path class="arc" id="arc4" d=""></path><path class="arc" id="arc5" d=""></path><g class="needleset"><circle class="needle-center" cx="200" cy="200" r="5"></circle><path class="needle" d="M 200 195 L 60 200 L 200 205"></path><circle class="needle-center" cx="60" cy="200" r="20"></circle><circle id="needlePointer" class="needle-pointer" cx="60" cy="200" r="17" fill=""></circle><g class="scoreInCircle"><text x="55" y="200" fill="black" transform="">{{score | number:0}}</text></g></g><text x="120" y="195" fill="black">0</text><text x="195" y="220" fill="black">{{score}}</text><text x="255" y="195" fill="black">100</text></g></svg></div>'),e.put("templates/decopackages/tpl/diretivas/crypto/crypto.html",'<div class="row" ng-if="show"><div class="col-md-12"><div class="panel panel-default"><div class="panel-body"><form><legend>Encriptografar</legend><div class="form-group"><textarea class="form-control" rows="5" cols="120" ng-model="txtToEnc"></textarea></div><div class="form-group"><pre class="text-muted">{{txtToEnc |encrypt}}</pre></div></form></div></div></div></div>'),e.put("templates/decopackages/tpl/diretivas/crypto/decrypto.html",'<div class="row" ng-if="show"><div class="col-md-12"><div class="panel panel-default"><div class="panel-body"><form action="" method="POST" role="form"><legend>Descriptografar</legend><div class="form-group"><textarea class="form-control" rows="5" cols="120" ng-model="txtDeco"></textarea></div><div class="form-group"><pre class="text-muted">{{txtDeco |decrypt}}</pre></div></form></div></div></div></div>')}]);