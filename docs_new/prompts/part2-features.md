<goal>

You are an industry-veteran SaaS product designer specializing in hackathon-winning UI/UX. You've built high-touch UIs for FAANG-style companies and understand how to maximize scoring in time-constrained competitions.

I'm competing in a **6.5-hour hackathon** with a **5-person team** and want to win by optimizing for **all scoring categories**.

Your goal is to take the architectural context, hackathon constraints, AI tool strategy, and user inspiration, and turn it into a **Hackathon-Optimized Design Brief** that maximizes our **UX/UI scoring (10%)** while supporting **Feature Coverage (20%)**, **Functionality (20%)**, and **Vibe (20%)** points.

</goal>


<inspirations>

The attached images serve as the user's inspiration (if any). You don't need to take it literally in any way, but let it serve as an understanding of what the user likes aesthetically

</inspirations>


<hackathon-constraints>

**Time Allocation for UI/UX:**
- Total UI development time: 5-6 hours across team
- Demo preparation: 30 minutes for 2-minute demo flow
- Must support **multi-tier feature strategy** (3-4 Tier 1 + 1-2 Tier 2 features)

**Team Structure & AI Tools:**
- **UI Developer:** v0 for rapid component generation + UX Pilot for design optimization + shadcn/ui
- **Product Owner:** UX Pilot for user experience strategy + AI-generated design documentation  
- **All Developers:** Cursor AI for consistent implementation of design system

**Scoring Optimization (30% total points depend on design quality):**
- **UX/UI (10%):** Professional, consistent design with accessibility considerations
- **Vibe (20%):** Creative/innovative approach with "wow factor" element  
- **Feature Coverage (20%):** Design must support showing 4-6 features effectively in 2-minute demo

**Tech Stack Design Constraints:**
- **Frontend:** Next.js v15 App Router + React + TypeScript
- **UI Library:** shadcn/ui components (pre-configured) + Tailwind CSS
- **Responsive:** Must work on demo devices (desktop primary, mobile consideration)
- **Performance:** Loading states crucial for live demo reliability

</hackathon-constraints>


<guidelines>

<aesthetics>

**Hackathon-Winning Aesthetic Strategy:**
Bold simplicity with intuitive navigation creating frictionless demo experiences
Breathable whitespace complemented by strategic color accents for visual hierarchy during live presentation
Strategic negative space calibrated for cognitive breathing room and feature showcase prioritization  
Systematic color theory applied through subtle gradients and purposeful accent placement using Tailwind palette
Typography hierarchy utilizing weight variance and proportional scaling optimized for shadcn/ui components
Visual density optimization balancing feature demonstration with cognitive load management for judges
Motion choreography implementing physics-based transitions for smooth demo flow and spatial continuity
Accessibility-driven contrast ratios paired with intuitive navigation patterns ensuring universal usability (scoring points)
Feedback responsiveness via state transitions communicating system status during live demonstration
Content-first layouts prioritizing feature demonstration over decorative elements for maximum demo impact
**AI-Enhanced Design:** Leverage v0 and UX Pilot for rapid iteration and professional polish within time constraints

</aesthetics>

<demo-flow-considerations>

**2-Minute Demo Constraint:**
- Each feature must be demonstrable in 15-30 seconds
- Navigation between features must be seamless and obvious
- Visual hierarchy must guide demo presenter naturally
- Loading states must be fast and professional
- Error states should be elegant (backup plans needed)

**Feature Showcase Strategy:**
- **Tier 1 Features:** Full functionality with polished UI (must impress judges)
- **Tier 2 Features:** Professional UI mockups with basic functionality (show vision/ambition)
- **Wow Factor Feature:** Visually impressive AI-enhanced element for Vibe points

</demo-flow-considerations>

<ai-acceleration-strategy>

**v0 Rapid Prototyping:**
- Generate initial component layouts and design system
- Create professional UI mockups for Tier 2 features
- Iterate on design concepts quickly

**UX Pilot Optimization:**
- Refine user experience flows for demo effectiveness
- Optimize conversion paths and user journeys
- Ensure accessibility compliance for scoring

**shadcn/ui Professional Polish:**
- Consistent component library usage across all features
- Professional styling with minimal custom CSS
- Built-in responsive design patterns

</ai-acceleration-strategy>

</guidelines>


<context>
<overall-structure>
</overall-structure>

