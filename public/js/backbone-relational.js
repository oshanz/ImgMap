(function(l,d){"function"===typeof define&&define.amd?define(["exports","backbone","underscore"],d):"undefined"!==typeof exports?d(exports,require("backbone"),require("underscore")):d(l,l.Backbone,l._)})(this,function(l,d,e){d.Relational={showWarnings:!0};d.Semaphore={_permitsAvailable:null,_permitsUsed:0,acquire:function(){if(this._permitsAvailable&&this._permitsUsed>=this._permitsAvailable)throw Error("Max permits acquired");this._permitsUsed++},release:function(){if(0===this._permitsUsed)throw Error("All permits released");
this._permitsUsed--},isLocked:function(){return 0<this._permitsUsed},setAvailablePermits:function(a){if(this._permitsUsed>a)throw Error("Available permits cannot be less than used permits");this._permitsAvailable=a}};d.BlockingQueue=function(){this._queue=[]};e.extend(d.BlockingQueue.prototype,d.Semaphore,{_queue:null,add:function(a){this.isBlocked()?this._queue.push(a):a()},process:function(){var a=this._queue;for(this._queue=[];a&&a.length;)a.shift()()},block:function(){this.acquire()},unblock:function(){this.release();
this.isBlocked()||this.process()},isBlocked:function(){return this.isLocked()}});d.Relational.eventQueue=new d.BlockingQueue;d.Store=function(){this._collections=[];this._reverseRelations=[];this._orphanRelations=[];this._subModels=[];this._modelScopes=[l]};e.extend(d.Store.prototype,d.Events,{initializeRelation:function(a,b,c){var f=e.isString(b.type)?d[b.type]||this.getObjectByName(b.type):b.type;f&&f.prototype instanceof d.Relation?new f(a,b,c):d.Relational.showWarnings&&"undefined"!==typeof console&&
console.warn("Relation=%o; missing or invalid relation type!",b)},addModelScope:function(a){this._modelScopes.push(a)},removeModelScope:function(a){this._modelScopes=e.without(this._modelScopes,a)},addSubModels:function(a,b){this._subModels.push({superModelType:b,subModels:a})},setupSuperModel:function(a){e.find(this._subModels,function(b){return e.filter(b.subModels||[],function(c,d){var e=this.getObjectByName(c);if(a===e)return b.superModelType._subModels[d]=a,a._superModel=b.superModelType,a._subModelTypeValue=
d,a._subModelTypeAttribute=b.superModelType.prototype.subModelTypeAttribute,!0},this).length},this)},addReverseRelation:function(a){!e.any(this._reverseRelations,function(b){return e.all(a||[],function(a,d){return a===b[d]})})&&a.model&&a.type&&(this._reverseRelations.push(a),this._addRelation(a.model,a),this.retroFitRelation(a))},addOrphanRelation:function(a){!e.any(this._orphanRelations,function(b){return e.all(a||[],function(a,d){return a===b[d]})})&&a.model&&a.type&&this._orphanRelations.push(a)},
processOrphanRelations:function(){e.each(this._orphanRelations.slice(0),function(a){d.Relational.store.getObjectByName(a.relatedModel)&&(this.initializeRelation(null,a),this._orphanRelations=e.without(this._orphanRelations,a))},this)},_addRelation:function(a,b){a.prototype.relations||(a.prototype.relations=[]);a.prototype.relations.push(b);e.each(a._subModels||[],function(a){this._addRelation(a,b)},this)},retroFitRelation:function(a){var b=this.getCollection(a.model,!1);b&&b.each(function(b){b instanceof
a.model&&new a.type(b,a)},this)},getCollection:function(a,b){a instanceof d.RelationalModel&&(a=a.constructor);for(var c=a;c._superModel;)c=c._superModel;var f=e.find(this._collections,function(a){return a.model===c});f||!1===b||(f=this._createCollection(c));return f},getObjectByName:function(a){var b=a.split("."),c=null;e.find(this._modelScopes,function(a){if((c=e.reduce(b||[],function(a,b){return a?a[b]:void 0},a))&&c!==a)return!0},this);return c},_createCollection:function(a){var b;a instanceof
d.RelationalModel&&(a=a.constructor);a.prototype instanceof d.RelationalModel&&(b=new d.Collection,b.model=a,this._collections.push(b));return b},resolveIdForItem:function(a,b){var c=e.isString(b)||e.isNumber(b)?b:null;null===c&&(b instanceof d.RelationalModel?c=b.id:e.isObject(b)&&(c=b[a.prototype.idAttribute]));c||0===c||(c=null);return c},find:function(a,b){var c=this.resolveIdForItem(a,b),d=this.getCollection(a);return d&&(c=d.get(c),c instanceof a)?c:null},register:function(a){var b=this.getCollection(a);
if(b){var c=a.collection;b.add(a);a.collection=c}},checkId:function(a,b){var c=this.getCollection(a);if((c=c&&c.get(b))&&a!==c)throw d.Relational.showWarnings&&"undefined"!==typeof console&&console.warn("Duplicate id! Old RelationalModel=%o, new RelationalModel=%o",c,a),Error("Cannot instantiate more than one Backbone.RelationalModel with the same id per type!");},update:function(a){var b=this.getCollection(a);b.contains(a)||this.register(a);b._onModelEvent("change:"+a.idAttribute,a,b);a.trigger("relational:change:id",
a,b)},unregister:function(a){var b,c;a instanceof d.Model?(b=this.getCollection(a),c=[a]):a instanceof d.Collection?(b=this.getCollection(a.model),c=e.clone(a.models)):(b=this.getCollection(a),c=e.clone(b.models));e.each(c,function(a){this.stopListening(a);e.invoke(a.getRelations(),"stopListening")},this);e.contains(this._collections,a)?b.reset([]):e.each(c,function(a){b.get(a)?b.remove(a):b.trigger("relational:remove",a,b)},this)},reset:function(){this.stopListening();e.each(this._collections,function(a){this.unregister(a)},
this);this._collections=[];this._subModels=[];this._modelScopes=[l]}});d.Relational.store=new d.Store;d.Relation=function(a,b,c){this.instance=a;b=e.isObject(b)?b:{};this.reverseRelation=e.defaults(b.reverseRelation||{},this.options.reverseRelation);this.options=e.defaults(b,this.options,d.Relation.prototype.options);this.reverseRelation.type=e.isString(this.reverseRelation.type)?d[this.reverseRelation.type]||d.Relational.store.getObjectByName(this.reverseRelation.type):this.reverseRelation.type;
this.key=this.options.key;this.keySource=this.options.keySource||this.key;this.keyDestination=this.options.keyDestination||this.keySource||this.key;this.model=this.options.model||this.instance.constructor;this.relatedModel=this.options.relatedModel;e.isUndefined(this.relatedModel)&&(this.relatedModel=this.model);!e.isFunction(this.relatedModel)||this.relatedModel.prototype instanceof d.RelationalModel||(this.relatedModel=e.result(this,"relatedModel"));e.isString(this.relatedModel)&&(this.relatedModel=
d.Relational.store.getObjectByName(this.relatedModel));this.checkPreconditions()&&(!this.options.isAutoRelation&&this.reverseRelation.type&&this.reverseRelation.key&&d.Relational.store.addReverseRelation(e.defaults({isAutoRelation:!0,model:this.relatedModel,relatedModel:this.model,reverseRelation:this.options},this.reverseRelation)),a&&(a=this.keySource,a!==this.key&&e.isObject(this.instance.get(this.key))&&(a=this.key),this.setKeyContents(this.instance.get(a)),this.relatedCollection=d.Relational.store.getCollection(this.relatedModel),
this.keySource!==this.key&&delete this.instance.attributes[this.keySource],this.instance._relations[this.key]=this,this.initialize(c),this.options.autoFetch&&this.instance.getAsync(this.key,e.isObject(this.options.autoFetch)?this.options.autoFetch:{}),this.listenTo(this.instance,"destroy",this.destroy).listenTo(this.relatedCollection,"relational:add relational:change:id",this.tryAddRelated).listenTo(this.relatedCollection,"relational:remove",this.removeRelated)))};d.Relation.extend=d.Model.extend;
e.extend(d.Relation.prototype,d.Events,d.Semaphore,{options:{createModels:!0,includeInJSON:!0,isAutoRelation:!1,autoFetch:!1,parse:!1},instance:null,key:null,keyContents:null,relatedModel:null,relatedCollection:null,reverseRelation:null,related:null,checkPreconditions:function(){var a=this.instance,b=this.key,c=this.model,f=this.relatedModel,g=d.Relational.showWarnings&&"undefined"!==typeof console;return c&&b&&f?c.prototype instanceof d.RelationalModel?f.prototype instanceof d.RelationalModel?this instanceof
d.HasMany&&this.reverseRelation.type===d.HasMany?(g&&console.warn("Relation=%o: relation is a HasMany, and the reverseRelation is HasMany as well.",this),!1):a&&e.keys(a._relations).length&&(c=e.find(a._relations,function(a){return a.key===b},this))?(g&&console.warn("Cannot create relation=%o on %o for model=%o: already taken by relation=%o.",this,b,a,c),!1):!0:(g&&console.warn("Relation=%o: relatedModel does not inherit from Backbone.RelationalModel (%o).",this,f),!1):(g&&console.warn("Relation=%o: model does not inherit from Backbone.RelationalModel (%o).",
this,a),!1):(g&&console.warn("Relation=%o: missing model, key or relatedModel (%o, %o, %o).",this,c,b,f),!1)},setRelated:function(a){this.related=a;this.instance.attributes[this.key]=a},_isReverseRelation:function(a){return a.instance instanceof this.relatedModel&&this.reverseRelation.key===a.key&&this.key===a.reverseRelation.key},getReverseRelations:function(a){var b=[];a=e.isUndefined(a)?this.related&&(this.related.models||[this.related]):[a];for(var c=null,d=null,g=0;g<(a||[]).length;g++)for(var c=
a[g].getRelations()||[],h=0;h<c.length;h++)d=c[h],this._isReverseRelation(d)&&b.push(d);return b},destroy:function(){this.stopListening();this instanceof d.HasOne?this.setRelated(null):this instanceof d.HasMany&&this.setRelated(this._prepareCollection());e.each(this.getReverseRelations(),function(a){a.removeRelated(this.instance)},this)}});d.HasOne=d.Relation.extend({options:{reverseRelation:{type:"HasMany"}},initialize:function(a){this.listenTo(this.instance,"relational:change:"+this.key,this.onChange);
var b=this.findRelated(a);this.setRelated(b);e.each(this.getReverseRelations(),function(b){b.addRelated(this.instance,a)},this)},findRelated:function(a){var b=null;a=e.defaults({parse:this.options.parse},a);if(this.keyContents instanceof this.relatedModel)b=this.keyContents;else if(this.keyContents||0===this.keyContents)a=e.defaults({create:this.options.createModels},a),b=this.relatedModel.findOrCreate(this.keyContents,a);b&&(this.keyId=null);return b},setKeyContents:function(a){this.keyContents=
a;this.keyId=d.Relational.store.resolveIdForItem(this.relatedModel,this.keyContents)},onChange:function(a,b,c){if(!this.isLocked()){this.acquire();c=c?e.clone(c):{};var f=e.isUndefined(c.__related);a=f?this.related:c.__related;f&&(this.setKeyContents(b),b=this.findRelated(c),this.setRelated(b));a&&this.related!==a&&e.each(this.getReverseRelations(a),function(a){a.removeRelated(this.instance,null,c)},this);e.each(this.getReverseRelations(),function(a){a.addRelated(this.instance,c)},this);if(!c.silent&&
this.related!==a){var g=this;this.changed=!0;d.Relational.eventQueue.add(function(){g.instance.trigger("change:"+g.key,g.instance,g.related,c,!0);g.changed=!1})}this.release()}},tryAddRelated:function(a,b,c){!this.keyId&&0!==this.keyId||a.id!==this.keyId||(this.addRelated(a,c),this.keyId=null)},addRelated:function(a,b){var c=this;a.queue(function(){if(a!==c.related){var d=c.related||null;c.setRelated(a);c.onChange(c.instance,a,e.defaults({__related:d},b))}})},removeRelated:function(a,b,c){this.related&&
a===this.related&&(b=this.related||null,this.setRelated(null),this.onChange(this.instance,a,e.defaults({__related:b},c)))}});d.HasMany=d.Relation.extend({collectionType:null,options:{reverseRelation:{type:"HasOne"},collectionType:d.Collection,collectionKey:!0,collectionOptions:{}},initialize:function(a){this.listenTo(this.instance,"relational:change:"+this.key,this.onChange);this.collectionType=this.options.collectionType;!e.isFunction(this.collectionType)||this.collectionType===d.Collection||this.collectionType.prototype instanceof
d.Collection||(this.collectionType=e.result(this,"collectionType"));e.isString(this.collectionType)&&(this.collectionType=d.Relational.store.getObjectByName(this.collectionType));if(this.collectionType!==d.Collection&&!(this.collectionType.prototype instanceof d.Collection))throw Error("`collectionType` must inherit from Backbone.Collection");a=this.findRelated(a);this.setRelated(a)},_prepareCollection:function(a){this.related&&this.stopListening(this.related);a&&a instanceof d.Collection||(a=e.isFunction(this.options.collectionOptions)?
this.options.collectionOptions(this.instance):this.options.collectionOptions,a=new this.collectionType(null,a));a.model=this.relatedModel;if(this.options.collectionKey){var b=!0===this.options.collectionKey?this.options.reverseRelation.key:this.options.collectionKey;a[b]&&a[b]!==this.instance?d.Relational.showWarnings&&"undefined"!==typeof console&&console.warn("Relation=%o; collectionKey=%s already exists on collection=%o",this,b,this.options.collectionKey):b&&(a[b]=this.instance)}this.listenTo(a,
"relational:add",this.handleAddition).listenTo(a,"relational:remove",this.handleRemoval).listenTo(a,"relational:reset",this.handleReset);return a},findRelated:function(a){var b=null;a=e.defaults({parse:this.options.parse},a);if(this.keyContents instanceof d.Collection)this._prepareCollection(this.keyContents),b=this.keyContents;else{var c=[];e.each(this.keyContents,function(b){var d=null;(d=b instanceof this.relatedModel?b:this.relatedModel.findOrCreate(b,e.extend({merge:!0},a,{create:this.options.createModels})))&&
c.push(d)},this);b=this.related instanceof d.Collection?this.related:this._prepareCollection();b.set(c,e.defaults({merge:!1,parse:!1},a))}this.keyIds=e.difference(this.keyIds,e.pluck(b.models,"id"));return b},setKeyContents:function(a){this.keyContents=a instanceof d.Collection?a:null;this.keyIds=[];this.keyContents||!a&&0!==a||(this.keyContents=e.isArray(a)?a:[a],e.each(this.keyContents,function(a){((a=d.Relational.store.resolveIdForItem(this.relatedModel,a))||0===a)&&this.keyIds.push(a)},this))},
onChange:function(a,b,c){c=c?e.clone(c):{};this.setKeyContents(b);this.changed=!1;a=this.findRelated(c);this.setRelated(a);if(!c.silent){var f=this;d.Relational.eventQueue.add(function(){f.changed&&(f.instance.trigger("change:"+f.key,f.instance,f.related,c,!0),f.changed=!1)})}},handleAddition:function(a,b,c){c=c?e.clone(c):{};this.changed=!0;e.each(this.getReverseRelations(a),function(a){a.addRelated(this.instance,c)},this);var f=this;!c.silent&&d.Relational.eventQueue.add(function(){f.instance.trigger("add:"+
f.key,a,f.related,c)})},handleRemoval:function(a,b,c){c=c?e.clone(c):{};this.changed=!0;e.each(this.getReverseRelations(a),function(a){a.removeRelated(this.instance,null,c)},this);var f=this;!c.silent&&d.Relational.eventQueue.add(function(){f.instance.trigger("remove:"+f.key,a,f.related,c)})},handleReset:function(a,b){var c=this;b=b?e.clone(b):{};!b.silent&&d.Relational.eventQueue.add(function(){c.instance.trigger("reset:"+c.key,c.related,b)})},tryAddRelated:function(a,b,c){e.contains(this.keyIds,
a.id)&&(this.addRelated(a,c),this.keyIds=e.without(this.keyIds,a.id))},addRelated:function(a,b){var c=this;a.queue(function(){c.related&&!c.related.get(a)&&c.related.add(a,e.defaults({parse:!1},b))})},removeRelated:function(a,b,c){this.related.get(a)&&this.related.remove(a,c)}});d.RelationalModel=d.Model.extend({relations:null,_relations:null,_isInitialized:!1,_deferProcessing:!1,_queue:null,_attributeChangeFired:!1,subModelTypeAttribute:"type",subModelTypes:null,constructor:function(a,b){if(b&&b.collection){var c=
this,f=this.collection=b.collection;delete b.collection;this._deferProcessing=!0;var g=function(a){a===c&&(c._deferProcessing=!1,c.processQueue(),f.off("relational:add",g))};f.on("relational:add",g);e.defer(function(){g(c)})}d.Relational.store.processOrphanRelations();d.Relational.store.listenTo(this,"relational:unregister",d.Relational.store.unregister);this._queue=new d.BlockingQueue;this._queue.block();d.Relational.eventQueue.block();try{d.Model.apply(this,arguments)}finally{d.Relational.eventQueue.unblock()}},
trigger:function(a){if(5<a.length&&0===a.indexOf("change")){var b=this,c=arguments;d.Relational.eventQueue.isLocked()?d.Relational.eventQueue.add(function(){var e=!0;if("change"===a)e=b.hasChanged()||b._attributeChangeFired,b._attributeChangeFired=!1;else{var g=a.slice(7),h=b.getRelation(g);h?(e=!0===c[4])?b.changed[g]=c[2]:h.changed||delete b.changed[g]:e&&(b._attributeChangeFired=!0)}e&&d.Model.prototype.trigger.apply(b,c)}):d.Model.prototype.trigger.apply(b,c)}else"destroy"===a?(d.Model.prototype.trigger.apply(this,
arguments),d.Relational.store.unregister(this)):d.Model.prototype.trigger.apply(this,arguments);return this},initializeRelations:function(a){this.acquire();this._relations={};e.each(this.relations||[],function(b){d.Relational.store.initializeRelation(this,b,a)},this);this._isInitialized=!0;this.release();this.processQueue()},updateRelations:function(a,b){this._isInitialized&&!this.isLocked()&&e.each(this._relations,function(c){if(!a||c.keySource in a||c.key in a){var d=this.attributes[c.keySource]||
this.attributes[c.key],e=a&&(a[c.keySource]||a[c.key]);(c.related!==d||null===d&&null===e)&&this.trigger("relational:change:"+c.key,this,d,b||{})}c.keySource!==c.key&&delete this.attributes[c.keySource]},this)},queue:function(a){this._queue.add(a)},processQueue:function(){this._isInitialized&&!this._deferProcessing&&this._queue.isBlocked()&&this._queue.unblock()},getRelation:function(a){return this._relations[a]},getRelations:function(){return e.values(this._relations)},getIdsToFetch:function(a,b){var c=
a instanceof d.Relation?a:this.getRelation(a),f=c?c.keyIds&&c.keyIds.slice(0)||(c.keyId||0===c.keyId?[c.keyId]:[]):[];b&&e.each(c.related&&(c.related.models||[c.related]),function(a){(a.id||0===a.id)&&f.push(a.id)});return f},getAsync:function(a,b){b=e.extend({add:!0,remove:!1,refresh:!1},b);var c=this,f=[],g=this.getRelation(a),h=g&&this.getIdsToFetch(g,b.refresh),k=g.related instanceof d.Collection?g.related:g.relatedCollection;if(h&&h.length){var n=[],l=[],m,f=function(){n=e.map(h,function(a){var c=
g.relatedModel.findModel(a);c||(c={},c[g.relatedModel.prototype.idAttribute]=a,c=g.relatedModel.findOrCreate(c,b),l.push(c));return c},this)};if(k instanceof d.Collection&&e.isFunction(k.url)){var p=k.url();m=k.url(h);m===p&&(f(),m=k.url(n),m===p&&(m=null))}m?(m=e.defaults({error:function(){e.each(l,function(a){a.trigger("destroy",a,a.collection,b)});b.error&&b.error.apply(n,arguments)},url:m},b),f=[k.fetch(m)]):(n.length||f(),f=e.map(n,function(a){var c=e.defaults({error:function(){e.contains(l,
a)&&a.trigger("destroy",a,a.collection,b);b.error&&b.error.apply(n,arguments)}},b);return a.fetch(c)},this))}return $.when.apply(null,f).then(function(){return d.Model.prototype.get.call(c,a)})},set:function(a,b,c){d.Relational.eventQueue.block();var f,g;e.isObject(a)||null==a?(f=a,c=b):(f={},f[a]=b);try{var h=this.id,k=f&&this.idAttribute in f&&f[this.idAttribute];d.Relational.store.checkId(this,k);g=d.Model.prototype.set.apply(this,arguments);this._isInitialized||this.isLocked()?k&&k!==h&&d.Relational.store.update(this):
(this.constructor.initializeModelHierarchy(),(k||0===k)&&d.Relational.store.register(this),this.initializeRelations(c));f&&this.updateRelations(f,c)}finally{d.Relational.eventQueue.unblock()}return g},clone:function(){var a=e.clone(this.attributes);e.isUndefined(a[this.idAttribute])||(a[this.idAttribute]=null);e.each(this.getRelations(),function(b){delete a[b.key]});return new this.constructor(a)},toJSON:function(a){if(this.isLocked())return this.id;this.acquire();var b=d.Model.prototype.toJSON.call(this,
a);!this.constructor._superModel||this.constructor._subModelTypeAttribute in b||(b[this.constructor._subModelTypeAttribute]=this.constructor._subModelTypeValue);e.each(this._relations,function(c){var f=b[c.key],g=c.options.includeInJSON,h=null;!0===g?f&&e.isFunction(f.toJSON)&&(h=f.toJSON(a)):e.isString(g)?(f instanceof d.Collection?h=f.pluck(g):f instanceof d.Model&&(h=f.get(g)),g===c.relatedModel.prototype.idAttribute&&(c instanceof d.HasMany?h=h.concat(c.keyIds):c instanceof d.HasOne&&((h=h||c.keyId)||
e.isObject(c.keyContents)||(h=c.keyContents||null)))):e.isArray(g)?f instanceof d.Collection?(h=[],f.each(function(a){var b={};e.each(g,function(c){b[c]=a.get(c)});h.push(b)})):f instanceof d.Model&&(h={},e.each(g,function(a){h[a]=f.get(a)})):delete b[c.key];null===h&&a&&a.wait&&(h=f);g&&(b[c.keyDestination]=h);c.keyDestination!==c.key&&delete b[c.key]});this.release();return b}},{setup:function(a){this.prototype.relations=(this.prototype.relations||[]).slice(0);this._subModels={};this._superModel=
null;this.prototype.hasOwnProperty("subModelTypes")?d.Relational.store.addSubModels(this.prototype.subModelTypes,this):this.prototype.subModelTypes=null;e.each(this.prototype.relations||[],function(a){a.model||(a.model=this);if(a.reverseRelation&&a.model===this){var c=!0;e.isString(a.relatedModel)&&(c=(c=d.Relational.store.getObjectByName(a.relatedModel))&&c.prototype instanceof d.RelationalModel);c?d.Relational.store.initializeRelation(null,a):e.isString(a.relatedModel)&&d.Relational.store.addOrphanRelation(a)}},
this);return this},build:function(a,b){this.initializeModelHierarchy();return new (this._findSubModelType(this,a)||this)(a,b)},_findSubModelType:function(a,b){if(a._subModels&&a.prototype.subModelTypeAttribute in b){var c=b[a.prototype.subModelTypeAttribute],d=a._subModels[c];if(d)return d;for(c in a._subModels)if(d=this._findSubModelType(a._subModels[c],b))return d}return null},initializeModelHierarchy:function(){this.inheritRelations();if(this.prototype.subModelTypes){var a=e.keys(this._subModels),
a=e.omit(this.prototype.subModelTypes,a);e.each(a,function(a){(a=d.Relational.store.getObjectByName(a))&&a.initializeModelHierarchy()})}},inheritRelations:function(){if(e.isUndefined(this._superModel)||e.isNull(this._superModel))if(d.Relational.store.setupSuperModel(this),this._superModel){if(this._superModel.inheritRelations(),this._superModel.prototype.relations){var a=e.filter(this._superModel.prototype.relations||[],function(a){return!e.any(this.prototype.relations||[],function(c){return a.relatedModel===
c.relatedModel&&a.key===c.key},this)},this);this.prototype.relations=a.concat(this.prototype.relations)}}else this._superModel=!1},findOrCreate:function(a,b){b||(b={});var c=e.isObject(a)&&b.parse&&this.prototype.parse?this.prototype.parse(e.clone(a)):a,d=this.findModel(c);e.isObject(a)&&(d&&!1!==b.merge?(delete b.collection,delete b.url,d.set(c,b)):d||!1===b.create||(d=this.build(c,e.defaults({parse:!1},b))));return d},find:function(a,b){b||(b={});b.create=!1;return this.findOrCreate(a,b)},findModel:function(a){return d.Relational.store.find(this,
a)}});e.extend(d.RelationalModel.prototype,d.Semaphore);d.Collection.prototype.__prepareModel=d.Collection.prototype._prepareModel;d.Collection.prototype._prepareModel=function(a,b){var c;a instanceof d.Model?(a.collection||(a.collection=this),c=a):(b=b?e.clone(b):{},b.collection=this,(c="undefined"!==typeof this.model.findOrCreate?this.model.findOrCreate(a,b):new this.model(a,b))&&c.validationError&&(this.trigger("invalid",this,a,b),c=!1));return c};var q=d.Collection.prototype.__set=d.Collection.prototype.set;
d.Collection.prototype.set=function(a,b){if(!(this.model.prototype instanceof d.RelationalModel))return q.call(this,a,b);b&&b.parse&&(a=this.parse(a,b));var c=!e.isArray(a),f=[],g=[],h=null;a=c?a?[a]:[]:e.clone(a);for(var k=0;k<a.length;k++)h=a[k],h instanceof d.Model||(h=d.Collection.prototype._prepareModel.call(this,h,b)),h&&(g.push(h),this.get(h)||this.get(h.cid)?null!==h.id&&void 0!==h.id&&(this._byId[h.id]=h):f.push(h));g=c?g.length?g[0]:null:g;c=q.call(this,g,e.defaults({merge:!1,parse:!1},
b));for(k=0;k<f.length;k++)h=f[k],(this.get(h)||this.get(h.cid))&&this.trigger("relational:add",h,this,b);return c};var r=d.Collection.prototype.__remove=d.Collection.prototype.remove;d.Collection.prototype.remove=function(a,b){if(!(this.model.prototype instanceof d.RelationalModel))return r.call(this,a,b);var c=!e.isArray(a),f=[];a=c?a?[a]:[]:e.clone(a);b||(b={});e.each(a,function(a){(a=this.get(a)||a&&this.get(a.cid))&&f.push(a)},this);c=r.call(this,c?f.length?f[0]:null:f,b);e.each(f,function(a){this.trigger("relational:remove",
a,this,b)},this);return c};var t=d.Collection.prototype.__reset=d.Collection.prototype.reset;d.Collection.prototype.reset=function(a,b){b=e.extend({merge:!0},b);var c=t.call(this,a,b);this.model.prototype instanceof d.RelationalModel&&this.trigger("relational:reset",this,b);return c};var u=d.Collection.prototype.__sort=d.Collection.prototype.sort;d.Collection.prototype.sort=function(a){var b=u.call(this,a);this.model.prototype instanceof d.RelationalModel&&this.trigger("relational:reset",this,a);
return b};var p=d.Collection.prototype.__trigger=d.Collection.prototype.trigger;d.Collection.prototype.trigger=function(a){if(!(this.model.prototype instanceof d.RelationalModel))return p.apply(this,arguments);if("add"===a||"remove"===a||"reset"===a||"sort"===a){var b=this,c=arguments;e.isObject(c[3])&&(c=e.toArray(c),c[3]=e.clone(c[3]));d.Relational.eventQueue.add(function(){p.apply(b,c)})}else p.apply(this,arguments);return this};d.RelationalModel.extend=function(a,b){var c=d.Model.extend.call(this,
a,b);c.setup(this);return c}});