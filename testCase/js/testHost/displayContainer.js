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
    var _compWidth = 300;
    var _gap = 80;
    var _dkView;
    var _output;
    var _boxContainer;

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
            width : "120px",
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
    // input
    var Input = function() {
        var element = _doc.createElement( "input" );
        element.type = "text";
        this.element = element;
        this.style = element.style;

        this.css( {
            position : "relative",
            display : "inline",
            margin : "2px",
            width : "150px",
            height : "14px",
            fontFamily : "돋움, sans-serif",
            fontSize : "12px"
        } );
    };

    Input.prototype = {
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
        _dkContainerWidth = Util.getWindowWidth() - 500;
        _dkContainerHeight = Util.getWindowHeight() - 50;

        initContainer();
        initView();
        initDisplayContainer();
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
            width : _dkContainerWidth + "px",
            height : _dkContainerHeight + "px",
            backgroundColor : "",
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
            padding : "0px"
        } );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
     * view 생성
     */
    function initView() {
        // view 생성
        _dkView = new DkView();
        var vw = ( _dkContainerWidth < 1000 ) ? 1000 : _dkContainerWidth;
        var vh = ( _dkContainerHeight < 500 ) ? 500 : _dkContainerHeight;
        _dkView.set( "width", vw );
        _dkView.set( "height", vh );
        _dkView.set( "backgroundColor", "#000" );
        _dkView.start( "Dom" );

        _dkViewContainer.element.appendChild( _dkView.___element );

        _output = new DkSprite();
        _output.sets( {
            x : 50,
            y : 50,
            width : 300,
            height : 100,
            backgroundColor : "#353740"
        } );
        _dkView.addChild( _output );

        _boxContainer = new DkSprite();
        _boxContainer.sets( {
            x : 400,
            y : 50,
            width : _dkContainerWidth - 450,
            height : _dkContainerHeight - 100,
            backgroundColor : "#353740"
        } );
        _dkView.addChild( _boxContainer );
    };

    function initDisplayContainer() {
        // display container 생성
        var comp = new Comp();
        _compContainer.element.appendChild( comp.element );
        comp.css( {
            width : _compWidth + "px"
        } );
        var str = "<b>Display Container</b><br><br>";
        comp.html( str );

        var box;

        // numChildren
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "numChildren" );
            bt.element.onclick = function() {
                _output.innerHTML( "numChildren : " + _boxContainer.numChildren() );
            };

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // addChild
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "addChild" );
            bt.element.onclick = function() {
                box = addChildBox();
            };

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // addChildAt
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "addChildAt" );
            bt.element.onclick = function() {
                box = addChildAtBox( tf.value() );
            };

            var tf = new Input();
            comp.element.appendChild( tf.element );
            tf.value( 0 );

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // getChildAt
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "getChildAt" );
            bt.element.onclick = function() {
                _output.innerHTML( _boxContainer.getChildAt( tf.value() ).innerHTML() );
            };

            var tf = new Input();
            comp.element.appendChild( tf.element );
            tf.value( 0 );

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // getChildIndex
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "getChildIndex" );
            bt.element.onclick = function() {
                _output.innerHTML( _boxContainer.getChildIndex( box ) );
            };

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // removeChild
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "removeChild" );
            bt.element.onclick = function() {
                _boxContainer.removeChild( box );
            };

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // removeChildAt
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "removeChildAt" );
            bt.element.onclick = function() {
                _boxContainer.removeChildAt( tf.value() );
            };

            var tf = new Input();
            comp.element.appendChild( tf.element );
            tf.value( 0 );

            comp.element.appendChild( document.createElement( "br" ) );
        }() );

        // removeChildren
        ( function() {
            var bt = new Button();
            comp.element.appendChild( bt.element );
            bt.value( "removeChildren" );
            bt.element.onclick = function() {
                _boxContainer.removeChildren();
            };

            comp.element.appendChild( document.createElement( "br" ) );
        }() );
    };

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    var addChildBox;
    var addChildAtBox;

    function makeBox() {
        var box = new DkSprite();
        box.sets( {
            width : 50,
            height : 50
        } );

        // soso
        box.___style.position = "relative";
        box.___style.borderStyle = "solid";
        box.___style.borderWidth = "1px";
        box.___style.borderColor = "#000";
        box.___style.color = "#000";

        return box;
    };

    ( function() {
        var count = 0;

        addChildBox = function() {
            count++;

            var box = makeBox();
            _boxContainer.addChild( box );
            box.set( "backgroundColor", "#FFFFFF" );

            box.innerHTML( "box" + count );

            return box;
        };

        addChildAtBox = function( $index ) {
            count++;

            var box = makeBox();
            _boxContainer.addChildAt( box, $index );
            box.set( "backgroundColor", "#CCCCCC" );

            box.innerHTML( "box" + count );

            return box;
        };
    }() );

}