<multi-tier-strategy>
**Tier 1: Must Implement Fully (3-4 features)**
- Requires polished, professional UI with complete functionality
- Zero bugs during demo
- Primary business value demonstration

**Tier 2: Implement Partially (1-2 features)**  
- Professional UI mockups (v0-generated) with basic functionality
- Show ambitious vision for Feature Coverage points
- Support demo narrative flow

**Wow Factor Feature:**
- AI-enhanced visual element for Vibe points
- Creative/innovative UI approach
- Memorable demonstration moment
</multi-tier-strategy>

<tech-stack-integration>
**Next.js App Router + React + TypeScript:**
- Component-based design thinking
- Server-side rendering considerations for performance
- TypeScript props and state management

**shadcn/ui + Tailwind CSS:**
- Pre-built component utilization for speed
- Consistent design system automatically
- Responsive design patterns built-in
- Dark/light mode support if relevant

**PostgreSQL + API Routes:**
- Data visualization considerations
- Loading states for database operations
- Error handling UI patterns
</tech-stack-integration>

</context>


<task>

Your goal is to create a **Hackathon-Optimized Design Brief** that maximizes scoring while being realistic for our 6.5-hour timeline.

Think like a product designer who understands:

**Hackathon-Specific UX Considerations:**
- **Demo Flow Optimization:** Designing for a 2-minute live demonstration
- **Judge Psychology:** What impresses evaluators in time-constrained presentations  
- **Multi-Feature Navigation:** Seamless transitions between 4-6 features during demo
- **Progressive Disclosure:** Strategic feature revelation for maximum impact
- **Error Prevention:** Robust design that won't break during live demo
- **AI Tool Integration:** Leveraging v0, UX Pilot, and Cursor AI for rapid development
- **Scoring Category Alignment:** UX/UI design that supports Vibe, Feature Coverage, and Functionality scoring

**Traditional UX Fundamentals (adapted for hackathon):**
- User goals and tasks - Understanding demo audience (judges) and optimizing for evaluation criteria
- Information architecture - Organizing features for logical demo progression and judge comprehension
- Visual hierarchy - Guiding judge attention to key value propositions and innovations
- Affordances and signifiers - Making interactive elements clearly identifiable during live presentation
- Consistency - Maintaining uniform patterns across features for professional appearance
- Accessibility - Meeting scoring criteria requirements and demonstrating inclusive design
- Feedback - Clear system status communication during live database operations
- Performance - Accounting for demo environment constraints and backup plans
- Responsive design - Ensuring reliability across demo devices
- Microcopy and content strategy - Crafting clear, demo-friendly text and labels
- Aesthetic appeal - Creating memorable visual impact for Vibe scoring points

I need you to take EACH FEATURE from the architectural plan and give me a cohesive **"Hackathon Design Brief"**. Here's the format:

<format>
# {App Name} 
<instructions>
Use the exact app name from the architectural plan
</instructions>

## Design Strategy Overview
**Hackathon Design Goals:**
- Maximize UX/UI scoring (10%) through professional shadcn/ui implementation
- Support Feature Coverage scoring (20%) with clear feature differentiation  
- Enable Vibe scoring (20%) through innovative visual elements and AI enhancement
- Ensure Functionality scoring (20%) with robust, demo-ready UI states

**AI Tool Implementation Plan:**
- **v0 Usage:** {Specific component generation strategy}
- **UX Pilot Optimization:** {User experience enhancement plan}
- **shadcn/ui Integration:** {Component library utilization strategy}

**Demo Flow Design:**
{2-minute demonstration progression through features}

## Design System Foundation
**Color Palette:** {Tailwind-based color strategy for brand consistency and accessibility}
**Typography:** {shadcn/ui typography hierarchy for information architecture}
**Component Standards:** {shadcn/ui component selection and customization approach}
**Responsive Strategy:** {Mobile-first vs desktop-first approach for demo reliability}
**Animation Philosophy:** {Subtle motion design for professional polish without demo distraction}

## Feature Design Specifications

### Tier 1 Features (Full Implementation Required)

#### Feature 1: {Feature Name from Architecture}
**Design Priority:** {High/Critical - must be perfect for demo}

##### Screen 1.1: {Screen Name}
**Demo Timing:** {15-30 seconds allocation}
**Judge Value Proposition:** {What this screen proves to evaluators}

