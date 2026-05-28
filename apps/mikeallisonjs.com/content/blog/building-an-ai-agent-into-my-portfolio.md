---
slug: building-an-ai-agent-into-my-portfolio
title: Building an AI agent into my portfolio site
description: Why I replaced the usual "About me" wall of text with a streaming AI agent that answers questions about my work — and how it's wired with the Vercel AI SDK, tool calls, and a tiny content corpus.
date: 2026-05-24
tags: [ai, nextjs, vercel-ai-sdk, typescript]
---

# Building an AI agent into my portfolio site

Most portfolio sites bury the interesting parts under a wall of text. I wanted
mine to answer the question a visitor actually has — *"can this person build the
thing I need?"* — so I put a small AI agent on the homepage and let people ask.

## The shape of it

The agent is a streaming chat endpoint built on the [Vercel AI
SDK](https://sdk.vercel.ai). It runs `streamText` with a handful of tools and
streams text deltas, tool calls, and token usage back to the browser over
server-sent events. The whole thing is grounded in a tiny content corpus —
markdown files for each job, a typed list of projects, and a resume — so the
model answers from facts instead of hallucinating a career.

## Grounding beats prompting

The single most important decision was **tools over a giant system prompt**.
Rather than stuffing my entire history into the context window, the agent calls
small functions:

- `list_projects` / `read_project` — the portfolio, by slug
- `list_jobs` / `read_job` — employment history from markdown
- `read_resume` — the top-level CV
- `search` — full-text ranking across all of the above

The model decides what it needs, fetches it, and answers. That keeps responses
accurate, keeps the prompt small, and means I update content by editing a
markdown file — not by re-engineering a prompt.

## Guardrails

A public, model-backed endpoint is a small attack surface, so it has limits:
per-IP rate limiting, a cap on conversation turns and tool steps, and a hard
input length. The system prompt keeps the agent on-topic — career, projects,
skills, contact — and tells it to refer to me in the third person so it reads
like a knowledgeable assistant rather than me pretending to be a chatbot.

## What I'd tell you if you asked the agent

I'm a staff/principal engineer with 25+ years of full-stack experience —
TypeScript, Next.js, React, GraphQL, and infrastructure on AWS and Vercel — and
I've spent the last few years on AI-augmented product surfaces like this one.
If that's useful to you, the agent on the [homepage](/) knows the details, or
you can just [email me](mailto:dj.mikeallison@gmail.com).
