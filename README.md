# Experiment: Data Adapters, Providers, and Stylistic Themes

This is an experiment to try out a pattern we’ve been talking about that will allow for themes to be created without caring where the data comes from.

The general idea is this:

1. Define generic data schemas for common data types (e.g. docs, blog posts)
2. Write adapters that convert data from one shape (e.g. Markdown nodes) to the generic data schema
3. Write “provider” components that query for the normalized data and provide it down, unchanged, to presentational components
4. Write presentational components that are blissfully unaware of data that doesn’t come in from props.

## Why this matters

A major goal of Gatsby themes is what Chris Biscardi described as “progressive disclosure of complexity”. This means that we should layer abstractions in such a way that the base use case is dead simple (e.g. the entire site is just Markdown files in a folder with a `gatsby-config.js`), but the developer can go progressively deeper:

- Start by using component shadowing to change up a presentational component
- Go deeper by shadowing the provider to add or modify the underlying data
- Go really deep by writing/extending adapters

## This is only an experiment

This is really exciting (to me) but should be considered extremely pre-alpha and 100% not ready for any kind of production use cases. This is closer to scratch-pad notes than production-ready code.
