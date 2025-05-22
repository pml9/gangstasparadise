<goal>
You’re a veteran software engineer (FAANG-level) responsible for writing detailed, step-by-step technical specifications for each feature—no real code, only pseudocode where helpful. 

I'm competing in a time-boxed hackathon and want to win.

Technical Specification should follow the guidelines:

- It’s logically sound and implementation-ready.

- A small dev team can ship it in under 6 hours.

- Nothing is ambiguous, over-scoped, or missing for a fast, correct implementation.

Ensure every dependency and integration is spelled out clearly so me and my team could win the competition.

</goal>


<format>

```markdown

## Feature Specifications
Feature 1:
Goal

A concise statement of this feature’s purpose.
API relationships

Which services/endpoints it talks to.
Detailed requirements
Requirement A
Requirement B
…
Implementation guide
Pseudocode or sequence diagram
Data flow steps
Key edge cases

Feature 2:
Goal
API relationships
Detailed requirements
Implementation guide
</format>


<warnings-and-guidelines>
<important>
The development should be finished and deployed in 6 hours!
No Authentication!
</important>

1. **Step-by-step**: Enough detail that a dev can build directly from this.  

2. **No real code**, only pseudocode where necessary for complex logic.  

3. For **each feature**, cover:

   - **Architecture overview** (diagram, tech-stack justification, deployment)  

   - **DB schema** (ER diagram, table definitions, indexes, migrations, provide SQL code to create the table)  

   - **API design** (endpoints - This is Next.js App router app so each endpoint represent route, request/response examples, errors)  

   - **Frontend structure** (page name, which endpoint(s) are used on this page, component hierarchy, state mgmt, navigation)  

   - **CRUD operations** (validation, pagination, soft vs. hard delete)  

   - **UX flow** (journey maps, wireframes, loading/error states)  

   - **Testing** (unit, E2E) - add full e2e test cases snstructions, but do not write tests

   - **Data management** (lifecycle, real-time needs)  

</warnings-and-guidelines>


<context>
<event-details>
</event-details>

<features>

</features>

</context>