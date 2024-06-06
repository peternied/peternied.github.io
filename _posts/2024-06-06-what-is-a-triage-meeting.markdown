---
layout: post
title:  "What is a triage meeting"
date:   2024-05-13 17:00:00 +0500
categories: pull-request
author: Peter Nied
tags:
  - GitHub
  - Open Source
  - Software Development
  - Community Engagement
  - Triage
  - Bugs
---

*This post is been inspried by the launch of the OpenSearch - Catch All - Triage Meeting[^1], which launched today*

Triaging is about determing the priority of treatment of problems.  In the open-source world this manifest where problems are issus and treatement are pull requests that target those issues. As projects scale up with more contributors and more code - there will be more issues.  By focusing better on the most important issues it will make your project more health and engage your userbase. 

So nice project management vibes are good, but practically speaking why triage issues?

### Finding security issues
Its bad enough when log4j has a big issue and you need to release an update for a dependency, but its a whole order of magnitute difference when you found a security issue in your code.  There have been a couple of issues reported to OpenSearch where the author said "I can do X, when Y says this shouldn't be possible, seems like a security issue?" - and they were right.  Every day that issue sat unexamined was time that a bad actor could have found it, figured out the vunerabilty, and exploited it - scary for you and your customers.

### Finding issues that below elsewhere
Sometimes an issue is created in your repository when its actually a problem with a dependeny or a project with a similiar name.  While not as critical to your project, it might be helpful to at least let them know you aren't responsible for that and they should keep trying to find the right person who can help them.

### Get more contributions
Typically when someone takes the time to create an issue they care about what isn't working.  Motivated individuals are the best contributors, they are already familiar with the project and maybe with a little direction can help improve it.  One of my peers @dblock has taught me the value of asking simple prompts - "Thanks for filing this bug, could you create a pull request with a (failing) test case for this issue?" or "Thanks for the suggestion, how about making a draft pull request of how you'd like to change the behavoir?"  On my personal projects this works nearly 99% of the time - great use of my time.

### Empower the world
When a person on the internet takes the time to say something isn't working or couple be improved.  They could have done something else, instead they choose to try to help themselves and others by contributing an issue.  Encouraging behavoir with simple 'Thanks for writing this up' can bring positive effects to them.  By showing gradiutte it also creates positive effects on yourself too.

## But you said 'triage meeting'
So if we believe that there are good things to offer from triaging issues, why make a meeting?  Couldn't you do this on your own - certainly!  However, by making a meeting you can pulling in experts while creating a place for expression for your contributors.  By having a structure with a time and place - its easier to maintain, creates oppertunities for improvement, and cohesion among team members.

If you are willing to go a little further you can even host it in the public so anyone can join and publish it in your project like I have done in OpenSearch [^3].  What better way to make individuals that feel like outsiders become insiders in your project.

## Resources
[^1]: OpenSearch - Catch All - Triage Meeting [meetup.com](https://www.meetup.com/opensearch/events/301431318/)
[^2]: @dblock aka Daniel (dB.) Doubrovkine [github.com](https://github.com/dblock)
[^3]: OpenSearch Triaging Meeting [github.com](https://github.com/opensearch-project/OpenSearch/blob/main/TRIAGING.md)