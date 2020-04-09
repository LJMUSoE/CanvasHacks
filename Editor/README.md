# LJMU School of Education: Canvas Hacks - Editor

This project contains various enhancement to the Canvas VLE / LMS, relating to working with the page editor.

Enhancements included in this Userscript:
* When in the HTML view, the contents of the page can be beautified so that the structure of the HTML can be easily send.
* A simple UI is provided to add [FlexBox Grid](https://community.canvaslms.com/thread/2767) elements into the HTML view. [FlexBox Grid](http://flexboxgrid.com/) is a simple set of page styles that create columns on a page, in a way that can adapt to narrow display sizes.

## Installation
1. Install [TamperMonkey](http://tamperMonkey.net/) for your browser (tested with Chrome.)
2. Add the [main.user.js](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Editor/main.user.js) script to TamperMonkey.

## Introduction

TamperMonkey is a popular Google Chrome browser extension that lets users augment existing web pages to (unofficially) change or add features. These augmentations are known as Userscripts – lightweight chunks of software that the user can add to TamperMonkey, designed to trigger when the browser visits specific web pages. Once triggered, a Userscript has broad access to add its own functionality into the page. 

LJMU SoE has developed a TamperMonkey Userscript to help create pages with sophisticated styling. Users often resort to *tables* to do non-paragraph layouts in Canvas Pages, but tables are inflexible and can be confusing to accessibility software. On a narrow display (such as a smart phone) a table cannot be broken apart and re-flowed to fit the dimensions of the screen. Screen readers need to guess the order in which the cells in a table should be read, which may not correspond with the way the content flows between cells visually on the page. The solution to these problems is to define content using regular non-table HTML, but tell the browser to group elements horizontally when the display width permits it (and vertically when it doesn't.) This not only allows the browser to re-structure the page to fit the available width, but also makes the document's structure better match its reading order (which aids screen readers.) 

Canvas already employs a solution for re-flowing horizontal content, called [FlexBox Grid.](https://community.canvaslms.com/thread/2767) FlexBox Grid is available for use on Pages, but to apply it to a page the author has to have a solid understanding of Web style languages (Cascading Style Sheets.) This Userscript adds a few simple controls **to the HTML editor** in Canvas Pages (not the Rich Text Editor) that helps add such content, without the author needing any understanding of Web stylesheets.

> This Userscript is an unofficial add-on to Canvas; **it is not endorsed by Canvas**. If it works for you, great, but don’t phone Canvas Support if it fails. 

## How to use

To add columned content to a page, edit it, then switch to the HTML editor. The Userscript should appear below the editor. Place the cursor (the caret) at the point within the HTML where you would like to inject the columns, choose the number of columns to create, and which stragegy the browser should use to distribute any empty space around the columns (should they be narrower than the page width), then click the link to inject the HTML markup.

**Note:** although Canvas itself uses FlexBox Grid, its Rich Text Editor does not include it. This means that when editing the page using the Rich Text Editor, FlexBox Grid isn't loaded and the columns will be stacked vertically, rather than horizontally. When the page is saved, however, the columns will be displayed as intended.
