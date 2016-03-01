angular.module("deco.packages.core",["deco.packages.core.template","deco.packages.core.config","deco.packages.core.crypto","deco.packages.core.routes","deco.packages.core.keyactions"]),angular.module("deco.packages.core.config",[]),angular.module("deco.packages.core.config").provider("appConfig",[function(){var e="",t={},o={};this.setConfigJson=function(o){e=o,t.config={}},o.getConfigJson=function(){return e},o._parseConfig=function(e,o,r,a){var c=[],n=o.defer();e=angular.isString(e.config)?crypto.onDecode(e.config,!0):e,angular.forEach(e,function(e,o){t.config[o]=e});var l=t.config.routes.file,i=t.config.menu.file;return l&&i&&(c[0]=r.get(l),c[1]=r.get(i)),o.all(c).then(function(e){a.buildState(e[0].data.config),a.setMenus(e[1].data.config),t.menus=a.getMenus(),n.resolve(t)}),n.promise},this.$get=["$http","Router","$q","$compile","$urlRouter",function(e,t,r,a,c){return o.run=function(n){return e.get(o.getConfigJson()).then(function(l){return o._parseConfig(l.data,r,e,t).then(function(e){c.sync(),c.listen();var t=angular.element("body");return t.attr("template",e.config.template),a(t)(n),e})})},o._runRoutes=function(){},o}]}]),angular.module("deco.packages.core.crypto",[]),angular.module("deco.packages.core.crypto").directive("decrypto",[function(){return{restrict:"E",templateUrl:Helper.dotStr2urlStr("templates.decopackages.tpl.diretivas.crypto.decrypto","html"),scope:{show:"="},link:function(e){e.txtDeco="d2G8VlzedUGbUU=t72f0fdb900e4838e35744a5f04609519ed6eea3b545b0553c586259d90b0684c"}}}]).filter("decrypt",function(){return function(e){var t=crypto.onDecode(e);return t}}).filter("encrypt",function(){return function(e){return crypto.onEncode(e)}}),angular.module("deco.packages.core.crypto").directive("crypto",[function(){return{restrict:"E",templateUrl:Helper.dotStr2urlStr("templates.decopackages.tpl.diretivas.crypto.crypto","html"),scope:{show:"="},link:function(e){e.txtToEnc="",e.objToEnc="",e.encode=function(){e.txtToEnc=crypto.onEncode(JSON.parse(json_encode(e.objToEnc)))}}}}]);var core=angular.module("deco.packages.core.keyactions");core.directive("ngEnter",function(){return function(e,t,o){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(o.ngEnter)}),t.preventDefault())})}}),core.directive("ngTab",function(){return function(e,t,o){t.bind("keydown keypress",function(t){9===t.which&&(e.$apply(function(){e.$eval(o.ngTab)}),t.preventDefault())})}}),angular.module("deco.packages.core.keyactions",[]),angular.module("deco.packages.core.routes").service("Router",["$state","$http","$urlRouter","APP_CONFIG","$q",function($state,$http,$urlRouter,APP_CONFIG,$q){var router={},urlCollection={};return router.getStates=function(){var e=$q.defer();return $http.get("data/states.json").then(function(t){urlCollection=t.data,router.buildState(urlCollection.states),e.resolve()}),e.promise},router.buildState=function(data){var defer=$q.defer(),url="";data=angular.isString(data)?crypto.onDecode(data,!0):data,angular.forEach(data.states,function(value,key){if(!$state.get(value.state)){var obj=value;void 0!==obj.views&&void 0!==obj.views.content?void 0!==obj.views.content.templateUrl&&(obj.views.content.templateUrl=eval(obj.views.content.templateUrl)):void 0!==obj.views&&void 0!==obj.views[obj.parent]&&void 0!==obj.views[obj.parent].templateUrl&&(obj.views[obj.parent].templateUrl=eval(obj.views[obj.parent].templateUrl)),$stateProviderRef.state(value.state,obj),0==key&&(url=value.url)}}),$urlRouterProviderRef.when("",url),$urlRouterProviderRef.when("/",url)},router.getMenus=function(){return urlCollection},router.setMenus=function(e){e=angular.isString(e)?crypto.onDecode(e,!0):e,angular.forEach(e,function(e){urlCollection[e.id]=e.itens})},router}]),angular.module("deco.packages.core.routes",[]),angular.module("deco.packages.core.template",[]),angular.module("deco.packages.core.template").directive("template",["$http",function(e){var t=Helper.getTemplate();return{restrict:"A",templateUrl:[t,"tpl","index.html"].join("/"),link:function(o,r){var a=function(){e.get([t,"theme.json"].join("/")).then(function(e){c(e.data),n(e.data)})},c=function(e){angular.forEach(e.attrs,function(e){var t=Object.keys(e).toString(),o=e[t];r.attr(t,o.join(" "))})},n=function(e){angular.forEach(e.positions,function(e){o.templates[e.name]=Helper.getLayout(e.tpl)})};a()}}}]),angular.module("deco.packages.core").run(["$templateCache",function(e){e.put("templates/decopackages/tpl/diretivas/crypto/crypto.html",'<div class="row" ng-if="show"><div class="col-md-12"><div class="panel panel-default"><div class="panel-body"><form><legend>Encriptografar</legend><div class="form-group"><textarea class="form-control" rows="5" cols="120" ng-model="txtToEnc"></textarea></div><div class="form-group"><pre class="text-muted">{{txtToEnc |encrypt}}</pre></div></form></div></div></div></div>'),e.put("templates/decopackages/tpl/diretivas/crypto/decrypto.html",'<div class="row" ng-if="show"><div class="col-md-12"><div class="panel panel-default"><div class="panel-body"><form action="" method="POST" role="form"><legend>Descriptografar</legend><div class="form-group"><textarea class="form-control" rows="5" cols="120" ng-model="txtDeco"></textarea></div><div class="form-group"><pre class="text-muted">{{txtDeco |decrypt}}</pre></div></form></div></div></div></div>'),e.put("templates/decopackages/tpl/diretivas/gauge/main.html",'<div class="delightmeter"><svg viewbox="-50 25 500 200" class="svg-content" xmlns="http://www.w3.org/2000/svg"><g><path class="arc" id="arc1" d=""></path><path class="arc" id="arc2" d=""></path><path class="arc" id="arc3" d=""></path><path class="arc" id="arc4" d=""></path><path class="arc" id="arc5" d=""></path><g class="needleset"><circle class="needle-center" cx="200" cy="200" r="5"></circle><path class="needle" d="M 200 195 L 60 200 L 200 205"></path><circle class="needle-center" cx="60" cy="200" r="20"></circle><circle id="needlePointer" class="needle-pointer" cx="60" cy="200" r="17" fill=""></circle><g class="scoreInCircle"><text x="55" y="200" fill="black" transform="">{{score | number:0}}</text></g></g><text x="120" y="195" fill="black">0</text><text x="195" y="220" fill="black">{{score}}</text><text x="255" y="195" fill="black">100</text></g></svg></div>')}]);