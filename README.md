# Transport logistics

## Table of contents

- [General description](#monorepository-general-desciption)
  - [Table of contents](#table-of-contents)
    - [Other topics](#other-topics)
  - [Development process](#development-process)
    - [Common conventions](#common-conventions)
    - [Code style](#code-style)
    - [Scripts](#scripts)
    - [Git conventions](#git-conventions)
    - [Documentation](#documentation)
  - [Project structure](#project-structure)

## General Description

Logistics comprises all tasks for planning, controlling, providing and optimizing processes along the value chain. Transport logistics comprises the complete approach to all processes in logistics that are necessary to conduct a transport.

It deals with the interaction of:
- Administrative variables such as personnel management, vehicle management
- Planning variables, e.g. transport control, transport strategies
- Operational variables such as transport technology, data transmission technology

### Tasks and objectives of transport logistics

The task of transport logistics is to distribute and provide goods at the lowest possible cost in the production process.
The goal is to optimize transports in terms of loading, unloading, capacity utilization, handover and identification.
It comprises the complete consideration of all processes in logistics that are necessary for a transport. This includes the consideration of two networks:
- Supply network
- Distribution network
 
A supplier network describes which types of suppliers play a role in the supply process. A distribution network describes the spatial structure in which the distribution processes are implemented.

## Development Process

### Common conventions

- Any route is followed after /api for the purpose of CloudWatch work(for metrics in future)
- Use dashes in API routes instead of camel case or underscores.
- Use kebab case for naming dirs, files, object or class fields, columns in db queries.(e.g: naming-conventions)
- Use kebab case for naming schemas, tables or columns in migrations or seeds.
- Use only arrow functions except for class methods because of not used prototype context.
- Do not run any db queries inside controllers, call the repos' methods only there.
- try..catch is required at least on controller level. Surround with try..catch any transaction operations inside repos.
- Use async-await over promises or generators
- Prefer functional style over loops (except in performance-critical code after benchmarking and verifying that
  the function invocation is the bottleneck in your case).
- All entity-domain-scoped entities should be cached with the name of its domain as cache-key.
  The same pattern should be preferred whenever something that manages domain-specific data is created.
- Remember we are using CommonJS modules. This has some implications:

  - there are directory imports with `index.js` files (in other words, all dependancies are in `index.js` file);
  - you do not need to specify file extensions in imports unlike CommonJS, only its type: module, controller, service, entity, enum, constant.

- Prefer simple structure of files which aggregate their dependencies and what they provide as an export (this does apply to everything in `src/modules/` folder).
- Can use custom error instances, or handle errors with filter `HttpExceptionFilter`.

  ...to be continued.

### Code style

We use Prettier and ESLint to format and check code. It should cover 90% of cases. If in doubt, just ask others. Use the Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

### Scripts

- `test:all-packages` - runs tests for listed repositories
- `new-version` - update changelog for monorepository and each consistent package
- `diff` - message defference between packages updates 
- `format` - applies prettier formater
- `lint` - checks lint rules which are set in project

### Git conventions

> **Note**
>
> Proper branch names and commit messages are required!

Branch names should be prefixed with `tech/`, `feat/` or `bugfix/` followed by ticket number from Jira,
dash and a few descriptive words.
Example: `feat/TRL-999-order-creation`

Commit messages must follow the following format, we use git conventions:

```text
[Ticket number] [message]

[Optional body]
```

Example: `feat/TRL-999-Add-order-creation`.  
Long example:

```text
feat/TRL-999-Add-order-creation

Add order creation and finish place new order screen
This commit finishes order creation flow and gives users the ability to
place new orders and create customers and job sites.

* Fix creation of credit cards on order page
* Fix typings of order form
```

Another example:

```text
chore/TRL-111-Support-deleting-users

* Integrate with backend user management API
* Remove user profile on deletion
```

The message should be capped at 75 characters and must be in indefinite tense. It should read as _'\[If accepted, this commit will\] add order creation'_.

If provided, the body might include a detailed header, long description and a list of changes with bullet points, all of which are optional (you can use `*` in Markdown).  
Please, DO NOT use `fixes`, `applied fixes` and other meaningless messages. If you apply fixes in a batch, use
`git commit --amend` to prevent creating meaningless commits.

PR titles should follow the same format as commit messages. Just so that you know, if you submit a PR with one commit only, GitHub assigns the title of the commit to the PR and saves you quite a bit of typing.

### Documentation

At this moment, single representation of API documentation based on `swagger-cli` and separated openapi files. That is why keeping this up to date is all developers duty so should be followed until we move to more advanced documentation tool.

Therefore in case of CRUD updates of API - decorators should be applied to fns, it is mandatory and must be delivered with correspondant PR.

## Project structure

- `packages/common` - the library is mostly written according to the rules and conventions of the functional paradigm using algebraic data types, includes commonly used functions and its safe variants
- `packages/scheduler` - the module that is responsible for sending messages of various types to the queue of events and reminders, as well as letters for the selected subject area
- `packages/server` - the server that handles requests, domain modeling located here also implemented part of the business logic of the selected subject area, namely cargo transportation
