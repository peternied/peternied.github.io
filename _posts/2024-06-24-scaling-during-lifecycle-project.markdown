---
layout: post
title:  "Scaling during the Lifecycle of Project"
date:   2024-06-35 10:20:00 +0500
categories: pull-request
author: Peter Nied
tags:
  - Open Source
  - Code Collaboration
  - Software Development
  - Community Engagement
---

You come across a problem that warrents putting something in source control - what do you need to do to make a project scale well?

## Stages of scale

## Small

### Python CLI tool (Single Author)

I was trying to figure out how to determine different rates contribution for the OpenSearch project, contribution-rate [^1].  Its a big project and lots of different people could be interestd in data about who is contributing and what is impacting contributions.  After writing up initial queries I decided to move towards an actual code base.

Highlights:
- ~1000 lines of code
- Readme
- No reviews
- No tests
- Workflow that would run daily producing reports

*What do I think of this?*

I feel pretty good about this project, it had a purpose fulfilled it, and turns out wasn't as useful as I thought [^2].  While I don't think there are large obstacles for contribution, it never got any.  I never lost time supporting contribution or dealing with contributions

### GitHub Action (2 Contributors)

I quickly merged a contribution to a repository that wasn't about code, but was about process.  I didn't give the community much time to understand and provide feedback on the contribution.  So I made a GHA that enforced a 'bake-time' requirement on changes going into the repro [^3].  This change specifically went in front of my fellow maintainers so they had opinions on how it worked and looked.  I ended up publishing it onto the GitHub marketplace where it sits largely unused.  However, a interested user (@ngehrsitz)[https://github.com/ngehrsitz] found this action and built on it providing several contributions that I released.


Highlights:
- ~140 lines of code 
- 2 Contribution
- Readme
- Consumer reviewers
- Published on GitHub marketplace

*What do I think of this?*

I was totally shocked to get a contributor, this project wasn't expected to do anything but solve my immediate problem.  Also I had grand plans to improve the project but lost my own motivation to deliver on them.  I would say that the simplicity of the project was what made it possible to contribute and also why my follow up effort fizzled out - the problem was solved.  I spent alot of time on this project that never provided value to it.

## Medium

### Jenkins Infrastructure 
https://github.com/opensearch-project/opensearch-ci

### Migrations
https://github.com/opensearch-project/opensearch-migrations

## Large

### Security Plugin
https://github.com/opensearch-project/security

### OpenSearch
https://github.com/opensearch-project/OpenSearch



- [^1]: Contribution Rate project https://github.com/peternied/contribution-rate
- [^2]: Future blog post, when data doesn't matter https://github.com/peternied/peternied.github.io/issues/10
- [^3]: GitHub Action, Bake time https://github.com/peternied/bake-time