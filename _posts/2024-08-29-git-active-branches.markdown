---
layout: post
title:  "Seeing active branches in git"
date:   2024-08-29 11:30:00 +0500
categories: pull-request
author: Peter Nied
tags:
  - Git
  - Version Control
  - Git Tips
  - Command Line
  - Git Aliases
  - Development Tools
  - Code Management
  - Git Log
  - Productivity
  - Software Development
---

Ever come back to a codebase you are working on and wonder what was I up to?  Earlier this week I finally got to pick up codebase after a two week absence and I had no idea where my latest changes were.

Previously I've talked about git lol[^1] being useful for case like this, but this codebase is different - in this codebase we rarely squash commits, instead forked branches are merged.  So this means that while I've got great granularity on the changes, its hard identify my work in progress from everyone elses work.

### SO Question
https://stackoverflow.com/questions/5188320/how-can-i-get-a-list-of-git-branches-ordered-by-most-recent-commit

### TODO: Config file?
```
alias.active-branches-inner=for-each-ref --sort=-committerdate --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(color:red)%(objectname:short)%(color:reset) - %(contents:subject) - %(authorname) (%(color:green)%(committerdate:relative)%(color:reset))' --color
alias.active-branches-all=active-branches-inner refs/remotes
alias.active-branches=active-branches-inner refs/heads
```


## Resources
[^1]: Blogpost on [git lol]()./2023-05-29-git-log)
