---
layout: post
title:  "Enable pinning apps on the taskbar"
date:   2024-06-17 11:40:00 +0500
categories: pull-request
author: Peter Nied
tags:
  - Windows
  - Explorer
  - Registry
---

I had the good fortune to be setting up a new computer last week and as someone that runs pretty like I was very happy to quickly get up and running until I could not pin Slack on the taskbar.  After days of being unable to figure it out, I took a break and came back fresh and here is what I was missing.

### Enable pinning and unpinning on the taskbar
```
reg add HKEY_CURRENT_USER\SOFTWARE\Policies\Microsoft\Windows\Explorer /v NoPinningToTaskbar /t REG_DWORD /d 0x0
```

### How to determine if this fix works for you?
There are many ways to control behavoir on windows, group policy (gpedit) is typically the source of most controls.

I started trouble shooting this issue by checking the UI in this tool.  Rather that looking for any specific setting, I was checking if anything was in a state other than `Not configured`:

```
Local Computer Policy
   Computer Configuration
      Administrative Templates
         Start Menu and Taskbar
   User Configuration
      Administrative Templates
         Start Menu and Taskbar
```

There are many settings here that are not in any order, but at least on my machine I didn't see anything configured.

Configured would mean that the administrator of my machine might not want to allow certain kinds of features and functions.  In this case I'm on my work laptop so while I can do some things I'll have to work with the policies of my IT Department.

Now those items that I looked at are templates, not what the behavoir of the program itself.  

Explorer is the program that creates the desktop, start menu, taskbar and notification, so I'll need to check on any settings it might have configured.

By looking at the registry (regedit) I can see under `HKEY_CURRENT_USER\SOFTWARE\Policies\Microsoft\Windows\Explorer` there are a number of items set.

`NoPinningToTaskbar` seems like a winner - it was set to `0x1` on my machine, I edited the value to `0x0` and then tada - right click on taskbar items and I can pin and unpin.

Here is a command line version that you can use to see if that value is set on your machine before doing any edits.

```
reg query HKEY_CURRENT_USER\SOFTWARE\Policies\Microsoft\Windows\Explorer /v NoPinningToTaskbar

HKEY_CURRENT_USER\SOFTWARE\Policies\Microsoft\Windows\Explorer
    NoPinningToTaskbar    REG_DWORD    0x1
```
