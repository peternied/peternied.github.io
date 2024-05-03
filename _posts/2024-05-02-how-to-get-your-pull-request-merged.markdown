---
layout: post
title:  "How to get your pull request merged"
date:   2024-05-02 10:00:00 +0500
categories: pull-request
---
You have done it, after hours of effort you fixed an ugly bug locally.  You create a pull request on the upstream repository and wait - and wait.  You have hit wall - what can you do to get your pull request merged?

I have found myself in this situations many times, and I expect to find myself in these same stalled scenarios from time to time.  The following is a set of tools that I use to solve common problems when creating pull requests alongside a list strategies that I wish contributors when I reviewed their pull requests.

## Get Engagement with Maintainers
While we would wish otherwise, maintainers are often busy, making you responsible to drive your pull request the attention it needs to be merged.

### Working with the Project
GitHub has many tools in place to help contributors be successful.  By following these hints to contribution you will better understand the expectations you work towards your pull request being merged. 

#### Follow CONTRIBUTING.MD
Contribution guidelines are often documented, by being familiar with this document you will be able to predict requests that maintainers will make of you that will increase the number of update & wait cycles.  For example, in some projects until your commits follow the DCO or you've followed a contributing license agreement maintainers will intentionally not inspect any of your code.

#### Fill out Templates
When you create your pull request there will be a template, typically with a description of the change, validation, and finally tasks with checkboxes. I recommend filling out the template as if for someone unfamiliar with your change.  The extra upfront time to create establish a shared understanding of the problem and solution will reduce update & wait cycles.

#### Find Examples of Similar changes
If the rational for your change is from another project, or it something that has been done in the project you are in before - that is a huge time saver.  Precedent is a great tool because it reused the work others have made to explain the problem and justify the solution.

### Finding the Right Maintainers
When projects are large and expertise is spread over many areas, you will want to find the expert that will be most familiar with the kind of change you are proposing such as performance or reliability.  By inspecting merged pull requests you can find maintainers and contributors that are best suited to get your PR merged.  Make sure to use `@{GITHUB_ID}` to request the specific attention of maintainers.

### Brevity
When maintainers engage with your pull request, they are will read the its description and code.  If reading your pull request is simple and fast - getting your change merged will be considerably easier on everyone.

When including background make sure its done in a way that will allow it to discussed separately from the pull request - an issue is a great place for these details.

## Handling GitHub Action failures
After the pull request is created GitHub Actions will spin up and start verifying your changes.  These checks are added by maintainers to build confidence in changes and the state of the project.  Understanding how these checks work and how to troubleshoot failures can demonstrate the quality of the work you have done.

### My Change Broke Something?
I would recommend using the holistic view shown via the `Checks` tab at the top of your pull request.  This will show the checks that and there current status, red x are a sign that you have more work to do.  By clicking on the name of the failed check you can see the logs and failure message to resolve the issue.

### How Do I Fix it?
When changes are pushed to your fork GitHub re-runs the checks. You can inspect the check and see how it was run, eg `gradlew test`, which can be used locally to reproduce and verify fixes.  Some checks are more complicated, there is a check `bake-time` that will be failed until a set amount of time has passed since the last push to the branch.

### How to Handle Unrelated Failures
Depending on the maturity level of the project you might see failures that you cannot explain - they are completely unrelated to your pull request.  Search the project's issue to see if it is known, and ask for help from the maintainers.  This could look like `@{GITHUB_ID} I am seeing a failure on the link-checker from README.md indicating the help link is broken, I didn't edit this file can you help me resolve this? `.

You can earn accolades from maintainers by opening pull requests that addresses the unrelated failure.  These contributions help reduce the load on maintainers and improve project quality.  If the project is important to you, this could be a pathway to earn maintainership.

## Engage with Pull Request Feedback
You have an unmerged pull request that has been reviewed by maintainer(s).  Maybe there is little vague feedback, maybe a horde of suggestions.  This is where understanding the project expectations and communicating your capabilities are key to getting your change merged. 

### Understand Comments
Read all the commends on your pull request before you start coding up fixes.  Some comments might be conflicting, some comments might be harder to address, or others you might disagree with.  By taking on the most difficult comments sooner it will prevent you from doing work that you would rollback.

### Types of Comments
There are many different styles of review that can be done by maintainers and I've found that the kind of feedback will generally fall into the following areas:

- Informational, these typically don't require any action but help the contributors or maintainers understand something about the change.
- Nitpicks, these are things that would be nice to see, no back and forth is required.
- Required, must be 'resolved' before the PR is merged.
- Scope, these comments challenge the problem or solution design, even after these are resolved more review comments will be added. 

### Handling Disagreement




### Getting Closure



