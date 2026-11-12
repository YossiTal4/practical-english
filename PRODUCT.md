# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Hebrew-speaking adults who are preparing for work that needs English: reading, writing and speaking at work. They practise in short sessions on a phone or a computer, often on their own.

## Product Purpose
A vocabulary and grammar trainer for English, in Hebrew and English. It has word quizzes by level (A1 to C2), a placement test, career vocabulary, grammar, reading passages, sentence building and dictation. Success means the user feels steady progress, remembers more words, and keeps coming back.

## Positioning
Work-oriented English practice that tracks each user's progress through levels and spaced review, with no account or server: all progress is stored on the user's own device.

## Operating Context
- Short daily sessions on a phone (PWA, installable) or a computer.
- Used alone, with little time, often in a break or while travelling.
- Progress can be moved between devices by a copy-code, not by an account.

## Capabilities and Constraints
- Levels A1 to C2, quizzes, placement test, grammar, reading, sentence building, dictation, favourites, daily goal and streak.
- Plain static site: HTML, CSS and vanilla JavaScript, no backend, deployed as a static zip.
- Offline use through a service worker (network first, cache as fallback).
- All progress lives in the browser (localStorage).
- Text is mostly Hebrew (right to left) with English words in quizzes.

## Brand Commitments
- Name in use: "Practical English".
- The layout must stay right-to-left (RTL) with Hebrew as the main language.

## Evidence on Hand
- Word banks and exercises in the project files (words.js, career*.js, grammar*.js, reading.js, placement-bank.js).
- No testimonials, customers, or benchmark numbers exist. Future work must not invent them.

## Product Principles
- Clear progress: the user always knows where they are and what is next.
- Reading comes first: contrast and text size before decoration.
- Short sessions: the main action is one tap away.
- Hebrew-first, RTL-correct at every step.

## Accessibility & Inclusion
- Text must meet WCAG AA contrast (4.5:1 for body text).
- Headings in a logical order.
- Usable on small phones with one hand.