**States:**
- **Default State:** 
  - **Visual Hierarchy:** {How attention flows for demo effectiveness}
  - **shadcn/ui Components:** {Specific components: Button, Card, Input, etc.}
  - **Layout Strategy:** {Grid/flex approach with Tailwind classes}
  - **Color Application:** {Primary/secondary/accent color usage}
  - **Typography:** {Heading levels, body text, microcopy strategy}
  - **Interactive Elements:** {Buttons, forms, navigation with clear affordances}
  - **Responsive Behavior:** {Desktop demo primary, mobile considerations}
  - **AI Enhancement Opportunities:** {Where v0/UX Pilot adds value}

- **Loading State:**
  - **Performance Design:** {Skeleton screens, progress indicators, optimistic UI}
  - **Demo Reliability:** {Backup plans if loading takes too long}
  - **Professional Polish:** {shadcn/ui loading components}

- **Success State:**
  - **Feedback Design:** {Clear success indicators for live demo}
  - **Next Action Guidance:** {How users/judges understand what happened}

- **Error State:**
  - **Graceful Degradation:** {Professional error handling during demo}
  - **Recovery Path:** {Clear error resolution for live presentation}

##### Screen 1.N: {Additional Screens}
{Repeat format above}

#### Feature N: {Additional Tier 1 Features}
{Repeat feature format above}

### Tier 2 Features (Partial Implementation for Feature Coverage)

#### Feature X: {Feature Name from Architecture}  
**Design Priority:** {Medium - impressive mockups with basic functionality}
**v0 Strategy:** {AI-generated UI mockups strategy}
**Demo Purpose:** {Show vision and ambition for Feature Coverage points}

##### Screen X.1: {Screen Name}
**Demo Timing:** {10-15 seconds allocation}
**Implementation Level:** {UI mockup + basic interaction}

**Mockup State:**
- **Visual Concept:** {Professional design showcasing potential}
- **v0 Generation Plan:** {Specific prompts and component needs}
- **Basic Functionality:** {What actually works vs. what's visual only}
- **Judge Impression:** {How this demonstrates technical ambition}

### Wow Factor Feature (AI-Enhanced Innovation for Vibe Points)

#### Feature WOW: {Feature Name from Architecture}
**Design Priority:** {Critical for Vibe scoring - must be memorable}
**AI Innovation Strategy:** {How AI tools create unique visual experience}
**Judge Impact:** {Specific "wow moment" design for maximum impression}

##### Screen WOW.1: {Screen Name}
**Demo Timing:** {30-45 seconds - the money shot}
**Innovation Elements:** {AI-powered features that impress}

**Wow State:**
- **Creative Visual Design:** {Unique approach that stands out}
- **AI Integration:** {Visible AI enhancement for judge recognition}
- **Technical Showcase:** {Demonstration of technical creativity}
- **Professional Execution:** {Polished implementation despite innovation}

</format>

## Responsive Design Strategy
**Desktop Demo Environment:** {Primary design target for presentation}
**Mobile Considerations:** {Backup plans and responsive breakpoints}
**Device Testing Plan:** {Pre-demo device compatibility verification}

## Accessibility Compliance (Scoring Requirement)
**Color Contrast:** {WCAG compliance strategy using Tailwind}
**Keyboard Navigation:** {Tab order and focus management}
**Screen Reader Support:** {Semantic HTML and ARIA labels}
**Testing Approach:** {Quick accessibility verification methods}

## Performance Optimization
**Loading Time Targets:** {Acceptable demo performance thresholds}
**Image Optimization:** {Asset strategy for fast loading}
**Bundle Size Management:** {Code splitting and optimization approach}
**Demo Environment Prep:** {Pre-loading and caching strategy}

## Implementation Coordination
**UI Developer Tasks:** {v0 generation, shadcn/ui implementation, responsive design}
**Product Owner Tasks:** {UX Pilot optimization, design documentation, demo flow}
**Cross-Team Design Standards:** {How other developers maintain design consistency}
**Quality Assurance:** {Design review checkpoints during development}

</task>

<style-guide-integration>

**shadcn/ui Component Priority List:**
{Pre-select high-impact components for rapid development}

**Tailwind CSS Strategy:**
{Custom color palette definition and spacing strategy}

**Design Token System:**
{Consistent spacing, typography, and color application across features}

</style-guide-integration>