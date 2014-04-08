/**
 * @author ssw
 */
window.onload = function() {
    var _doc = document;
    var _body = _doc.body;
    var _dkViewContainer;
    var _dkContainerWidth;
    var _dkContainerHeight;
    var _compContainer;
    var _compX = 20;
    var _compY = 20;
    var _compWidth = 250;
    var _gap = 80;
    var _dkView;
    var _setTotal;
    var _total = -1;

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // 유틸
    var Util = {
        css : function( $obj ) {
            for ( var key in $obj ) {
                this.style[ key ] = $obj[ key ];
            }
        },

        html : function( $html ) {
            if ( $html == undefined ) {
                return this.element.innerHTML;
            } else {
                return this.element.innerHTML = $html;
            }
        },

        textObj : function( $obj ) {
            var str = "";
            for ( var key in $obj ) {
                str += "<br> " + key + " : " + $obj[ key ];
            }
            return str;
        },

        /**
         * 윈도우 내부 가로값을 가져온다
         * @returns {number}
         */
        getWindowWidth : function() {
            if ( window.innerWidth ) {
                return window.innerWidth;
            } else {
                return document.documentElement.clientWidth;
            }
        },

        /**
         * 윈도우 내부 세로값을 가져온다
         * @returns {number}
         */
        getWindowHeight : function() {
            if ( window.innerHeight ) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // Comp
    var Comp = function() {
        var element = _doc.createElement( "div" );
        this.element = element;
        this.style = element.style;

        this.css( {
            position : "relative",
            display : "block",
            margin : "0px 0px 10px 0px",
            padding : "20px",
            backgroundColor : "#000",
            color : "#FFFFFF",
            fontFamily : "돋움, sans-serif",
            fontSize : "12px",
            lineHeight : "20px"
        } );
    };

    Comp.prototype = {
        css : Util.css,
        html : Util.html
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // Button
    var Button = function() {
        var element = _doc.createElement( "input" );
        element.type = "button";
        this.element = element;
        this.style = element.style;

        this.css( {
            position : "relative",
            display : "inline",
            margin : "2px",
            height : "20px",
            fontFamily : "돋움, sans-serif",
            fontSize : "12px",
            cursor : "pointer"
        } );
    };

    Button.prototype = {
        css : Util.css,

        value : function( $value ) {
            if ( $value == undefined ) {
                return this.element.value;
            } else {
                this.element.value = $value;
            }
        },

        disabled : function( $bool ) {
            if ( $bool == undefined ) {
                return this.element.disabled;
            } else {
                this.element.disabled = $bool;
            }
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // 초기화
    init();

    /**
     * 초기화
     */
    function init() {
        initContainer();
        initView();
        initTotal();

        initInformation();
        initDetector();
        initLoop();
        initTween();
        initModel();
        initDisplayContainer();
        initSpriteSheet();
        initAddListener();
        initHierarchy();
        initMouseTouch();
        initWheelManager();
        initKeyboardManager();
        initXmlLoader();
        initAssetLoader();
        initJsLoader();
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * 컨테이너
     */
    function initContainer() {
        // View 컨테이너
        _dkViewContainer = new Comp();
        _body.appendChild( _dkViewContainer.element );
        _dkViewContainer.css( {
            position : "absolute",
            left : _compX + _compWidth + _gap + "px",
            top : _compY + "px",
            margin : "0px",
            padding : "0px"
        } );

        // Comp 컨테이너
        _compContainer = new Comp();
        _body.appendChild( _compContainer.element );
        _compContainer.css( {
            position : "absolute",
            left : _compX + "px",
            top : _compY + "px",
            backgroundColor : "",
            margin : "0px",
            padding : "0px",
            overflow : "auto",
            width : _compWidth + 65 + "px",
            height : DkUtil.getWindowHeight() - 50 + "px"
        } );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * view 생성
     */
    function initView() {
        _dkContainerWidth = Util.getWindowWidth() - 500;
        _dkContainerHeight = Util.getWindowHeight() - 50;

        _dkView = new DkView();
        _dkView.set( "width", _dkContainerWidth );
        _dkView.set( "height", _dkContainerHeight );
        _dkView.set( "backgroundColor", "#000" );
        _dkView.start( "Dom" );

        _dkViewContainer.element.appendChild( _dkView.___element );

        DkManagerResize.add( "viewResize", viewResize );

        function viewResize( $e, $key ) {
            _dkContainerWidth = Util.getWindowWidth() - 500;
            _dkContainerHeight = Util.getWindowHeight() - 50;
            _dkView.set( "width", _dkContainerWidth );
            _dkView.set( "height", _dkContainerHeight );

            _compContainer.css( {
                height : _dkContainerHeight + "px"
            } );
            trace( $e, $key )
        }

        DkUtil.disableContextMenu();
        // DkUtil.disableDrag();
        DkUtil.disableSelect( _dkView );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * total, numChildren
     */
    function initTotal() {
        var title = new Comp();
        _dkView.___element.appendChild( title.element );
        title.css( {
            position : "absolute",
            top : "0px",
            left : "90px",
            margin : "0px",
            padding : "0px",
            width : "100px",
            zIndex : 1
        } );

        _setTotal = function() {
            _total++;
            var str = "total : " + _total + " / numchildren : " + _dkView.numChildren();
            title.html( str );
        };
        _setTotal();
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * information
     */
    function initInformation() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Information</b><br>";
        str += Util.textObj( Dk.information );
        comp.html( str );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * detector
     */
    function initDetector() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Detector</b><br>";
        str += Util.textObj( DkDetector );
        comp.html( str );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * loop
     */
    function initLoop() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Loop</b><br><br>";
        comp.html( str );

        var bt0 = new Button();
        comp.element.appendChild( bt0.element );
        bt0.value( "loop start" );
        bt0.element.onclick = function() {
            DkManagerLoop.add( "loop", loop );
        };
        var bt1 = new Button();
        comp.element.appendChild( bt1.element );
        bt1.value( "loop stop" );
        bt1.element.onclick = function() {
            DkManagerLoop.del( "loop" );
        };

        var angleX = 0;
        var angleY = 0;
        var centerX = _dkContainerWidth / 2 - 50;
        var centerY = _dkContainerHeight / 2 - 50;
        var rangeX = 2;
        var rangeY = 1;
        var xspeed = .03;
        var yspeed = .03;
        var mathSin = Math.sin;
        var mathCos = Math.cos;

        function loop( $key ) {
            // trace( $key );
            var list = _dkView.children;
            var i = list.length;
            while ( i-- ) {
                var box = list[ i ];
                var x = centerX + mathSin( angleX + i / 10 ) * rangeX * i;
                var y = centerY + mathCos( angleY + i / 10 ) * rangeY * i;
                box.set( "x", x );
                box.set( "y", y );
                box.set( "rotateX", box.get( "rotateX" ) + 1 );
            }
            angleX += xspeed;
            angleY += yspeed;
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * tween
     */
    function initTween() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Tween</b><br><br>";
        comp.html( str );

        var bt0 = new Button();
        comp.element.appendChild( bt0.element );
        bt0.value( "tween start1" );
        bt0.element.onclick = function() {
            tween();
        };

        var bt1 = new Button();
        comp.element.appendChild( bt1.element );
        bt1.value( "tween start2" );
        bt1.element.onclick = function() {
            tween2();
        };

        function tween() {
            var list = _dkView.children;
            var i = list.length;
            while ( i-- ) {
                var box = list[ i ];
                repeat( box );
            }
        }

        function repeat( $box ) {
            var radius = _dkContainerWidth / 2 + 200;
            var duration = 0.5;
            $box.set( "x", _dkContainerWidth / 2 );
            $box.set( "y", _dkContainerHeight / 2 );
            $box.set( "scaleX", 0 );
            $box.set( "scaleY", 0 );
            var angle = Math.random() * Math.PI * 2;
            var x = Math.cos( angle ) * radius + _dkContainerWidth / 2;
            var y = Math.sin( angle ) * radius + _dkContainerHeight / 2;
            DkTween.to( $box, duration, { x : x, y : y, scaleX : 1, scaleY : 1 }, DkCubic.easeOut, { delay : Math.random() * duration * 2, onComplete : repeat, onCompleteParams : $box } );
        }

        function tween2() {
            var list = _dkView.children;
            var i = list.length;
            while ( i-- ) {
                var box = list[ i ];
                var x = DkUtil.random( _dkContainerWidth );
                var y = DkUtil.random( _dkContainerHeight );
                DkTween.killTweenOf( box );
                DkTween.to( box, 2, { x : x, y : y, scaleX : 1, scaleY : 1 }, DkQuint.easeOut );
            }
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * model
     * sprite, text, bitmap, video, audio 생성
     */
    function initModel() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Sprite / Text / Bitmap / Video / Audio</b><br><br>";
        comp.html( str );

        var bt0 = new Button();
        comp.element.appendChild( bt0.element );
        bt0.value( "add sprite" );
        bt0.element.onclick = function() {
            var i = 100;
            while ( i-- ) {
                addSprite();
//                    addSprite2();
//                    addSprite3();
            }
        };

        var bt1 = new Button();
        comp.element.appendChild( bt1.element );
        bt1.value( "add text" );
        bt1.element.onclick = function() {
            var i = 100;
            while ( i-- ) {
                addText();
            }
        };

        var bt2 = new Button();
        comp.element.appendChild( bt2.element );
        bt2.value( "add bitmap" );
        bt2.element.onclick = function() {
            var i = 10;
            while ( i-- ) {
                addBitmap();
            }
        };

        var bt3 = new Button();
        comp.element.appendChild( bt3.element );
        bt3.value( "add video" );
        bt3.element.onclick = function() {
            addVideo();
        };

        var bt4 = new Button();
        comp.element.appendChild( bt4.element );
        bt4.value( "add audio" );
        bt4.element.onclick = function() {
            addAudio();
        };
    };

    /**
     * Sprite 생성
     */
    function addSprite() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight ),
            width : 50,
            height : 50,
//            scaleX : DkUtil.random( 1, 0.5 ),
//            scaleY : DkUtil.random( 1, 0.5 ),
//            rotate : DkUtil.random( 360 ),
//            rotateX : DkUtil.random( 360 ),
//            rotateY : DkUtil.random( 360 ),
//            rotateZ : DkUtil.random( 360 ),
            backgroundColor : DkUtil.randomColor()
        } );

        DkPlugin.css( box, {
//            borderRadius : "25px",
        } );
    };

    /**
     * Sprite 생성2
     */
    function addSprite2() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight ),
            width : 25,
            height : 50
        } );

        var child = new DkSprite();
        box.addChild( child );
        _setTotal();
        child.sets( {
            width : 50,
            height : 50,
            backgroundColor : DkUtil.randomColor()
        } );

        DkPlugin.css( box, {
            overflow : "hidden"
        } );

        DkPlugin.css( child, {
            borderRadius : "25px",
            clip : "rect(0px,25px,50px,0px)"
        } );

        setInterval( function( $box ) {
            $box.set( "rotate", $box.get( "rotate" ) + 180 );
            DkPlugin.css( $box, {
                transition : "all 1s linear"
            } );
        }, 1000, child );
    };

    /**
     * Sprite 생성3
     */
    function addSprite3() {
        var box = new DkBitmap();
        _dkView.addChild( box );
        box.load( "asset/circle.png" );
        _setTotal();
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight ),
            width : 50,
            height : 50
//            scaleX : DkUtil.random( 1, 0.5 ),
//            scaleY : DkUtil.random( 1, 0.5 ),
//            rotate : DkUtil.random( 360 ),
//            rotateX : DkUtil.random( 360 ),
//            rotateY : DkUtil.random( 360 ),
//            rotateZ : DkUtil.random( 360 ),
        } );
    };

    /**
     * Text 생성
     */
    function addText() {
        var box = new DkText();
        _dkView.addChild( box );
        _setTotal();
        box.text( "text text text", 30, DkUtil.randomColor() );
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight ),
            backgroundColor : DkUtil.randomColor(),
            width : box.get( "widthReal" ),
            height : box.get( "heightReal" ),
            scaleX : DkUtil.random( 1, 0.5 ),
            scaleY : DkUtil.random( 1, 0.5 ),
            alpha : DkUtil.random( 1, 0.5 ),
            rotate : DkUtil.random( 360 ),
            rotateX : DkUtil.random( 360 ),
            rotateY : DkUtil.random( 360 ),
            rotateZ : DkUtil.random( 360 )
        } );
    };

    /**
     * bitmap 생성
     */
    function addBitmap() {
        var bit = new DkBitmap();
        bit.load( "asset/img.jpg", true, loadComplete );

        var box = new DkSprite();
        box.sets( {
            x : DkUtil.random( _dkContainerWidth - 300 ),
            y : DkUtil.random( _dkContainerHeight - 300 ),
            alpha : DkUtil.random( 1, 0.5 ),
            rotate : DkUtil.random( 360 ),
            rotateX : DkUtil.random( 360 ),
            rotateY : DkUtil.random( 360 ),
            rotateZ : DkUtil.random( 360 ),
            scaleX : 0.3,
            scaleY : 0.3
        } );

        function loadComplete( $target ) {
            box.addChild( $target );
            _dkView.addChild( box );
            _setTotal();
        }
    };

    /**
     * video 생성
     */
    function addVideo() {
        var box = new DkMedia( "video" );
        box.load( "asset/video", true, false );
        _dkView.addChild( box );
        _setTotal();
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight ),
            scaleX : DkUtil.random( 1, 0.5 ),
            scaleY : DkUtil.random( 1, 0.5 ),
            alpha : DkUtil.random( 1, 0.5 ),
            rotate : DkUtil.random( 360 ),
            backgroundColor : "#111111"
        } );
    };

    /**
     * audio 생성
     */
    function addAudio() {
        var box = new DkMedia( "audio" );
        _dkView.addChild( box );
        _setTotal();
        box.load( "asset/sound", true );
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight ),
            scaleX : DkUtil.random( 1, 0.5 ),
            scaleY : DkUtil.random( 1, 0.5 ),
            alpha : DkUtil.random( 1, 0.5 ),
            rotate : DkUtil.random( 360 ),
            backgroundColor : "#111111"
        } );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * display container 생성
     */
    function initDisplayContainer() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Display Container</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "link" );
        bt.element.onclick = function() {
            window.open( "displayContainer.html", "_blank" );
        };
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * spriteSheet 생성
     */
    function initSpriteSheet() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>SpriteSheet</b><br><br>";
        comp.html( str );

        var box_arr = [];

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add spriteSheet" );
        bt.element.onclick = function() {
            var i = 100;
            while ( i-- ) {
                box_arr.push( addSpriteSheet() );
            }
        };
        comp.element.appendChild( document.createElement( "br" ) );

        var btPlay = new Button();
        comp.element.appendChild( btPlay.element );
        btPlay.value( "play" );
        btPlay.element.onclick = function() {
            var i = box_arr.length;
            while ( i-- ) {
                box_arr[ i ].play();
            }
        };

        var btStop = new Button();
        comp.element.appendChild( btStop.element );
        btStop.value( "stop" );
        btStop.element.onclick = function() {
            var i = box_arr.length;
            while ( i-- ) {
                box_arr[ i ].stop();
            }
        };

        var btGotoAndStop = new Button();
        comp.element.appendChild( btGotoAndStop.element );
        btGotoAndStop.value( "gotoAndStop" );
        btGotoAndStop.element.onclick = function() {
            var i = box_arr.length;
            while ( i-- ) {
                box_arr[ i ].gotoAndStop( 10 );
            }
        };

        var btGotoAndPlay = new Button();
        comp.element.appendChild( btGotoAndPlay.element );
        btGotoAndPlay.value( "gotoAndPlay" );
        btGotoAndPlay.element.onclick = function() {
            var i = box_arr.length;
            while ( i-- ) {
                box_arr[ i ].gotoAndPlay( 10 );
            }
        };

        var btGotoAndRepeat = new Button();
        comp.element.appendChild( btGotoAndRepeat.element );
        btGotoAndRepeat.value( "gotoAndRepeat" );
        btGotoAndRepeat.element.onclick = function() {
            var i = box_arr.length;
            while ( i-- ) {
                box_arr[ i ].gotoAndRepeat( 10, 20 );
            }
        };
    };

    /**
     * add spriteSheet 생성
     * @returns {DkSpriteSheet}
     */
    function addSpriteSheet() {
        var box = new DkSpriteSheet();
        _dkView.addChild( box );
        _setTotal();
        box.load( "asset/sheet1.png", 6, 5, 30, 30 );
        box.set( "x", DkUtil.random( _dkContainerWidth ) );
        box.set( "y", DkUtil.random( _dkContainerHeight ) );
        return box;
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * sprite addListener
     */
    function initAddListener() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Sprite AddListener</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add spreite addListener" );
        bt.element.onclick = function() {
            addSpriteAddListener();
        };
    };

    /**
     * add sprite addListener
     */
    function addSpriteAddListener() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.sets( {
            x : DkUtil.random( _dkContainerWidth ),
            y : DkUtil.random( _dkContainerHeight )
        } );
        box.set( "backgroundColor", "#FFFFFF" );

        box.addListener( "click", boxClick );
        box.addListener( "mouseover", boxOver );
        box.addListener( "mouseout", boxOut );

        function boxClick( $eventObj ) {
            trace( $eventObj.type );
        };

        function boxOver( $eventObj ) {
            trace( $eventObj.type );
            $eventObj.currentTarget.set( "scaleX", 2 );
            $eventObj.currentTarget.set( "scaleY", 2 );
        };

        function boxOut( $eventObj ) {
            trace( $eventObj.type );
            $eventObj.currentTarget.set( "scaleX", 1 );
            $eventObj.currentTarget.set( "scaleY", 1 );
        };
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * hierarchy
     */
    function initHierarchy() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Hierarchy</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "add hierarchy" );
        bt.element.onclick = function() {
            addHierarchy();
        };
    };

    /**
     * add hierarchy
     */
    function addHierarchy() {
        var box0 = new DkSprite();
        _dkView.addChild( box0 );
        _setTotal();
        box0.set( "x", _dkContainerWidth / 2 - 100 );
        box0.set( "y", _dkContainerHeight / 2 - 100 );
        box0.set( "width", 200 );
        box0.set( "height", 150 );
        box0.set( "backgroundColor", DkUtil.randomColor() );
        box0.set( "alpha", 0.8 );

        var box1 = new DkSprite();
        box0.addChild( box1 );
        _setTotal();
        box1.set( "x", 150 );
        box1.set( "y", 50 );
        box1.set( "width", 100 );
        box1.set( "height", 150 );
        box1.set( "backgroundColor", DkUtil.randomColor() );
        box1.set( "alpha", 0.8 );

        var box2 = new DkBitmap();
        box2.load( "asset/img.jpg", false, loadComplete );
        box1.addChild( box2 );
        _setTotal();
        box2.set( "x", 50 );
        box2.set( "y", 100 );
        box2.set( "width", 150 );
        box2.set( "height", 100 );
        box2.set( "alpha", 0.8 );

        function loadComplete() {
            box2.set( "width", 150 );
            box2.set( "height", 100 );
        }

        box0.addListener( "mouseover", boxOver );
        box0.addListener( "mouseout", boxOut );
        box1.addListener( "mouseover", boxOver );
        box1.addListener( "mouseout", boxOut );
//        box2.addListener( "mouseover", boxOver );
//        box2.addListener( "mouseout", boxOut );

        function boxOver( $e ) {
            var target = $e.currentTarget;
            target.set( "x", target.get( "x" ) + 10 );
            target.set( "backgroundColor", DkUtil.randomColor() );
            DkManagerLoop.del( "hierarchy" );
        }

        function boxOut( $e ) {
            var target = $e.currentTarget;
            target.set( "x", target.get( "x" ) - 10 );
            target.set( "backgroundColor", DkUtil.randomColor() );
            DkManagerLoop.add( "hierarchy", loop );
        }

        function loop() {
            box0.set( "rotate", box0.get( "rotate" ) + 0.1 );
            box1.set( "rotate", box1.get( "rotate" ) + 0.1 );
            box2.set( "rotate", box2.get( "rotate" ) + 0.1 );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * mouse touch position
     */
    function initMouseTouch() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Mouse Touch Position</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "mouse position" );
        bt.element.onclick = function() {
            addMouseTouchPosition();
        };
    };

    /**
     * add mouse touch position
     */
    function addMouseTouchPosition() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.set( "x", 50 );
        box.set( "y", 100 );
        box.set( "width", 300 );
        box.set( "height", 450 );
        box.set( "backgroundColor", "#FFF" );
        box.___style.color = "#000";

        DkManagerLoop.add( "mousePosition", mouseTouch );
        function mouseTouch() {
            var str = "mouseX : " + _dkView.get( "mouseX" ) + " mouseY : " + _dkView.get( "mouseY" );
            var touchList = _dkView.get( "touchList" );
            if ( touchList ) {
                var total = _dkView.get( "touchList" ).length;
                for ( var i = 0; i < total; i++ ) {
                    str += "<br> touchX" + ( i + 1 ) + " : " + touchList[ i ].touchX + " touchY" + ( i + 1 ) + " : " + touchList[ i ].touchY;
                }
            }
            box.innerHTML( str );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * wheel manager
     */
    function initWheelManager() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Wheel Manager</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "wheel manager" );
        bt.element.onclick = function() {
            addWheelManager();
        };
    };

    /**
     * add wheel manager
     */
    function addWheelManager() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.set( "x", 400 );
        box.set( "y", 100 );
        box.set( "width", 300 );
        box.set( "height", 100 );
        box.set( "backgroundColor", "#FFF" );
        box.___style.color = "#000";

        DkManagerWheel.add( "wheel", wheel );
        function wheel( $delta, $e, $key ) {
            var str = "delta : " + $delta + " / e : " + $e + " / " + $key;
            box.innerHTML( str );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * keyboard manager
     */
    function initKeyboardManager() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Keyboard Manager</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "keyboard manager" );
        bt.element.onclick = function() {
            addKeyboardManager();
        };
    };

    /**
     * add keyboard manager
     */
    function addKeyboardManager() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.set( "x", 400 );
        box.set( "y", 250 );
        box.set( "width", 300 );
        box.set( "height", 100 );
        box.set( "backgroundColor", "#FFF" );
        box.___style.color = "#000";

        DkManagerKeyboard.add( "keyboard", keyboard );
        function keyboard( $type, $keyCode, $e, $key ) {
            var str = "type : " + $type + " / keyCode : " + $keyCode + " / e : " + $e + " / " + $key;
            box.innerHTML( str );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * xml loader
     */
    function initXmlLoader() {
            var comp = new Comp();
            _compContainer.element.appendChild( comp.element );
            comp.css( {
                width : _compWidth + "px"
            } );
            var str = "<b>XML Loader</b><br><br>";
            comp.html( str );

            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "xml load" );
            bt.element.onclick = function() {
                loadXml();
            };
    };

    /**
     * load xml
     */
    function loadXml() {
        var box = new DkSprite();
        _dkView.addChild( box );
        _setTotal();
        box.set( "x", 400 );
        box.set( "y", 400 );
        box.set( "width", 300 );
        box.set( "height", 100 );
        box.set( "backgroundColor", "#FFF" );
        box.___style.color = "#000";

        DkLoader.ajax( {
            type : "GET",
            url : "asset/slide.xml",
            dataType : "xml",
            complete : loadComplete,
            cache : false,
            error : error
        } );

        function error() {
            trace( "서버 에러가 발생하였습니다." );
            box.innerHTML( "서버 에러가 발생하였습니다." );
        }

        function loadComplete( $data ) {
            var xmlData = DkLoader.xmlParser( $data );
//            DkLoader.xmlView( xmlData );
            trace( "loadComplete : ", xmlData.slide.img[3]["@url"] );
            box.innerHTML( "loadComplete : " + xmlData.slide.img[3]["@url"] );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * asset loader
     */
    function initAssetLoader() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Asset Loader</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "asset load" );
        bt.element.onclick = function() {
            loadAsset();
        };
    };

    /**
     * load asset
     */
    function loadAsset() {
        var arr = [ ];
        arr.push( { linkage : "img", url : "asset/img.jpg" } );
        arr.push( { linkage : "sheet0", url : "asset/sheet.png" } );
        arr.push( { linkage : "sheet1", url : "asset/sheet1.png" } );
        arr.push( { linkage : "sheet2", url : "asset/sheet2.png" } );
        DkLoader.asset( arr, assetLoadComplete, assetLoadProgress );

        function assetLoadProgress( $ratio ) {
        }

        function assetLoadComplete( $assetList ) {
            var i = arr.length;
            while ( i-- ) {
                var box = new DkBitmap();
                box.load( $assetList[ arr[ i ].linkage ] );
                trace( $assetList[ arr[ i ].linkage ] );
                box.set( "x", i * 300 );
                _dkView.addChild( box );
                _setTotal();

                if ( i == 0 ) {
                    box.set( "scaleX", 0.5 );
                    box.set( "scaleY", 0.5 );
                }
            }
        };
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * js loader
     */
    function initJsLoader() {
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>JS Loader</b><br><br>";
        comp.html( str );

        var bt = new Button();
        comp.element.appendChild( bt.element );
        bt.value( "js load" );
        bt.element.onclick = function() {
            var arr = [ "js/testHost/sub.js" ];
            DkLoader.js( arr, complete );
            function complete() {
                trace( "js load total complete" );
            };
        };
    };
}