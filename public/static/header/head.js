(function (cjs, an) {
    var p // shortcut to reference prototypes
    var lib = {}
    var ss = {}
    var img = {}
    lib.ssMetadata = [
        {name: 'head_atlas_', frames: [[1879, 0, 74, 42], [0, 0, 1785, 76], [1787, 0, 90, 90], [0, 78, 677, 65]]}
    ];
// symbols:
    (lib.图层2拷贝 = function () {
        this.spriteSheet = ss['head_atlas_']
        this.gotoAndStop(0)
    }).prototype = p = new cjs.Sprite();

    (lib.组1 = function () {
        this.spriteSheet = ss['head_atlas_']
        this.gotoAndStop(1)
    }).prototype = p = new cjs.Sprite();

    (lib.组19 = function () {
        this.spriteSheet = ss['head_atlas_']
        this.gotoAndStop(2)
    }).prototype = p = new cjs.Sprite();

    (lib.组20 = function () {
        this.spriteSheet = ss['head_atlas_']
        this.gotoAndStop(3)
    }).prototype = p = new cjs.Sprite();

    (lib.元件5 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})

        // 图层_1
        this.instance = new lib.组1()
        this.instance.parent = this

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(0, 0, 1785, 76);

    (lib.元件4 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})

        // 图层_1
        this.instance = new lib.图层2拷贝()
        this.instance.parent = this

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(0, 0, 74, 42);
    (lib.元件3 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})
    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = null;

    (lib.元件2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})

        // 图层_1
        this.instance = new lib.组20()
        this.instance.parent = this
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(0, 0, 677, 65);

    (lib.元件1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})
        // 图层_1
        this.instance = new lib.组19()
        this.instance.parent = this
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(0, 0, 90, 90);

    (lib.元件6 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})

        // 图层_1
        this.instance = new lib.元件4('synched', 0)
        this.instance.parent = this
        this.instance.setTransform(37, 21, 1, 1, 0, 0, 0, 37, 21)

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(0, 0, 74, 42);

    (lib.元件7 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})

        // 图层_1
        this.instance = new lib.元件6('synched', 0)
        this.instance.parent = this
        this.instance.setTransform(37, 21, 1, 1, 0, 0, 0, 37, 21)

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))

    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(0, 0, 74, 42);

// stage content:
    (lib.head副本 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {})

        // 图层_6
        this.instance = new lib.元件4('synched', 0)
        this.instance.parent = this
        this.instance.setTransform(151.1, 82.5, 1, 1, 0, 0, 0, 37, 21)

        this.instance_1 = new lib.元件6('synched', 0)
        this.instance_1.parent = this
        this.instance_1.setTransform(1856.5, 82.5, 1, 1, 0, 0, 0, 37, 21)
        this.instance_1._off = true

        this.instance_2 = new lib.元件7('synched', 0)
        this.instance_2.parent = this
        this.instance_2.setTransform(1856.5, 82.5, 1, 1, 0, 0, 0, 37, 21)
        this.instance_2.alpha = 0

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance}]}).to({state: [{t: this.instance_1}]}, 255).to({state: [{t: this.instance_2}]}, 64).wait(125))
        this.timeline.addTween(cjs.Tween.get(this.instance).to({_off: true, x: 1856.5}, 255).wait(189))
        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off: false}, 255).to({
            _off: true,
            alpha: 0
        }, 64).wait(125))

        // 图层_1
        this.instance_3 = new lib.元件3('synched', 0)
        this.instance_3.parent = this
        this.instance_3.setTransform(756, 75, 1, 1, 0, 0, 0, 37, 21)

        this.instance_4 = new lib.元件2('synched', 0)
        this.instance_4.parent = this
        this.instance_4.setTransform(286.6, 43.5, 1, 1, 0, 0, 0, 172.5, 32.5)

        this.instance_5 = new lib.元件1('synched', 0)
        this.instance_5.parent = this
        this.instance_5.setTransform(62.1, 47.1, 1, 1, 0, 0, 0, 45, 45)

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.instance_5}, {t: this.instance_4}, {t: this.instance_3}]}).wait(444))

        // 图层_4
        this.instance_6 = new lib.元件5('synched', 0)
        this.instance_6.parent = this
        this.instance_6.setTransform(1001, 47, 1, 1, 0, 0, 0, 892.5, 38)

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(444))

    }).prototype = p = new cjs.MovieClip()
    p.nominalBounds = new cjs.Rectangle(977.1, 54.6, 1876.5, 101.4)
// library properties:
    lib.properties = {
        id: '36DC494053ED8C44BEAC991B63289170',
        width: 1920,
        height: 105,
        fps: 64,
        color: '#669933',
        opacity: 0.00,
        manifest: [
            {src: "../static/images/head_atlas_.png", id: 'head_atlas_'}
        ],
        preloads: []
    };

// bootstrap callback support:

    (lib.Stage = function (canvas) {
        createjs.Stage.call(this, canvas)
    }).prototype = p = new createjs.Stage()

    p.setAutoPlay = function (autoPlay) {
        this.tickEnabled = autoPlay
    }
    p.play = function () {
        this.tickEnabled = true
        this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())
    }
    p.stop = function (ms) {
        if (ms) this.seek(ms)
        this.tickEnabled = false
    }
    p.seek = function (ms) {
        this.tickEnabled = true
        this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000)
    }
    p.getDuration = function () { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000 }

    p.getTimelinePosition = function () { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000 }

    an.bootcompsLoaded = an.bootcompsLoaded || []
    if (!an.bootstrapListeners) {
        an.bootstrapListeners = []
    }

    an.bootstrapCallback = function (fnCallback) {
        an.bootstrapListeners.push(fnCallback)
        if (an.bootcompsLoaded.length > 0) {
            for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i])
            }
        }
    }

    an.compositions = an.compositions || {}
    an.compositions['36DC494053ED8C44BEAC991B63289170'] = {
        getStage: function () { return exportRoot.getStage() },
        getLibrary: function () { return lib },
        getSpriteSheet: function () { return ss },
        getImages: function () { return img }
    }

    an.compositionLoaded = function (id) {
        an.bootcompsLoaded.push(id)
        for (var j = 0; j < an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id)
        }
    }

    an.getComposition = function (id) {
        return an.compositions[id]
    }

})(createjs = createjs || {}, AdobeAn = AdobeAn || {})
var createjs, AdobeAn