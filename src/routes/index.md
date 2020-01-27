# 02.526: Interactive Data Visualization
### Ate Poorthuis // ate_poorthuis@sutd.edu.sg  
  
**January Term 2020**  
**Tue 2.30-4.00pm** Think Thank 17 (2.202)  
**Thu 1-2.30pm** Think Thank 17 (2.202)  
*Office Hours: By appointment*

## Course Description
This course teaches students the concepts, skills and techniques of online, interactive map design and data visualization. In doing so, it covers both the modern web development workflow and Javascript programming. These fundamental programming tools and techniques are mastered in an applied context of designing and building interactive visualizations. Apart from a foundational understanding of the building blocks of the modern web (HTML, CSS, Javascript), students learn to build visualizations using industry-standard Javascript libraries through a series of lab-based assignments and projects. The course keeps a focus on the entire iterative design workflow throughout the semester and culminates in a project in which a sequence of prototypes leads to a final online, interactive data visualization.

## Format
The course is structured around two 1.5 hour classes per week that integrate lecture, discussion and in-class activities and exercises in an interactive manner. The class is further structured around 6 blocks (each lasting ~two weeks).

## Expectations
Students are expected to be present and actively participate in each class, as well as on the class online forum (Slack). Before coming to class, you will have read the assigned readings and you are coming to class prepared to participate in discussion and exercises. 

You are also expected to produce your own work, whether individually or in groups. Do not copy work from the internet or other published sources without proper citations. This is plagiarism and if a student is found to be doing so, he or she will be subject to disciplinary measures including potentially failing the course.

## Assessment
There will be a variety of assessments throughout the semester. Emphasis is on your performance overall, with relatively low weight placed on individual items. Continued participation throughout the semester will enable you to do well in this course.

| Assessment Items                          | Percentage | Period          |
|-------------------------------------------|------------|-----------------|
| Class Participation                       | 15%        | Throughout term |
| Assignments (five)                        | 40%        | Throughout term |
| Final Project                             | 45%        | Week 14         |

### Assignments
Each block consists of a series of exercises that culminate in an assignment/report that will be due before the start of the next block (Monday 23.59).

### Final Project
For the final project, you will work in groups of 1-3 students and develop a visualization project. The project can roughly take two direction. The first direction is focused on *communicating* certain insights or concepts through an interactive, explorable explanation. The second is focused on building a visualization system for *exploration* of a specific dataset or topic. In Week 6, you will hand in a project proposal that discusses the motivation for your project; its objectives; data requirements (where do you get it from? does it need extensive processing); visualization design/prototype; and a project schedule. A working prototype is due at the end of Week 12, with the final project (and an oral presentation) due at the end of Week 14. 

## Deadlines
Deadlines are as noted in the course syllabus or on the specific assignment. If something is due on a specific date, you have until midnight on that day to submit the assignment.

## Textbook
In addition to the readings listed below and weekly lab hand-outs, we use this textbook:

- [*Visualization Analysis and Design*](https://www.amazon.com/Visualization-Analysis-Design-AK-Peters/dp/1466508914/) (VAD), Tamara Munzner, CRC Press (2014)

## Software
We will only use open-source software in this course. Most of the course is based on HTML/CSS/JS, but we will also make use of [Vue.js](https://vuejs.org/) from Week 5 onwards. In the first weeks, we will use [CodeSandbox](https://codesandbox.io/) as our code editor. In later weeks, it is recommended to use a code editor installed on your own laptop. If you do not have a preference yet, I suggest you use [Visual Studio Code](https://code.visualstudio.com/). You also need to install [Git](https://git-scm.com/download) (if you're on Mac, I suggest you install [Homebrew](http://brew.sh/) first and install Git with `brew install git`).

## Detailed Outline
In the first half of the course, we focus on getting up to speed on the basic building blocks of data visualization on the web. We do so by recreating visualizations from Du Bois' 1900 Paris Exposition. In the second half of the course, we build on this foundation by moving from individual charts to *systems* of (interactive) visualizations, tentatively using a dataset on HDB Resale Prices (explored more quantitatively in 02.522 Computational Urban Analysis).

### Block 1: Introduction to a 'modern' visualization workflow
1. HTML / SVG ('Drawing')
    - Reading:
        - VAD Chapter 1: What's Vis and Why Do It?
        - [Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) (from `Introduction to HTML overview` to `Document and website structure`)
        - [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) (from `Introduction` to `Paths` + `Texts`)
2. CSS / Git workflow ('Styling') 
    - Reading:
        - VAD Chapter 2: What: Data Abstraction?
        - [Introduction to CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS) (from `Introduction to CSS overview` to `Simple Selectors`)
        - [Ry's Git Tutorial](https://www.amazon.com/Rys-Git-Tutorial-Ryan-Hodson-ebook/dp/B00QFIA5OC) (Chapter 1-4)

### Block 2: Programmatic Visualization
3. Javascript Fundamentals I
    - Reading:
        - VAD Chapter 3: Why: Task Abstraction
        - [Eloquent Javascript](https://eloquentjavascript.net/) (Chapter 1-3)
4. Javascript Fundamentals II ('Interacting')
    - Reading:
        - [Eloquent Javascript](https://eloquentjavascript.net/) (Chapter 4; 13-15)

### Block 3: Reactive Visualization
5. Reactive Programming
    - Reading:
        - VAD Chapter 5: Marks and Channels
        - [A Better Way to Code](https://medium.com/@mbostock/a-better-way-to-code-2b1d2876a3a0)
6. Reactive Programming
    - Reading:
        - VAD Chapter 7: Arrange Tables
        - [Explorable Explanations](http://worrydream.com/ExplorableExplanations/)

7. **BREAK**

### Block 4: Grammar of Graphics
8. A Grammar of Graphics I
    - Reading:
        - Wickham's [A Layered Grammar of Graphics](https://vita.had.co.nz/papers/layered-grammar.html)
        - Wilkinson's Grammar of Graphics. Ch 1 Introduction; Ch 6 Scales; Ch 10 Aesthetics. [Access through SUTD Library](https://link.springer.com/book/10.1007%2F0-387-28695-0).
9. A Grammar of Graphics II (Facets)
    - Reading:
        - VAD Chapter 5 & 7 (Review)
        - VAD Chapter 12: Facets into Multiple Views 

### Block 5: Maps & Visualization Systems
10. Project Studio
11. Filtering & Aggregation
    - Reading:
        - VAD Chapter 11: Manipulate View
        - VAD Chapter 13: Reduce Items and Attributes  
        - VAD Chapter 14: Embed: Focus+Context

### Block 6: Visualization Systems II
12. Cartography
    - Reading:
        - VAD Chapter 8: Arrange Spatial Data
        - VAD Chapter 10: Map Color and Other Channels
        - Making Maps Chapter 8: Map Classification
        - Making Maps Chapter 9: Map Symbolization
13. UI Design for visualization systems
    - Reading:
        - VAD Chapter 15: Analysis Case Studies
14. Final Project Studio