# LJMU School of Education: Canvas Hacks - Assignments

This project contains various enhancement to the Canvas VLE / LMS, relating to setting up assignments and rubrics. This document describes a process allowing Canvas users to avoid its in-built rubric design tool by designing their rubrics using spreadsheet software such as Microsoft Excel. 

## Installation
1. Install [Tampermonkey](http://tamperMonkey.net/) for your browser (tested with Chrome.)
2. Add the [main.user.js](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Assignments/main.user.js) script to TamperMonkey.

## Introduction

TamperMonkey is a popular Google Chrome browser extension that lets users augment existing web pages to (unofficially) change or add features. These augmentations are known as Userscripts – lightweight chunks of software that the user can add to TamperMonkey, designed to trigger when the browser visits specific web pages. Once triggered, a Userscript has broad access to add its own functionality into the page. 

LJMU SoE has developed a TamperMonkey Userscript to add a second route for creating rubrics, alongside Canvas’ official rubric builder. This alternative route is more forgiving about the structure of the rubric, specifically the order the ratings are defined. 

    This Userscript is an unofficial add-on to Canvas’ it is not endorsed by Canvas. If it works for you, great, but don’t phone Canvas     Support if it fails. 

## Creating a spreadsheet for the SoE TamperMonkey Userscript Canvas uploader 

The first row of each spreadsheet is the header row. It signifies the meaning of the values in each column beneath by using certain key terms. The columns can be in any order, so long as the first row (the header row) correctly identifies their contents. Further to this, certain columns are grouped together using an identifier appended to the end of their header key term. This will be easier to understand once you see examples. 

The values in the rows beneath the header describe the criteria of the rubric, one row per criterion. 

![Basic spreadsheet](./docs/ss01.jpg)

![Basic spreadsheet](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Assignments/docs/ss02.jpg)
![Basic spreadsheet](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Assignments/docs/ss03.jpg)
![Basic spreadsheet](https://raw.githubusercontent.com/LJMUSoE/CanvasHacks/master/Assignments/docs/ss04.jpg)
