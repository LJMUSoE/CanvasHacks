# LJMU School of Education: Canvas Hacks - Editor

This project contains various enhancement to the Canvas VLE / LMS, relating to working with the page editor.

Enhancements included in this Userscript:
* When in the HTML view, the contents of the page can be beautified so that the structure of the HTML can be easily seen.
* A simple UI is provided to add Web standards-compliant columns and other horizontal content, without using tables. Avoiding tables allows the horizontal page content to reorganise itself to fit narrow page sizes, while also making the page interact better with accessibility software.
* A simple UI is provided to add parapraphs with pinline borders.

## Installation
1. Install the [TamperMonkey](http://tamperMonkey.net/) extension for your browser, if you haven't already (tested with Chrome.)
2. Add the [main.user.js](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Editor/main.user.js) script to TamperMonkey.

## Introduction

TamperMonkey is a popular Google Chrome browser extension that lets users augment existing web pages to (unofficially) change or add features. These augmentations are known as 'Userscripts'. 

LJMU SoE has developed a TamperMonkey Userscript to help create pages with sophisticated styling. Users often resort to *tables* to do sophisticated layouts in Canvas Pages, but using tables merely for layout has long been discouraged on the Web. On a narrow display (such as a smart phone) a table cannot be broken apart, to be reflowed to fit within the dimensions of the screen. Also, using tables for layout can obfuscate the natural reading order of elements on the page, causing issues with accessibility software such as screen readers. Since the early 2000s Web standards have provided technologies to create sophisticated layouts that can adapt to different page widths, and also maintain an unambiguous reading order. 

Using these Web standards, Canvas includes a simple mechanism to include horizontal content -- columns -- called [FlexBox Grid.](https://community.canvaslms.com/thread/2767) FlexBox Grid is available for use on Pages, but to apply it to a page the author has to have a solid understanding of Web style languages (Cascading Style Sheets.) This Userscript adds a few simple controls **to the HTML editor** in Canvas Pages (note: not the Rich Text Editor) that helps add such content, without a knowledge of Web standards.

> This Userscript is an unofficial add-on to Canvas; **it is not endorsed by Canvas**. If it works for you, great, but don’t phone Canvas Support if it fails. 

## How to use

To add columned content to a page, edit it, then switch to the HTML editor. The Userscript should appear below the editor. Place the cursor (the caret) at the point within the HTML where you would like to inject the columns, choose the number of columns to create, and which stragegy the browser should use to distribute any empty space around the columns (should they be narrower than the page width), then click the link to inject the HTML markup.

To create a grid, simply place one FlexBox Grid beneath another. So, to create a 3x2 display, simply use a 3 column FBG followed by a second 3 column FBG.

**Note:** although Canvas itself uses FlexBox Grid, annoyingly its Rich Text Editor page does not include it. This means that when editing the page using the Rich Text Editor, FlexBox Grid isn't loaded and the columns will be stacked vertically, rather than horizontally. When the page is saved, however, the columns will be displayed as intended.
