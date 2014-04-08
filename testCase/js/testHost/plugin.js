/**
 * @author ssw
 */
window.onload = function() {
    var _doc = document;
    var _body = _doc.body;
    var _dkViewContainer;
    var _dkContainerWidth = DkUtil.getWindowWidth() - 500;
    var _dkContainerHeight = DkUtil.getWindowHeight() - 100;
    var _compContainer;
    var _compX = 20;
    var _compY = 20;
    var _compWidth = 300;
    var _gap = 80;
    var _view;

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
    function init() {
        //----------------------------------------------------------------------------------------------------------------------------//
        // dk View 컨테이너
        ( function() {
            _dkViewContainer = new Comp();
            _body.appendChild( _dkViewContainer.element );
            _dkViewContainer.css( {
                position : "fixed",
                left : _compX + _compWidth + _gap + "px",
                top : _compY + "px",
                width : _dkContainerWidth + "px",
                height : _dkContainerHeight + "px",
                backgroundColor : "",
                margin : "0px",
                padding : "0px"
            } );
        }() );

        //----------------------------------------------------------------------------------------------------------------------------//
        // dk view 생성
        ( function() {
            _view = new DkView();
            var vw = ( _dkContainerWidth < 1000 ) ? 1000 : _dkContainerWidth;
            var vh = ( _dkContainerHeight < 500 ) ? 500 : _dkContainerHeight;
            _view.set( "width", vw );
            _view.set( "height", vh );
            _view.set( "backgroundColor", "#FFF" );
            _view.start( "Dom" );

            _dkViewContainer.element.appendChild( _view.___element );
        }() );

        //----------------------------------------------------------------------------------------------------------------------------//
        // Comp 컨테이너
        ( function() {
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
        }() );

        //----------------------------------------------------------------------------------------------------------------------------//
        // plugin css
        ( function() {
            var comp = new Comp();
            _compContainer.element.appendChild( comp.element );
            comp.css( {
                width : _compWidth + "px"
            } );
            var str = "<b>CSS</b><br><br>";
            comp.html( str );

            // numChildren
            ( function() {
                var bt = new Button();
                comp.element.appendChild( bt.element );
                bt.value( "CSS" );
                bt.element.onclick = function() {
                    var bg = new DkSprite();
                    bg.set( "x", DkUtil.random( _dkContainerWidth ) );
                    bg.set( "y", DkUtil.random( _dkContainerHeight ) );
                    bg.set( "width", 450 );
                    bg.set( "height", 600 );
                    bg.set( "rotation", DkUtil.random( 90 ) );
                    DkPlugin.css( bg, {
                        backgroundImage : "url(" + "asset/img.jpg" + ")",
                        padding : "1px",
                        backgroundClip : "content-box"
                    } );
                    _view.addChild( bg );
                };

                comp.element.appendChild( document.createElement( "br" ) );
            }() );
        }() );

        //----------------------------------------------------------------------------------------------------------------------------//
        // draw line
        ( function() {
            var comp = new Comp();
            _compContainer.element.appendChild( comp.element );
            comp.css( {
                width : _compWidth + "px"
            } );
            var str = "<b>Draw Line</b><br><br>";
            comp.html( str );

            // numChildren
            ( function() {
                var bt = new Button();
                comp.element.appendChild( bt.element );
                bt.value( "draw line" );
                bt.element.onclick = function() {
                    addLine();
                };

                comp.element.appendChild( document.createElement( "br" ) );
            }() );
        }() );

        //--------------------------------------------------------------------------------------------------------------------------------------------------------//

        function addLine() {
            var thickness = 1;
            var color = DkUtil.randomColorHex();
            var alpha = 1;

            var line = new DkLine();
            line.lineStyle( thickness, color, alpha );
            var pointA = { x : DkUtil.random( _dkContainerWidth ), y : DkUtil.random( _dkContainerHeight ) };
            var pointB = { x : DkUtil.random( _dkContainerWidth ), y : DkUtil.random( _dkContainerHeight ) };
            line.draw( pointA, pointB );
            _view.addChild( line );
        }

    };

}