define(function(){'use strict';var bootstrapped=false,app_name,orig_app,alt_app,run_injector,config_injector,app_cached_providers={},orig_angular,alt_angular,onDemandLoader={},preBootstrapLoaderQueue=[],alternate_modules={},alternate_modules_tracker={},alternate_queue=[];function checkBootstrapped(){if(!bootstrapped){throw new Error('angularAMD not initialized.  Need to call angularAMD.bootstrap(app) first.');}}function setAlternateAngular(){if(alt_angular){throw new Error('setAlternateAngular can only be called once.');}else{alt_angular={};}checkBootstrapped();orig_angular.extend(alt_angular,orig_angular);alt_angular.module=function(name,requires){if(typeof requires==='undefined'){if(alternate_modules_tracker.hasOwnProperty(name)){return alternate_modules[name];}else{return orig_angular.module(name);}}else{var orig_mod=orig_angular.module.apply(null,arguments),item={name:name,module:orig_mod};alternate_queue.push(item);orig_angular.extend(orig_mod,onDemandLoader);alternate_modules_tracker[name]=true;alternate_modules[name]=orig_mod;return orig_mod;}};window.angular=alt_angular;if(require.defined('angular')){require.undef('angular');define('angular',[],alt_angular);}}function AngularAMD(){}AngularAMD.prototype.route=function(config){var load_controller;if(config.hasOwnProperty('controllerUrl')){load_controller=config.controllerUrl;delete config.controllerUrl;if(typeof config.controller==='undefined'){config.controller=['$scope','__AAMDCtrl','$injector',function($scope,__AAMDCtrl,$injector){if(typeof __AAMDCtrl!=='undefined'){$injector.invoke(__AAMDCtrl,this,{'$scope':$scope});}}];}}else if(typeof config.controller==='string'){load_controller=config.controller;}if(load_controller){var resolve=config.resolve||{};resolve['__AAMDCtrl']=['$q','$rootScope',function($q,$rootScope){var defer=$q.defer();require([load_controller],function(ctrl){defer.resolve(ctrl);$rootScope.$apply();});return defer.promise;}];config.resolve=resolve;}return config;};AngularAMD.prototype.appname=function(){checkBootstrapped();return app_name;};AngularAMD.prototype.processQueue=function(){checkBootstrapped();if(typeof alt_angular==='undefined'){throw new Error('Alternate angular not set.  Make sure that `enable_ngload` option has been set when calling angularAMD.bootstrap');}function processRunBlock(block){run_injector.invoke(block);}for(var i=0;i<alternate_queue.length;i++){var item=alternate_queue[i],invokeQueue=item.module._invokeQueue,y;for(y=0;y<invokeQueue.length;y+=1){var q=invokeQueue[y],provider=q[0],method=q[1],args=q[2];if(app_cached_providers.hasOwnProperty(provider)){var cachedProvider;if(provider==='$injector'&&method==='invoke'){cachedProvider=config_injector;}else{cachedProvider=app_cached_providers[provider];}cachedProvider[method].apply(null,args);}else{if(window.console){window.console.error('"'+provider+'" not found!!!');}}}if(item.module._configBlocks){var configBlocks=item.module._configBlocks;for(y=0;y<configBlocks.length;y+=1){var cf=configBlocks[y],cf_method=cf[1],cf_args=cf[2];config_injector[cf_method].apply(null,cf_args);}}}while(alternate_queue.length){var item=alternate_queue.shift();if(item.module._runBlocks){angular.forEach(item.module._runBlocks,processRunBlock);}}alternate_modules={};};AngularAMD.prototype.getCachedProvider=function(provider_name){checkBootstrapped();var cachedProvider;switch(provider_name){case'__orig_angular':cachedProvider=orig_angular;break;case'__alt_angular':cachedProvider=alt_angular;break;case'__orig_app':cachedProvider=orig_app;break;case'__alt_app':cachedProvider=alt_app;break;default:cachedProvider=app_cached_providers[provider_name];}return cachedProvider;};AngularAMD.prototype.inject=function(){checkBootstrapped();return run_injector.invoke.apply(null,arguments);};AngularAMD.prototype.config=function(){checkBootstrapped();return config_injector.invoke.apply(null,arguments);};AngularAMD.prototype.reset=function(){if(typeof orig_angular==='undefined'){return;}window.angular=orig_angular;if(require.defined('angular')){require.undef('angular');define('angular',[],orig_angular);}orig_app=undefined;alt_app=undefined;alt_angular=undefined;orig_angular=undefined;onDemandLoader={};preBootstrapLoaderQueue=[];alternate_queue=[];app_name=undefined;run_injector=undefined;config_injector=undefined;app_cached_providers={};bootstrapped=false;};AngularAMD.prototype.bootstrap=function(app,enable_ngload,elem){if(bootstrapped){throw Error('bootstrap can only be called once.');}if(typeof enable_ngload==='undefined'){enable_ngload=true;}orig_angular=angular;orig_app=app;alt_app={};orig_angular.extend(alt_app,orig_app);elem=elem||document.documentElement;app.config(['$controllerProvider','$compileProvider','$filterProvider','$animateProvider','$provide','$injector',function(controllerProvider,compileProvider,filterProvider,animateProvider,provide,injector){config_injector=injector;app_cached_providers={$controllerProvider:controllerProvider,$compileProvider:compileProvider,$filterProvider:filterProvider,$animateProvider:animateProvider,$provide:provide};angular.extend(onDemandLoader,{provider:function(name,constructor){provide.provider(name,constructor);return this;},controller:function(name,constructor){controllerProvider.register(name,constructor);return this;},directive:function(name,constructor){compileProvider.directive(name,constructor);return this;},filter:function(name,constructor){filterProvider.register(name,constructor);return this;},factory:function(name,constructor){provide.factory(name,constructor);return this;},service:function(name,constructor){provide.service(name,constructor);return this;},constant:function(name,constructor){provide.constant(name,constructor);return this;},value:function(name,constructor){provide.value(name,constructor);return this;},animation:angular.bind(animateProvider,animateProvider.register)});angular.extend(alt_app,onDemandLoader);}]);app.run(['$injector',function($injector){run_injector=$injector;app_cached_providers.$injector=run_injector;}]);app_name=app.name;if(preBootstrapLoaderQueue.length>0){for(var iq=0;iq<preBootstrapLoaderQueue.length;iq+=1){var item=preBootstrapLoaderQueue[iq];orig_app[item.recipe](item.name,item.constructor);}preBootstrapLoaderQueue=[];}orig_app.register=onDemandLoader;orig_angular.element(document).ready(function(){orig_angular.bootstrap(elem,[app_name]);bootstrapped=true;if(enable_ngload){setAlternateAngular();}});return alt_app;};function executeProvider(providerRecipe){return function(name,constructor){if(bootstrapped){onDemandLoader[providerRecipe](name,constructor);}else{preBootstrapLoaderQueue.push({'recipe':providerRecipe,'name':name,'constructor':constructor});}return this;};}AngularAMD.prototype.provider=executeProvider('provider');AngularAMD.prototype.controller=executeProvider('controller');AngularAMD.prototype.directive=executeProvider('directive');AngularAMD.prototype.filter=executeProvider('filter');AngularAMD.prototype.factory=executeProvider('factory');AngularAMD.prototype.service=executeProvider('service');AngularAMD.prototype.constant=executeProvider('constant');AngularAMD.prototype.value=executeProvider('value');AngularAMD.prototype.animation=executeProvider('animation');return new AngularAMD();});