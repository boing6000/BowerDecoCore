angular.module("deco.packages.core",["deco.packages.core.template","deco.packages.core.config","deco.packages.core.crypto","deco.packages.core.routes","deco.packages.core.keyactions","deco.packages.core.filters"]),angular.module("deco.packages.core.crypto",[]),function(){angular.module("deco.packages.core.filters",[])}(),angular.module("deco.packages.core.keyactions",[]),angular.module("deco.packages.core.config",["restangular"]),angular.module("deco.packages.core.template",[]),angular.module("deco.packages.core.routes",[]),angular.module("deco.packages.core.crypto").directive("decrypto",[function(){return{restrict:"E",templateUrl:Helper.dotStr2urlStr("templates.decopackages.tpl.diretivas.crypto.decrypto","html"),scope:{show:"="},link:function(a){a.txtDeco="d2G8VlzedUGbUU=t72f0fdb900e4838e35744a5f04609519ed6eea3b545b0553c586259d90b0684c"}}}]).filter("decrypt",function(){return function(a){var e=crypto.onDecode(a);return e}}).filter("encrypt",function(){return function(a){return crypto.onEncode(a)}}),angular.module("deco.packages.core.crypto").directive("crypto",[function(){return{restrict:"E",templateUrl:Helper.dotStr2urlStr("templates.decopackages.tpl.diretivas.crypto.crypto","html"),scope:{show:"="},link:function(a){a.txtToEnc="",a.objToEnc="",a.encode=function(){a.txtToEnc=crypto.onEncode(JSON.parse(json_encode(a.objToEnc)))}}}}]);var core=angular.module("deco.packages.core.keyactions");core.directive("ngEnter",function(){return function(a,e,i){e.bind("keydown keypress",function(e){13===e.which&&(a.$apply(function(){a.$eval(i.ngEnter)}),e.preventDefault())})}}),core.directive("ngTab",function(){return function(a,e,i){e.bind("keydown keypress",function(e){9===e.which&&(a.$apply(function(){a.$eval(i.ngTab)}),e.preventDefault())})}}),function(){angular.module("deco.packages.core.filters").filter("cgc",[function(){return function(a){var e=a+"";return 11==e.length?(e=e.replace(/\D/g,""),e=e.replace(/(\d{3})(\d)/,"$1.$2"),e=e.replace(/(\d{3})(\d)/,"$1.$2"),e=e.replace(/(\d{3})(\d{1,2})$/,"$1-$2")):(e=e.replace(/\D/g,""),e=e.replace(/^(\d{2})(\d)/,"$1.$2"),e=e.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"),e=e.replace(/\.(\d{3})(\d)/,".$1/$2"),e=e.replace(/(\d{4})(\d)/,"$1-$2")),e}}])}(),function(){angular.module("deco.packages.core.filters").filter("data",[function(){return function(a,e){return e=void 0==e?"DD/MM/YYYY":e,null!==a||""!==a?moment(a).format(e):""}}])}(),function(){angular.module("deco.packages.core.filters").filter("datatempo",[function(){return function(a){return""!==a?moment(a).format("DD/MM/YYYY - HH:MM"):""}}])}(),function(){angular.module("deco.packages.core.filters").filter("decodeList",[function(){return function(a,e){var i=[];return e=void 0==e?"content":e,angular.forEach(a,function(){a[e]=crypto.onDecode(a[e],!0),i.push(e)}),i}}])}(),function(){angular.module("deco.packages.core.filters").filter("fone",[function(){return function(a){var e=a+"";return e=e.replace(/\D/g,""),e=11===e.length?e.replace(/^(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):10===e.length?e.replace(/^(\d{2})(\d{4})(\d{4})/,"($1) $2-$3"):e.replace(/^(\d{4})(\d{4})/,"$1-$2")}}])}(),function(){angular.module("deco.packages.core.filters").filter("fromNow",[function(){return function(a){return moment(a).fromNow()}}])}(),function(){angular.module("deco.packages.core.filters").filter("moeda",[function(){return function(a,e){return e=void 0===e?2:e,"R$ "+number_format(a,e,",",".")}}])}(),function(){angular.module("deco.packages.core.filters").filter("number",[function(){return function(a,e){return e=void 0===e?2:e,number_format(a,e,",",".")}}])}(),function(){angular.module("deco.packages.core.filters").filter("text",[function(){return function(a,e){return void 0!==e?void 0!==a[e]?a[e]:"":a}}])}(),function(){angular.module("deco.packages.core.filters").filter("time",[function(){function a(a){return("0"+a.getHours()).slice(-2)+":"+("0"+a.getMinutes()).slice(-2)}return function(e){return e instanceof Date||(e=new Date(e),!isNaN(e.getTime()))?a(e):void 0}}])}(),function(){angular.module("deco.packages.core.filters").filter("trustHtml",["$sce",function(a){return function(e){return a.trustAsHtml(e)}}])}(),function(){angular.module("deco.packages.core.filters").filter("useFilter",["$filter",function(a){return function(){var e=[].splice.call(arguments,1,1)[0];if(e.indexOf(":")>0){var i=e.split(":");return e=i[0],i[0]=arguments[0],a(e).apply(null,i)}return a(e).apply(null,arguments)}}])}(),function(){angular.module("deco.packages.core.filters").filter("boolean",[function(){return function(a){return angular.isNumber(a)?1==a:angular.isString(a)?"1"==a:!1}}])}(),angular.module("deco.packages.core.config").service("configRestangular",["Restangular",function(a){var e={},i=!1,s={};return e.decryption=function(){i&&a.addResponseInterceptor(function(a,e){var i;if("getList"===e){var s=[],l={},t=0;angular.isString(a.data)||angular.isObject(a.data)?(a.data=crypto.onDecode(a.data,!0),t=void 0!=a.data.total?a.data.total:0,void 0!==a.data.total&&delete a.data.total,angular.forEach(a.data,function(a,e){s[e]=a,l[e]=a})):(s=a.data,l=a.data),i=s,i.original=l,i.total=t,i.status=a.status}else i=void 0===a.data?a:crypto.onDecode(a.data,!0);return i})},e.headers=function(s){a.addRequestInterceptor(function(l,t){return"post"===t&&(e.addHeader(s.post),i)?crypto.onEncode(l,!0):"put"===t&&(e.addHeader(s.post),i)?crypto.onEncode(l,!0):("delete"===t&&e.addHeader(s.post),"get"===t&&e.addHeader(s.post),a.setDefaultHttpFields({withCredentials:!0}),l)})},e.addHeader=function(e){e&&a.setDefaultHeaders(e)},this.config=function(l){angular.forEach(l,function(e,l){switch(l){case"url":a.setBaseUrl(e);break;case"encryption":i=!0;break;case"headers":s=e;break;case"suffix":a.setRequestSuffix(e)}}),e.decryption(),e.headers(s)},this}]),angular.module("deco.packages.core.config").provider("appConfig",[function(){var a="",e={},i={};this.setConfigJson=function(i){a=i,e.config={}},i.getConfigJson=function(){return a},i._parseConfig=function(a,i,s,l,t){var r=[],n=i.defer();a=angular.isString(a.config)?crypto.onDecode(a.config,!0):a,angular.forEach(a,function(a,i){e.config[i]=a}),Helper.setEnv(e.config.env),Helper.setTemplate(e.config.template),"Restangular"==e.config.api.type&&t.config(e.config.api);var o=e.config.routes.file,d=e.config.menu.file;return o&&d&&(r[0]=s.get(o),r[1]=s.get(d)),i.all(r).then(function(a){l.buildState(a[0].data.config),l.setMenus(a[1].data.config),e.menus=l.getMenus(),n.resolve(e)}),n.promise},this.$get=["$http","Router","$q","$compile","$urlRouter","configRestangular",function(a,e,s,l,t,r){return this.run=function(){return a.get(i.getConfigJson()).then(function(l){return i._parseConfig(l.data,s,a,e,r).then(function(a){return t.sync(),t.listen(),a})})},this}]}]),angular.module("deco.packages.core.template").directive("template",["$http","TemplatePositionService",function(a,e){var i=null;return{restrict:"A",template:'<div ng-if="tpl != undefined" ng-include="tpl"></div>',link:function(s,l,t){s.tpl=void 0;var r=function(){a.get([i,"theme.json"].join("/")).then(function(a){s.tpl=[i,"tpl","index.html"].join("/"),n(a.data),o(a.data)})},n=function(a){angular.forEach(a.attrs,function(a){var e=Object.keys(a).toString(),i=a[e];l.attr(e,i.join(" "))})},o=function(a){angular.forEach(a.positions,function(a){e.setPosition(a.name,Helper.getLayout(a.tpl))})};t.$observe("template",function(a){void 0!=a&&(i=Helper.getTemplate(),""!==i&&r())})}}}]),function(){angular.module("deco.packages.core.template").service("TemplatePositionService",[function(){var a={},e={};return a.setPosition=function(a,i){e[a]=i},a.getPosition=function(a){return e[a]},a.getAllPositions=function(){return e},a}])}(),angular.module("deco.packages.core.routes").service("Router",["$state","$q",function($state,$q){var router={},urlCollection={};return router.buildState=function(data){var defer=$q.defer(),url="";data=angular.isString(data)?crypto.onDecode(data,!0):data,angular.forEach(data.states,function(value,key){if(!$state.get(value.state)){var obj=value;void 0!==obj.views&&void 0!==obj.views.layout&&void 0!==obj.views.layout.templateUrl&&(obj.views.layout.templateUrl=eval(obj.views.layout.templateUrl)),void 0!==obj.views&&void 0!==obj.views.content?void 0!==obj.views.content.templateUrl&&(obj.views.content.templateUrl=eval(obj.views.content.templateUrl)):void 0!==obj.views&&void 0!==obj.views[obj.parent]&&void 0!==obj.views[obj.parent].templateUrl&&(obj.views[obj.parent].templateUrl=eval(obj.views[obj.parent].templateUrl)),$stateProviderRef.state(value.state,obj),Helper.isBoolean(value.default)&&(url=value.url)}}),$urlRouterProviderRef.when("",url),$urlRouterProviderRef.when("/",url),$urlRouterProviderRef.otherwise("/404")},router.getMenus=function(){return urlCollection},router.setMenus=function(a){a=angular.isString(a)?crypto.onDecode(a,!0):a,angular.forEach(a,function(a){urlCollection[a.id]=a.itens})},router}]),angular.module("deco.packages.core").run(["$templateCache",function(a){a.put("templates/sb2/index.html",'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content=""><meta name="author" content=""><title>SB Admin 2 - Bootstrap Admin Theme</title><link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"><link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet"><link href="../dist/css/timeline.css" rel="stylesheet"><link href="../dist/css/sb-admin-2.css" rel="stylesheet"><link href="../bower_components/morrisjs/morris.css" rel="stylesheet"><link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"></head><body><div id="wrapper"><nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="index.html">SB Admin v2.0</a></div><ul class="nav navbar-top-links navbar-right"><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-envelope fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-messages"><li><a href="#"><div><strong>John Smith</strong> <span class="pull-right text-muted"><em>Yesterday</em></span></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div></a></li><li class="divider"></li><li><a href="#"><div><strong>John Smith</strong> <span class="pull-right text-muted"><em>Yesterday</em></span></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div></a></li><li class="divider"></li><li><a href="#"><div><strong>John Smith</strong> <span class="pull-right text-muted"><em>Yesterday</em></span></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div></a></li><li class="divider"></li><li><a class="text-center" href="#"><strong>Read All Messages</strong> <i class="fa fa-angle-right"></i></a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-tasks fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-tasks"><li><a href="#"><div><p><strong>Task 1</strong> <span class="pull-right text-muted">40% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div></div></a></li><li class="divider"></li><li><a href="#"><div><p><strong>Task 2</strong> <span class="pull-right text-muted">20% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% Complete</span></div></div></div></a></li><li class="divider"></li><li><a href="#"><div><p><strong>Task 3</strong> <span class="pull-right text-muted">60% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div></div></a></li><li class="divider"></li><li><a href="#"><div><p><strong>Task 4</strong> <span class="pull-right text-muted">80% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"><span class="sr-only">80% Complete (danger)</span></div></div></div></a></li><li class="divider"></li><li><a class="text-center" href="#"><strong>See All Tasks</strong> <i class="fa fa-angle-right"></i></a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-bell fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-alerts"><li><a href="#"><div><i class="fa fa-comment fa-fw"></i> New Comment <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-twitter fa-fw"></i> 3 New Followers <span class="pull-right text-muted small">12 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-envelope fa-fw"></i> Message Sent <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-tasks fa-fw"></i> New Task <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-upload fa-fw"></i> Server Rebooted <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a class="text-center" href="#"><strong>See All Alerts</strong> <i class="fa fa-angle-right"></i></a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user"><li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a></li><li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a></li><li class="divider"></li><li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li></ul></li></ul><div class="navbar-default sidebar" role="navigation"><div class="sidebar-nav navbar-collapse"><ul class="nav" id="side-menu"><li class="sidebar-search"><div class="input-group custom-search-form"><input type="text" class="form-control" placeholder="Search..."> <span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></li><li><a href="index.html"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a></li><li><a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> Charts<span class="fa arrow"></span></a><ul class="nav nav-second-level"><li><a href="flot.html">Flot Charts</a></li><li><a href="morris.html">Morris.js Charts</a></li></ul></li><li><a href="tables.html"><i class="fa fa-table fa-fw"></i> Tables</a></li><li><a href="forms.html"><i class="fa fa-edit fa-fw"></i> Forms</a></li><li><a href="#"><i class="fa fa-wrench fa-fw"></i> UI Elements<span class="fa arrow"></span></a><ul class="nav nav-second-level"><li><a href="panels-wells.html">Panels and Wells</a></li><li><a href="buttons.html">Buttons</a></li><li><a href="notifications.html">Notifications</a></li><li><a href="typography.html">Typography</a></li><li><a href="icons.html">Icons</a></li><li><a href="grid.html">Grid</a></li></ul></li><li><a href="#"><i class="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span class="fa arrow"></span></a><ul class="nav nav-second-level"><li><a href="#">Second Level Item</a></li><li><a href="#">Second Level Item</a></li><li><a href="#">Third Level <span class="fa arrow"></span></a><ul class="nav nav-third-level"><li><a href="#">Third Level Item</a></li><li><a href="#">Third Level Item</a></li><li><a href="#">Third Level Item</a></li><li><a href="#">Third Level Item</a></li></ul></li></ul></li><li><a href="#"><i class="fa fa-files-o fa-fw"></i> Sample Pages<span class="fa arrow"></span></a><ul class="nav nav-second-level"><li><a href="blank.html">Blank Page</a></li><li><a href="login.html">Login Page</a></li></ul></li></ul></div></div></nav><div id="page-wrapper"><div class="row"><div class="col-lg-12"><h1 class="page-header">Dashboard</h1></div></div><div class="row"><div class="col-lg-3 col-md-6"><div class="panel panel-primary"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-comments fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">26</div><div>New Comments!</div></div></div></div><a href="#"><div class="panel-footer"><span class="pull-left">View Details</span> <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div></div><div class="col-lg-3 col-md-6"><div class="panel panel-green"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-tasks fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">12</div><div>New Tasks!</div></div></div></div><a href="#"><div class="panel-footer"><span class="pull-left">View Details</span> <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div></div><div class="col-lg-3 col-md-6"><div class="panel panel-yellow"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-shopping-cart fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">124</div><div>New Orders!</div></div></div></div><a href="#"><div class="panel-footer"><span class="pull-left">View Details</span> <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div></div><div class="col-lg-3 col-md-6"><div class="panel panel-red"><div class="panel-heading"><div class="row"><div class="col-xs-3"><i class="fa fa-support fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge">13</div><div>Support Tickets!</div></div></div></div><a href="#"><div class="panel-footer"><span class="pull-left">View Details</span> <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span><div class="clearfix"></div></div></a></div></div></div><div class="row"><div class="col-lg-8"><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> Area Chart Example<div class="pull-right"><div class="btn-group"><button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">Actions <span class="caret"></span></button><ul class="dropdown-menu pull-right" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div></div><div class="panel-body"><div id="morris-area-chart"></div></div></div><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> Bar Chart Example<div class="pull-right"><div class="btn-group"><button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">Actions <span class="caret"></span></button><ul class="dropdown-menu pull-right" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div></div><div class="panel-body"><div class="row"><div class="col-lg-4"><div class="table-responsive"><table class="table table-bordered table-hover table-striped"><thead><tr><th>#</th><th>Date</th><th>Time</th><th>Amount</th></tr></thead><tbody><tr><td>3326</td><td>10/21/2013</td><td>3:29 PM</td><td>$321.33</td></tr><tr><td>3325</td><td>10/21/2013</td><td>3:20 PM</td><td>$234.34</td></tr><tr><td>3324</td><td>10/21/2013</td><td>3:03 PM</td><td>$724.17</td></tr><tr><td>3323</td><td>10/21/2013</td><td>3:00 PM</td><td>$23.71</td></tr><tr><td>3322</td><td>10/21/2013</td><td>2:49 PM</td><td>$8345.23</td></tr><tr><td>3321</td><td>10/21/2013</td><td>2:23 PM</td><td>$245.12</td></tr><tr><td>3320</td><td>10/21/2013</td><td>2:15 PM</td><td>$5663.54</td></tr><tr><td>3319</td><td>10/21/2013</td><td>2:13 PM</td><td>$943.45</td></tr></tbody></table></div></div><div class="col-lg-8"><div id="morris-bar-chart"></div></div></div></div></div><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-clock-o fa-fw"></i> Responsive Timeline</div><div class="panel-body"><ul class="timeline"><li><div class="timeline-badge"><i class="fa fa-check"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4><p><small class="text-muted"><i class="fa fa-clock-o"></i> 11 hours ago via Twitter</small></p></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis.</p></div></div></li><li class="timeline-inverted"><div class="timeline-badge warning"><i class="fa fa-credit-card"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia repellendus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores odit qui est tempora eos, nostrum provident explicabo dignissimos debitis vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p></div></div></li><li><div class="timeline-badge danger"><i class="fa fa-bomb"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p></div></div></li><li class="timeline-inverted"><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p></div></div></li><li><div class="timeline-badge info"><i class="fa fa-save"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam debitis amet, beatae consequuntur impedit nulla qui! Laborum, atque.</p><hr><div class="btn-group"><button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown"><i class="fa fa-gear"></i> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li><li><a href="#">Something else here</a></li><li class="divider"></li><li><a href="#">Separated link</a></li></ul></div></div></div></li><li><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi fuga odio quibusdam. Iure expedita, incidunt unde quis nam! Quod, quisquam. Officia quam qui adipisci quas consequuntur nostrum sequi. Consequuntur, commodi.</p></div></div></li><li class="timeline-inverted"><div class="timeline-badge success"><i class="fa fa-graduation-cap"></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">Lorem ipsum dolor</h4></div><div class="timeline-body"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati, quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque eaque.</p></div></div></li></ul></div></div></div><div class="col-lg-4"><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-bell fa-fw"></i> Notifications Panel</div><div class="panel-body"><div class="list-group"><a href="#" class="list-group-item"><i class="fa fa-comment fa-fw"></i> New Comment <span class="pull-right text-muted small"><em>4 minutes ago</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-twitter fa-fw"></i> 3 New Followers <span class="pull-right text-muted small"><em>12 minutes ago</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Message Sent <span class="pull-right text-muted small"><em>27 minutes ago</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-tasks fa-fw"></i> New Task <span class="pull-right text-muted small"><em>43 minutes ago</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-upload fa-fw"></i> Server Rebooted <span class="pull-right text-muted small"><em>11:32 AM</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-bolt fa-fw"></i> Server Crashed! <span class="pull-right text-muted small"><em>11:13 AM</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-warning fa-fw"></i> Server Not Responding <span class="pull-right text-muted small"><em>10:57 AM</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-shopping-cart fa-fw"></i> New Order Placed <span class="pull-right text-muted small"><em>9:49 AM</em></span></a> <a href="#" class="list-group-item"><i class="fa fa-money fa-fw"></i> Payment Received <span class="pull-right text-muted small"><em>Yesterday</em></span></a></div><a href="#" class="btn btn-default btn-block">View All Alerts</a></div></div><div class="panel panel-default"><div class="panel-heading"><i class="fa fa-bar-chart-o fa-fw"></i> Donut Chart Example</div><div class="panel-body"><div id="morris-donut-chart"></div><a href="#" class="btn btn-default btn-block">View Details</a></div></div><div class="chat-panel panel panel-default"><div class="panel-heading"><i class="fa fa-comments fa-fw"></i> Chat<div class="btn-group pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></button><ul class="dropdown-menu slidedown"><li><a href="#"><i class="fa fa-refresh fa-fw"></i> Refresh</a></li><li><a href="#"><i class="fa fa-check-circle fa-fw"></i> Available</a></li><li><a href="#"><i class="fa fa-times fa-fw"></i> Busy</a></li><li><a href="#"><i class="fa fa-clock-o fa-fw"></i> Away</a></li><li class="divider"></li><li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Sign Out</a></li></ul></div></div><div class="panel-body"><ul class="chat"><li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted"><i class="fa fa-clock-o fa-fw"></i> 12 mins ago</small></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p></div></li><li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><small class="text-muted"><i class="fa fa-clock-o fa-fw"></i> 13 mins ago</small> <strong class="pull-right primary-font">Bhaumik Patel</strong></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p></div></li><li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted"><i class="fa fa-clock-o fa-fw"></i> 14 mins ago</small></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p></div></li><li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><small class="text-muted"><i class="fa fa-clock-o fa-fw"></i> 15 mins ago</small> <strong class="pull-right primary-font">Bhaumik Patel</strong></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p></div></li></ul></div><div class="panel-footer"><div class="input-group"><input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..."> <span class="input-group-btn"><button class="btn btn-warning btn-sm" id="btn-chat">Send</button></span></div></div></div></div></div></div></div><script src="../bower_components/jquery/dist/jquery.min.js"></script><script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script><script src="../bower_components/metisMenu/dist/metisMenu.min.js"></script><script src="../bower_components/raphael/raphael-min.js"></script><script src="../bower_components/morrisjs/morris.min.js"></script><script src="../js/morris-data.js"></script><script src="../dist/js/sb-admin-2.js"></script></body></html>'),a.put("templates/sb2/tpl/index.html",'<div class="wrapper"><div ng-cloak="" ui-view="layout"></div></div>'),a.put("templates/sb2/tpl/modules/contas/main.html",'<div class="container"><div class="row"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">Contas</h3></div><div class="panel-body"><img src="ada.png"></div></div></div></div>'),a.put("templates/sb2/tpl/modules/dashboard/main.html",'<div class="row"><div class="col-lg-12"><h1 class="page-header">Dashboard</h1></div></div><div class="row"><teste></teste><crypto class="col-md-6" show="debug"></crypto><decrypto class="col-md-6" show="debug"></decrypto></div>'),a.put("templates/sb2/tpl/layout/404.html",'<div class="page-err"><div class="err-container"><div class="text-center"><div class="err-status"><h1>404</h1></div><div class="err-message"><h2 translate="yes">Página não encontrada!</h2></div><div class="err-body"><a go-back="" class="btn btn-lg btn-goback"><span class="fa fa-dashboard"></span> <span class="space"></span> {{\'Voltar\'|translate}}</a></div></div></div><div class="footer text-center"><i class="fa fa-copyright"></i> 2015</div></div>'),a.put("templates/sb2/tpl/layout/500.html",'<div class="page-err"><div class="err-container"><div class="text-center"><div class="err-status"><h1>500</h1></div><div class="err-message"><h2 translate="yes">Algo deu errado no Servidor!</h2></div><div class="err-body"><a go-back="" class="btn btn-lg btn-goback"><span class="fa fa-dashboard"></span> <span class="space"></span> {{\'Voltar\'|translate}}</a></div></div></div><div class="footer text-center"><i class="fa fa-copyright"></i> 2015</div></div>'),a.put("templates/sb2/tpl/layout/footer.html",'<div class="row"><pre class="col-md-6">{{config |json}}</pre><pre class="col-md-6">{{modules |json}}</pre></div>'),a.put("templates/sb2/tpl/layout/header.html",'<div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" ui-sref="dashboard">{{config.titulo}}</a></div><ul class="nav navbar-top-links navbar-right"><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-envelope fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-messages"><li><a href="#"><div><strong>John Smith</strong> <span class="pull-right text-muted"><em>Yesterday</em></span></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div></a></li><li class="divider"></li><li><a href="#"><div><strong>John Smith</strong> <span class="pull-right text-muted"><em>Yesterday</em></span></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div></a></li><li class="divider"></li><li><a href="#"><div><strong>John Smith</strong> <span class="pull-right text-muted"><em>Yesterday</em></span></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div></a></li><li class="divider"></li><li><a class="text-center" href="#"><strong>Read All Messages</strong> <i class="fa fa-angle-right"></i></a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-tasks fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-tasks"><li><a href="#"><div><p><strong>Task 1</strong> <span class="pull-right text-muted">40% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div></div></a></li><li class="divider"></li><li><a href="#"><div><p><strong>Task 2</strong> <span class="pull-right text-muted">20% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% Complete</span></div></div></div></a></li><li class="divider"></li><li><a href="#"><div><p><strong>Task 3</strong> <span class="pull-right text-muted">60% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div></div></a></li><li class="divider"></li><li><a href="#"><div><p><strong>Task 4</strong> <span class="pull-right text-muted">80% Complete</span></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"><span class="sr-only">80% Complete (danger)</span></div></div></div></a></li><li class="divider"></li><li><a class="text-center" href="#"><strong>See All Tasks</strong> <i class="fa fa-angle-right"></i></a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-bell fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-alerts"><li><a href="#"><div><i class="fa fa-comment fa-fw"></i> New Comment <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-twitter fa-fw"></i> 3 New Followers <span class="pull-right text-muted small">12 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-envelope fa-fw"></i> Message Sent <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-tasks fa-fw"></i> New Task <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a href="#"><div><i class="fa fa-upload fa-fw"></i> Server Rebooted <span class="pull-right text-muted small">4 minutes ago</span></div></a></li><li class="divider"></li><li><a class="text-center" href="#"><strong>See All Alerts</strong> <i class="fa fa-angle-right"></i></a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user"><li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a></li><li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a></li><li class="divider"></li><li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li></ul></li></ul><div class="navbar-default sidebar" role="navigation" ng-include="layoutTpl.navigation"></div>'),a.put("templates/sb2/tpl/layout/index.html",'<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0" ng-include="layoutTpl.header"></nav><div id="page-wrapper"><div ui-view="content"></div><footer class=\'footer"\' ng-include="layoutTpl.footer"></footer></div>'),a.put("templates/sb2/tpl/layout/nav.html",'<div class="sidebar-nav navbar-collapse"><ul class="nav" id="side-menu"><li class="sidebar-search"><div class="input-group custom-search-form"><input type="text" class="form-control" placeholder="Search..."> <span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></li><li ng-repeat="nav in modules[\'principal\'] | orderBy: \'position\'" ng-if="nav.ativo" ui-sref-active="active"><a ui-sref="{{nav.menu_state}}"><i class="{{nav.icone}}"></i>{{nav.titulo}}</a><ul ng-if="nav.items.length > 0"><li ng-repeat="sub in nav.items | orderBy: \'position\'" ng-if="sub.ativo" ui-sref-active="active"><a ui-sref="{{sub.menu_state}}"><i class="{{sub.icone}}"></i> <span>{{sub.titulo}}</span></a></li></ul></li></ul></div>')
}]);