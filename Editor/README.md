# LJMU School of Education: Canvas Hacks - Editor

This project contains various enhancement to the Canvas VLE / LMS, relating to working with the page editor.

Enhancements included in this Userscript:
* When in the HTML view, the contents of the page can be beautified so that the structure of the HTML can be easily send.
* A simple UI is provided to add [https://community.canvaslms.com/thread/2767](FlexBox Grid) elements into the HTML view. [http://flexboxgrid.com/](FlexBox Grid) is a simple set of page styles that create columns on a page, in a way that can adapt to narrow display sizes.

## Installation
1. Install [TamperMonkey](http://tamperMonkey.net/) for your browser (tested with Chrome.)
2. Add the [main.user.js](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Editor/main.user.js) script to TamperMonkey.

## Introduction

TamperMonkey is a popular Google Chrome browser extension that lets users augment existing web pages to (unofficially) change or add features. These augmentations are known as Userscripts – lightweight chunks of software that the user can add to TamperMonkey, designed to trigger when the browser visits specific web pages. Once triggered, a Userscript has broad access to add its own functionality into the page. 

LJMU SoE has developed a TamperMonkey Userscript to help create pages with sophisticated styling, that work with Accessibility guidelines and adapt well to different display widths. Typically users often resort to *tables* to do non-paragraph layouts in Canvas Pages, but tables are rigid and confusing to screen readers. On a narrow display (such as a smart phone) the table cannot be broken apart and re-flowed to fit the dimensions of the screen. Screen readers need to guess the order in which the cells in a table needs to be read, which may not correspond with the way the content flows.

> This Userscript is an unofficial add-on to Canvas; **it is not endorsed by Canvas**. If it works for you, great, but don’t phone Canvas Support if it fails. 
