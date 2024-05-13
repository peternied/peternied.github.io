---
layout: post
title:  "How to get your pull request merged"
date:   2024-05-13 17:00:00 +0500
categories: pull-request
tags:
  - GitHub
  - Open Source
  - Pull Request
  - Code Collaboration
  - Software Development
  - Contribution Guidelines
  - Community Engagement
  - DevOps
  - Code Review
  - Project Management
---
You have done it, after hours of effort you fixed an ugly bug locally. You create a pull request on the upstream repository and wait - and wait. You have hit a wall - what can you do to get your pull request merged?

I have found myself in this situation - stalled from time to time. The following is a set of tools that I use to solve problems when creating pull requests alongside a list of strategies that can be used to mitigate these issues to get things done. This blog was created in parallel to my recent presentation during OpenSearch Con EU 2024[^1].

## Create Connections
While we would wish otherwise, maintainers are often busy, making you responsible to drive your pull request the attention it needs to be merged.

### Brevity
When maintainers engage with your pull request, they will read its description and code. If reading your pull request is simple and fast - getting your change merged will be considerably easier for everyone.

When including background, make sure it's done in a way that will allow it to be discussed separately from the pull request - an issue is a great place for these details.

### Working with the Project
GitHub has many tools in place to help contributors be successful. By following these hints to contribution, you will better understand the expectations you work towards your pull request being merged.

#### Follow CONTRIBUTING.MD
Contribution guidelines are often documented; by being familiar with this document, you will be able to predict requests that maintainers will make of you that will increase the number of update & wait cycles. For example, in some projects, until your commits follow the DCO or you've followed a contributing license agreement, maintainers will intentionally not inspect any of your code.

#### Fill out Templates
When you create your pull request, there will be a template, typically with a description of the change, validation, and finally tasks with checkboxes. I recommend filling out the template as if for someone unfamiliar with your change. The extra upfront time to create and establish a shared understanding of the problem and solution will reduce update & wait cycles.

#### Find Examples of Similar Changes
If the rationale for your change is from another project, or it is something that has been done in the project you are in before - that is a huge time saver. Precedent is a great tool because it reuses the work others have made to explain the problem and justify the solution.

### Finding the Right Maintainers
When projects are large and expertise is spread over many areas, you will want to find the expert that will be most familiar with the kind of change you are proposing, such as performance or reliability. By inspecting merged pull requests, you can find maintainers and contributors that are best suited to get your PR merged. Make sure to use `@{GITHUB_ID}` to request the specific attention of maintainers.

## Get to Green
After the pull request is created, GitHub Actions will spin up and start verifying your changes. These checks are added by maintainers to build confidence in changes and the state of the project. Understanding how these checks work and how to troubleshoot failures can demonstrate the quality of the work you have done.

### My Change Broke Something?
I would recommend using the holistic view shown via the `Checks` tab at the top of your pull request. This will show the checks and their current status; red x's are a sign that you have more work to do. By clicking on the name of the failed check, you can see the logs and failure messages to resolve the issue.

### How Do I Fix It?
When changes are pushed to your fork, GitHub re-runs the checks. You can inspect the check and see how it was run, e.g., `gradlew test`, which can be used locally to reproduce and verify fixes. Some checks are more complicated, there is a check `bake-time` that will fail until a set amount of time has passed since the last push to the branch.

### How to Handle Unrelated Failures
Depending on the maturity level of the project, you might see failures that you cannot explain - they are completely unrelated to your pull request. Search the project's issues to see if it is known, and ask for help from the maintainers. This could look like `@{GITHUB_ID} I am seeing a failure on the link-checker from README.md indicating the help link is broken, I didn't edit this file, can you help me resolve this? `.

You can earn accolades from maintainers by opening pull requests that address the unrelated failure. These contributions help reduce the load on maintainers and improve project quality. If the project is important to you, this could be a pathway to earn maintainership[^2].

## Create Consensus
You have an unmerged pull request that has been reviewed by maintainer(s). Maybe there is little vague feedback, maybe a horde of suggestions. This is where understanding the project expectations and communicating your capabilities are key to getting your change merged.

### Understand Comments
Read all the comments on your pull request before you start coding up fixes. Some comments might be conflicting, some comments might be harder to address, or others you might disagree with. By taking on the most difficult comments sooner, it will prevent you from doing work that you would rollback.

### Types of Comments
There are many different styles of review that can be done by maintainers and contributors. I've found that the kind of feedback will generally fall into the following areas:

- Informational, these typically don't require any action but help the contributors or maintainers understand an aspect of the change.
- Nitpicks, these are things that would be nice to see, no back and forth is required.
- Required, must be 'resolved' before the PR is merged.
- Scope, these comments challenge the problem or solution design, even after these are resolved more review comments will be added.

Focusing on comments that are more difficult will give you a better handle on how much effort it will take to get the pull request merged

### Handling Disagreement
There are two sides to disagreements; what maintainers are asking for the project and what you are able to do. By understanding the intent of the request, it will help put you in a position to accept or decline to make the requested change. All feedback can be negotiated, and it's best to come from a mutually agreed upon position to tackle the area that is disagreed with. Some helpful middle ground options could be; documenting the feedback with an issue for future follow-up, removing the area of the concern from the pull request, or approaching the solution from another direction.

## Closure
After navigating the pull request, review, and merge cycle you are equipped with more than just tools; you have developed a mindset to effectively collaborate in open-source projects. Reflect on the interactions and feedback from your pull requests, whether merged or not, as a stepping stone to becoming a proficient contributor. Each contribution is an opportunity for growth not only for your software skills but for the project as a whole.

Thank you for your dedication and energy. Through our collective efforts, we continue to shape the future of the open-source community.

## Resources
[^1]: How to get your pull request merged [youtube.com](https://www.youtube.com/watch?v=nq4RhrbH3sM)
[^2]: How to become an OpenSearch Project repo maintainer [youtube.com](https://www.youtube.com/watch?v=UsN7YkCCw-c)
