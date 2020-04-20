// ==UserScript==
//
// https://www.tampermonkey.net/documentation.php?version=4.9&ext=dhdg&updated=true
// http://code.jquery.com/jquery-latest.js
//
// @name         LJMU SoE Canvas Enhancements: Editor
// @namespace    http://ljmu.ac.uk/
// @version      2020-04-20
// @updateURL    https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Editor/main.user.js
// @description  Makes various ease-of-use enhancements to Canvas VLE.
// @author       S.E.Morris
// @match        http*://canvas.ljmu.ac.uk/courses/*/pages/*/edit*
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.11.0/beautify-html.min.js
// ==/UserScript==

(function() {
    'use strict';

   // Figure out which Canvas page we're on, so we can apply the right hack.
    const subpages = {
        'editor' : /^http.*\/\/[^\/]+\/courses\/\d+\/pages\/[^\/]+\/edit/
    }
    let page = null;
    for(let k in subpages) {
        if(window.location.toString().match(subpages[k])) { page = k; }
    }

    // Version
    const version = '2020-04-09';

    // Inject CSS
    $("<style>").prop("type", "text/css").html(
        '.tm_Injection {' +
        '  color: Blue;  background-color: #ffffcc; '+
        '  border: 1px Solid #cccc66; ' +
        '  padding: 0.25em 0.5em; '+
        '  box-shadow: 0px 5px 5px #ccc;  border-radius: 10px; ' +
        '}' +
        '.tm_Injection::before {' +
        "  content: '-- Cando: Unofficial Canvas Userscript -- version="+version+" --'; " +
        '  padding: 2px 5px;  font-size: 9pt;  color: White;  background-color: #cccc66; ' +
        '}'
    ).appendTo("head");

    if(page==='editor') {
        /* ================================================================================
         * Assignment editor.
         * ================================================================================ */
        let repeatAttemptCnt = 0;  // Failsafe to prevent an infinite loop.
        const repeatAttempt = setInterval(() => { // Wait for page to inject editor
            // Allow re
            if( ($('#tinymce-parent-of-wiki_page_body #mceu_30').length < 1) && (repeatAttemptCnt < 10) ) {
                repeatAttemptCnt++;
                return;
            } else {
                console.log('Clearing interval');
                clearInterval(repeatAttempt);
            }

            const columnNumber = {
                "2col" : {c:"col-md-6  col-sm-6  col-xs-12" , v:"Two columns"   , i:2} ,
                "3col" : {c:"col-md-4  col-sm-12 col-xs-12" , v:"Three columns" , i:3} ,
                "4col" : {c:"col-md-3  col-sm-6  col-xs-12" , v:"Four columns"  , i:4} ,
                "6col" : {c:"col-md-2  col-sm-4  col-xs-6"  , v:"Six columns"   , i:6}
            };
            const columnAlign = {
                "Ccol" : {c:"center-xs"  , v:"Align centre [--ABC--]"} ,
                "Rcol" : {c:"end-xs"     , v:"Align right [--ABC]"} ,
                "Lcol" : {c:"start-xs"   , v:"Align left [ABC--]"} ,
                "Acol" : {c:"around-xs"  , v:"Space around [--A--B--C--]"} ,
                "Bcol" : {c:"between-xs" , v:"Space between [A--B--C]"}
            };
            const borderStyle = {
                "Full" : {c:"border-trbl" , v:"All sides" } ,
                "TB"   : {c:"border-tb"   , v:"Top/bottom only" } ,
                "RL"   : {c:"border-rl"   , v:"Left/right only" } ,
                "T"    : {c:"border-t"    , v:"Top only" } ,
                "R"    : {c:"border-r"    , v:"Right only" } ,
                "B"    : {c:"border-b"    , v:"Bottom only" } ,
                "L"    : {c:"border-l"    , v:"Left only" }
            }

            const $c = $(
                '<div class="tm_Injection" style="display:None; position:Relative;">' +
                '  <a id="tm_Expander" style="position:Absolute; top:0.5px; right:2em;" href="#">Show/hide</a>' +
                '  <div id="tm_ExpanderTarget" style="display:None; max-height:500px; overflow-y:Auto;">' +
                '    <div style="margin-top:0.5em;">' +
                '      <fieldset>' +
                '        <legend>Columns</legend>'+
                '        <label for="tm_ColumnNumber">Number: </label><select id="tm_ColumnNumber"></select>&nbsp;&nbsp;' +
                '        <label for="tm_ColumnAlign">Spacing: </label><select id="tm_ColumnAlign"></select>&nbsp;&nbsp;' +
                '        <a id="tm_ColumnAdd" href="#">Add columns</a>' +
                '      </fieldset>'+
                '    </div>' +
                '    <div style="margin-top:0.5em;">' +
                '      <fieldset>'+
                '        <legend>Borders</legend>' +
                '        <label for="tm_BorderStyle"Sides: </label><select id="tm_BorderStyle"></select>&nbsp;&nbsp;'+
                '        <a id="tm_BorderAdd" href="#">Add bordered ale</a>' +
                '      </fieldset>'+
                '    </div>'+
                '    <div style="margin-top:0.5em;">' +
                '      <fieldset>'+
                '        <legend>HTML tidy-up</legend>'+
                '        <a id="tm_Beautify" href="#">Beautify HTML</a>' +
                '      </fieldset>'+
                '    </div>' +
                '  </div>' +
                '</div>'
            );
            $('#tm_Expander',$c).click(function(ev) {
                $('#tm_ExpanderTarget',$c).toggle();
                return false;
            });
            for(let k in columnNumber) {
                $('select#tm_ColumnNumber',$c).append('<option name="'+k+'">'+columnNumber[k].v+'</option>');
            }
            for(let k in columnAlign) {
                $('select#tm_ColumnAlign',$c).append('<option name="'+k+'">'+columnAlign[k].v+'</option>');
            }
            for(let k in borderStyle) {
                $('select#tm_BorderStyle',$c).append('<option name="'+k+'">'+borderStyle[k].v+'</option>');
            }
            $('#tinymce-parent-of-wiki_page_body').append($c);

            // Inject CSS to counteract Canvas styles, etc.
            $("<style>").prop("type", "text/css").html(
                '.tm_Injection label { ' +
                '  display:Unset; ' +
                '} ' +
                '.tm_Injection select , .tm_Injection input { ' +
                '  display:Unset;  width:Unset;  height:2em;  border:1px Solid #cccc66;  padding:Unset; ' +
                '} ' +
                '.tm_Injection hr {' +
                '  margin: 5px 0px;  border-color: #cccc66; '+
                '} ' +
                '.tm_Injection fieldset {' +
                '  padding: 1em;  margin: 0.5em;  border: 1px Solid #cccc66; '+
                '} '+
                '.tm_Injection legend {' +
                '  margin-bottom: 0px; border-bottom-width: 0px; width:Unset;'+
                '} '
            ).appendTo("head");

            // Fix styles in Canvas <textarea>
            $('textarea#wiki_page_body').css('font-family','MONOSPACE');

            // Beautify HTML
            const beautify = function() {
                const opt = {
                    "indent_size":"4" , "indent_char":" " ,
                    "max_preserve_newlines":"5" , "preserve_newlines":true ,  "keep_array_indentation": false ,
                    "break_chained_methods": false , "indent_scripts": "normal" ,
                    "brace_style": "collapse" , "space_before_conditional":true , "unescape_strings":false ,
                    "jslint_happy": false , "end_with_newline":false , "wrap_line_length":"0" ,
                    "indent_inner_html":false , "comma_first":false , "e4x":false , "indent_empty_lines":false
                }
                let t = $('textarea#wiki_page_body').val();
                t = html_beautify(t,opt);
                $('textarea#wiki_page_body').val(t);
            }

            // Attach to Canvas' switch editor buttons; display or hide hack based
            // upon whether the <textarea> is visible (show) or WYSIWYG editor (hide.)
            $('.switch_views_container .switch_views').click(function(ev) {
                setTimeout(() => {
                    const taVisible = $('#wiki_page_body').is(":visible");
                    $c[taVisible?'show':'hide']();
                    if(taVisible) { beautify(); }
                },250);
            });

            const addToTextArea = function($o) {
                const _f = function(txt,p,abortChr,successChr,inc) {
                    while(true) {
                        if(p<0 || p>=txt.length || txt.charAt(p)===successChr) {
                            return true;
                        } else if(txt.charAt(p)===abortChr) {
                            return false;
                        }
                        p += inc;
                    }
                }
                const textEdit = $('textarea#wiki_page_body').get(0);
                if(textEdit.selectionStart === textEdit.selectionEnd) {
                    const caretPos = textEdit.selectionStart;
                    let t = $('textarea#wiki_page_body').val();
                    if(_f(t,caretPos-1,'<','>',-1) && _f(t,caretPos,'>','<',+1)) {
                        t = t.substring(0,caretPos) + $o.get(0).outerHTML + t.substring(caretPos);
                        $('textarea#wiki_page_body').val(t);
                    } else {
                        alert('The cursor needs to be inside free text, not an HTML tag.');
                    }
                }
            }

            const getAttrValue = function(selector,data) {
                const k = $(selector+' option:selected').attr('name');
                return data[k];
            }

            // Add columns.
            $('a#tm_ColumnAdd',$c).click(function(ev) {
                // Build HTML
                const opt = getAttrValue('#tm_ColumnNumber',columnNumber);
                const alg = getAttrValue('#tm_ColumnAlign',columnAlign);
                let $o = $('<div class="grid-row '+alg.c+'"></div>');
                for(let i=0;i<opt.i;i++) {
                    $o.append('<div class="'+opt.c+'"><div>Content goes here.</div></div>');
                }
                addToTextArea($o);
            });

            // Add border box.
            $('a#tm_BorderAdd',$c).click(function(ev) {
                const opt = $('#tm_BorderStyle',borderStyle);
                let $o = $('<div class="content-box pad-box-mini border '+opt.c+'"><div>Content goes here.</div></div>');
                addToTextArea($o);
            });

            // Beautify HTML.
            $('a#tm_Beautify',$c).click(function(ev) {
                beautify();
            });
        } , 100);
    }
})();
