// ==UserScript==
//
// https://www.tampermonkey.net/documentation.php?version=4.9&ext=dhdg&updated=true
// http://code.jquery.com/jquery-latest.js
//
// @name         LJMU SoE Canvas Enhancements.
// @namespace    http://ljmu.ac.uk/
// @version      2020-04-01
// @description  Makes various ease-of-use enhancements to Canvas VLE.
// @author       S.E.Morris
// @match        http*://canvas.ljmu.ac.uk/courses/*/assignments/*/edit*
// @match        http*://canvas.ljmu.ac.uk/courses/*/assignments/new*
// @match        http*://canvas.ljmu.ac.uk/courses/*/rubrics
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://d3js.org/d3-dsv.v1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Figure out which Canvas page we're on, so we can apply the right hack.
    const subpages = {
        'assignment' : /^http.*\/\/[^\/]+\/courses\/\d+\/assignments/ ,
        'rubric' : /^http.*\/\/[^\/]+\/courses\/\d+\/rubrics/
    }
    let page = null;
    for(let k in subpages) {
        if(window.location.toString().match(subpages[k])) { page = k; }
    }

    // Inject CSS
    $("<style>").prop("type", "text/css").html(
        '.tm_Injection {' +
        '  color: Blue;  background-color: #ffffcc; '+
        '  border: 1px Solid #cccc66; ' +
        '  padding: 0.25em 0.5em; '+
        '  box-shadow: 0px 5px 5px #ccc;  border-radius: 10px; ' +
        '}' +
        '.tm_Injection::before {' +
        "  content: '-- Cando: Unofficial Canvas Userscript (2020-04-01) --'; " +
        '  padding: 2px 5px;  font-size: 9pt;  color: White;  background-color: #cccc66; ' +
        '}'
    ).appendTo("head");

    if(page==='assignment') {
        /* ================================================================================
         * Assignment editor.
         * ================================================================================ */
        setTimeout(() => { // Wait for page to inject "Restrict file upload types"
            // Injext HTML
            const $c = $(
                '<div class="tm_Injection">' +
                '<div>' +
                '<a href="#" data-exts="doc,docx,pdf">Word processor</a> | ' +
                '<a href="#" data-exts="ppt,pptx">Slideshow</a> | ' +
                '<a href="#" data-exts="jpg,jpeg">Image</a>' +
                '<hr/>' +
                '<a href="#" data-exts="">Correct format</a></div>' +
                '</div>'
            );
            $('#allowed_extensions_container').append($c);

            // Inject CSS to counteract Canvas styles
            $("<style>").prop("type", "text/css").html(
                '.tm_Injection {' +
                '  margin: 0.5em 20px 0.5em 60px; ' +
                '}' +
                '.tm_Injection a {' +
                '  margin-left: Initial !important; '+
                '  font-size: 10pt; '+
                '}' +
                '.tm_Injection hr {' +
                '  margin: 5px 0px; '+
                '  border-top: 1px Solid Blue;  border-bottom: None; '+
                '}'
            ).appendTo("head");

            // Event handler for links, update textfield.
            $('a',$c).click(function(ev) {
                // Unique list of extensions in text field
                const c = $('#assignment_allowed_extensions').val().split(/[^A-Z|a-z]/);
                let arr = [];
                for(let i=0;i<c.length;i++) {
                    const cz = c[i].trim();
                    if((cz.length > 0) && (arr.indexOf(cz) < 0)) { arr.push(cz); }
                }
                // Add button's extensions
                const exts = $(this).attr('data-exts').split(',');
                for(let i=0;i<exts.length;i++) {
                    const ez = exts[i].trim();
                    if((ez.length > 0) && (arr.indexOf(ez) < 0)) { arr.push(ez); }
                }
                // Build string
                let s = '';
                for(let i=0;i<arr.length;i++) { s = s + (s.length==0?'':',') + arr[i]; }
                $('#assignment_allowed_extensions').val(s);

                return false;
            });
        } , 1000);
    } else if(page==='rubric') {
        /* ================================================================================
         * Rubric importer.
         * ================================================================================ */
        setTimeout(() => { // Wait for page to inject
            const $c = $(
                '<div class="tm_Injection">' +
                '  <div class="uploadReceiver"></div>' +
                '  <div class="uploadMessage"></div>' +
                '</div>'
            );
            $('#right-side-wrapper').append($c);

            // Inject CSS to counteract Canvas styles
            $("<style>").prop("type", "text/css").html(
                '.tm_Injection .uploadReceiver {' +
                '  border: 5px Dashed #cccc66;  padding: 0.5em; margin-top: 0.5em; ' +
                '  xxheight: 200px; ' +
                '} ' +
                '.tm_Injection .uploadReceiver .message { ' +
                '  height: 100px;  line-height: 100px; ' +
                '  text-align: Center;  color: #cccc66; '+
                '  font-size: 125%;  font-weight: Bold; '+
                '} ' +
                '.tm_Injection .uploadReceiver.over {' +
                '  border-color: Blue;  color: Blue; '+
                '} ' +
                '.tm_Injection .uploadReceiver .preview {' +
                '  overflow: Scroll;  height: 300px;  background-color: White;' +
                '} ' +
                '.tm_Injection .uploadReceiver .preview table {' +
                '     ' +
                '} ' +
                '.tm_Injection .uploadReceiver .preview td {' +
                '  color: #999966;  border: 1px Solid #cccc66;  vertical-align: Text-top; ' +
                '  font-size: 75%;  min-width: 100px; ' +
                '} '+
                '.tm_Injection .uploadReceiver .preview td div.d {' +
                '  font-weight: Bold; ' +
                '} '+
                '.tm_Injection .uploadReceiver .preview td div.ld {' +
                '  margin-top: 0.5em; ' +
                '} '+
                '.tm_Injection .uploadReceiver .preview td div.s {' +
                '  font-style:Italic;  margin-top: 0.5em; ' +
                '} '+
                '.tm_Injection .uploadMessage {' +
                '  line-height: 3em; '+
                '}'
            ).appendTo("head");

            const errorMesg = function(m) {
                $('.uploadMessage',$c).text(m);
            }

            const resetUI = function() {
                $('.uploadReceiver',$c).empty().append('<div class="message">Drag-n-drop your rubric here (tab-separated file)</div>');
                errorMesg('');
            }
            resetUI();

            $('.uploadReceiver',$c)
                .on('dragstart dragenter dragover drag dragleave dragend drop', function(ev) { ev.preventDefault(); ev.stopPropagation(); })
                .on('dragenter dragover', function(ev) { $(this).addClass('over'); })
                .on('dragleave dragend drop', function(ev) { $(this).removeClass('over'); })
                .on('drop', function(ev) {
                    try {
                        const fs = ev.originalEvent.dataTransfer.files;
                        for(let f of fs) {  // FIXME; should only do first file upload!
                            let reader = new FileReader();
                            reader.onabort = function(ev2) {
                                errorMesg('Upload was aborted.');
                            }
                            reader.onerror = function(ev2) {
                                errorMesg('Upload resulted in an error.');
                            }
                            reader.onload = function(ev2) {
                                const rows = d3.tsvParseRows(ev2.target.result);
                                // OLD const rows = ev2.target.result.split(/\r?\n/);

                                let out = {
                                    "rubric": {
                                        "title": null ,
                                        "points_possible": null ,
                                        "free_form_criterion_comments": 0 ,
                                        "criteria": [
                                        ]
                                    } ,
                                    "rubric_association": {
                                        "id": "",
                                        "use_for_grading": 0,
                                        "hide_score_total": 0,
                                        "association_type": "Course",
                                        "association_id": null ,
                                        "purpose": "bookmark"
                                    },
                                    "title": null,
                                    "points_possible": null,
                                    "rubric_id": "new",
                                    "rubric_association_id": "",
                                    "skip_updating_points_possible": 0,
                                    "authenticity_token": null
                                }

                                // Parse TSV into JSON structure
                                const parseCriterions = function() {
                                    let c = []
                                    let ln = 0;
                                    while(ln < rows.length) {
                                        // OLD let keys = rows[ln++].replace(/\t*$/,'').split('\t');  // Header row, with keys
                                        let keys = rows[ln++];  // Header row, with keys
                                        while((keys.length > 0) && keys[keys.length-1]==='') { keys = keys.splice(0,keys.length-1); }
                                        let endBody = false;
                                        while(!endBody && (ln <rows.length)) {  // Process body
                                            // OLD let r = rows[ln++].replace(/\t*$/,'').split('\t');  // Read row
                                            let r = rows[ln++];  // Read row
                                            while((r.length > 0) && r[r.length-1]==='') { r = r.splice(0,r.length-1); }
                                            // OLD if((r.length == 1) && (r[0]==='')) { // Empty row?
                                            if(r.length == 0) { // Empty row?
                                                endBody = true;
                                            } else {  // Build new criterion
                                                let criterion = {}
                                                let ratings = {}
                                                for(let i=0;i<r.length;i++) {  // Process columns, based on column key
                                                    if(keys[i].match(/criterion +title/i)) {
                                                        criterion['description'] = r[i];
                                                    } else if(keys[i].match(/criterion +description/i)) {
                                                        criterion['long_description'] = r[i];
                                                    } else if(keys[i].match(/rating +title +(.+)/i)) {
                                                        let k = keys[i].match(/rating +title +(.+)/i)[1];
                                                        ratings[k] = (k in ratings) ? ratings[k] : ratings[k] = {} ;
                                                        ratings[k]['description'] = r[i];
                                                    } else if(keys[i].match(/rating +description +(.+)/i)) {
                                                        let k = keys[i].match(/rating +description +(.+)/i)[1];
                                                        ratings[k] = (k in ratings) ? ratings[k] : ratings[k] = {} ;
                                                        ratings[k]['long_description'] = r[i];
                                                    } else if(keys[i].match(/rating +score +(.+)/i)) {
                                                        let k = keys[i].match(/rating +score +(.+)/i)[1];
                                                        ratings[k] = (k in ratings) ? ratings[k] : ratings[k] = {} ;
                                                        ratings[k]['points'] = parseInt(r[i]);
                                                    }
                                                }
                                                // Copy ratings into criterion, high score to low
                                                criterion['ratings'] = [];
                                                while(Object.keys(ratings).length > 0) {
                                                    let low = null;
                                                    for(let k in ratings) {
                                                        low = (!low || (ratings[k].points > ratings[low].points)) ? k : low ;
                                                    }
                                                    criterion.ratings.push(ratings[low]);
                                                    delete ratings[low];
                                                }
                                                // Do checks, throw execption on missing values. For string values
                                                // check defined and not empty, for other values just check defined.
                                                if(!criterion['description']) { throw new SyntaxError('Missing criterion title, row '+ln); }
                                                for(let r of criterion.ratings) {
                                                    if(!r['description']) { throw new SyntaxError('Missing rating title, row '+ln); }
                                                    if(!('points' in r) || isNaN(r.points)) { throw new SyntaxError('Missing rating score, row '+ln); }
                                                }
                                                // Finally add the points from highest scoring rating
                                                criterion['points'] = criterion.ratings[0].points;
                                                c.push(criterion);
                                            }
                                        }
                                    }
                                    return c;
                                }

                                try {
                                    resetUI();

                                    out.rubric.criteria = parseCriterions();

                                    // Fill out other details
                                    const courseId = window.location.toString().match(/^http.*\/\/[^\/]+\/courses\/(\d+)\/rubrics/)[1];
                                    if(courseId) {
                                        out.rubric_association.association_id = courseId;
                                    } else {
                                        throw new Error('Invalid course id: '+courseId);
                                    }

                                    let pointsPossible = 0;
                                    for(let cc of out.rubric.criteria) {
                                        pointsPossible += cc.ratings[0].points;
                                    }
                                    out.points_possible = pointsPossible;
                                    out.rubric.points_possible = pointsPossible;

                                    const cookies = document.cookie.split(';');
                                    const csrfRE = /^_csrf_token=(.*)$/;
                                    for(let ck of cookies) {
                                        const m = ck.trim().match(csrfRE);
                                        if(m) {
                                            out.authenticity_token = decodeURIComponent(m[1]);
                                            break;
                                        }
                                    }
                                    if(!out.authenticity_token) { throw new Error('Cannot find authenticity token in cookies'); }

                                    // Build preview
                                    let $t = $('<div class="preview"><table></table></div>');
                                    for(let cc of out.rubric.criteria) {
                                        let $r = $('<tr></tr>');
                                        $r.append('<td><div class="d">' + cc.description + '</div>' +
                                            ('long_description' in cc ? '<div class="ld">'+cc.long_description.replace(/\n/g,'<br/>')+'</div>' : '') + '</td>');
                                        for(let rr of cc.ratings) {
                                            $r.append('<td><div class="s">Score: ' + rr.points + '</div>' +
                                                '<div class="d">' + rr.description + '</div>' +
                                                ('long_description' in rr ? '<div class="ld">'+rr.long_description.replace(/\n/g,'<br/>')+'</div>' : '') +
                                                '</td>');
                                        }
                                        $('table',$t).append($r);
                                    }

                                    // Build title input
                                    let $i = $(
                                        '<div>' +
                                        '<div><label for="titleTF">Title:</label>&nbsp;<input id="titleTF" type="text" />&nbsp;' +
                                        '<button>Submit</button></div>' +
                                        '</div>'
                                    );
                                    const saveRubric = function(payload) {
                                        $.ajax({
                                            'cache' : false ,
                                            'url' : window.location.pathname ,
                                            'type' : 'POST' ,
                                            'data' : payload
                                        }).done(function() {
                                            window.location.reload(true);
                                        }).fail(function() {
                                            errorMesg('Failed. Canvas rejected the rubric for some reason.');
                                        });
                                    }
                                    $('button',$i).click(function(ev) {
                                        const v = $('input',$i).val().trim();
                                        if(v && v.length > 2) {
                                            out.title = v;
                                            out.rubric.title = v;
                                            errorMesg('Attempting to save...');
                                            saveRubric(out);
                                        } else {
                                            errorMesg('Need to provide a title.');
                                        }
                                    });

                                    $('.uploadReceiver',$c).empty().append($t).append($i);
                                } catch(ex2) { errorMesg(ex2.toString()); }
                            }
                            reader.readAsText(f);
                        }
                    } catch(ex) {  errorMesg('Exception: ' + ex); }
                });
        } , 1000);
    }
})();