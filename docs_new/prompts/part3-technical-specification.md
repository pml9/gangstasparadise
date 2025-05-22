<goal>
You're a veteran software engineer (FAANG-level) responsible for writing detailed, **Hackathon-Optimized Technical Specifications** that enable a 5-person team to win a **6.5-hour hackathon** using AI acceleration tools.

Your technical specifications must support **ALL scoring categories** while being implementable within the extreme time constraint:
- **Feature Coverage (20%):** Support 5-7 planned features with clear Tier 1/Tier 2 implementation strategy
- **Functionality (20%):** Zero-bug core features with robust error handling for live demo
- **Vibe (20%):** Technical foundation for AI-enhanced "wow factor" features
- **Documentation (10%):** Implementation-ready specs that enable AI-generated docs
- **Test Coverage (10%):** Strategic backend API testing approach using AI tools
- **Project Board (10%):** Clear task breakdown for parallel development coordination
- **UX/UI (10%):** Technical specs that support the design brief from part2

**AI-Enhanced Development Strategy:**
Your specs must leverage AI tools for maximum acceleration:
- **v0:** Component generation specifications and UI implementation guides
- **UX Pilot:** User experience technical requirements and optimization points
- **Cursor AI:** Code generation-ready technical specifications and architecture
- **Claude 4:** Complex feature logic and integration specifications
- **GPT 4.1:** API implementation guides and database optimization
- **Gemini Pro 2.5:** Innovative feature technical architecture and AI integration specs

**Critical Success Factors:**
- Specifications enable **parallel development** by 5 team members with minimal conflicts
- **2-minute demo flow** technical requirements with seamless feature transitions
- **Railway deployment** specifications for reliable live demonstration
- **Zero authentication complexity** to maximize feature development time
- **shadcn/ui + Tailwind CSS** implementation guides for consistent professional UI
- **PostgreSQL schema** optimized for rapid development and demo reliability
</goal>

<hackathon-context>
**Time Allocation (6.5 hours total):**
- **Requirements analysis & AI tool planning:** 0.5 hours
- **Tier 1 features (3-4 full features with AI):** 3.5 hours  
- **Tier 2 features (1-2 partial with AI assistance):** 1.5 hours
- **Strategic testing (backend API tests only):** 0.5 hours
- **AI-generated documentation:** 0.25 hours
- **AI-enhanced polish & integration:** 0.25 hours
- **Presentation prep:** 30 minutes separate

**Team Structure & AI Assignments:**
- **Product Owner/Scrum Master:** Architecture coordination + AI-generated docs
- **UI Developer:** v0 + UX Pilot + shadcn/ui implementation
- **BE Developer:** Cursor AI + GPT 4.1 for API routes + PostgreSQL
- **Wow Feature Developer:** Gemini Pro 2.5 + Claude 4 for AI-enhanced innovation
- **General Developer:** Multi-AI approach for Tier 2 features + strategic testing
</hackathon-context>

<format>

# {App Name} - Hackathon Technical Specifications

## Architecture Overview
**Hackathon-Optimized Tech Stack:**
- **Frontend:** Next.js v15 App Router + React + TypeScript
- **UI Framework:** shadcn/ui components + Tailwind CSS
- **Backend:** Next.js API routes + TypeScript
- **Database:** PostgreSQL with optimized schema for rapid development
- **Deployment:** Railway (pre-configured for live demo)
- **AI Acceleration:** Integrated development strategy for each team member

**System Architecture Diagram:**
{Mermaid diagram showing all components, API flows, and database relationships}

**Deployment Strategy:**
- **Railway Configuration:** Environment variables, database connection, build optimization
- **Demo Reliability:** Backup plans, error recovery, performance optimization
- **Live Demo Requirements:** Pre-loaded data, optimized queries, fast loading

## Database Schema Design

### Core Tables (Required for Tier 1 Features)
```sql
-- Table 1: {Primary Entity}
CREATE TABLE {table_name} (
  id SERIAL PRIMARY KEY,
  {field_specifications_optimized_for_demo},
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for demo performance
CREATE INDEX idx_{table_name}_{field} ON {table_name}({field});
```

### Supporting Tables (Tier 2 Feature Support)
{Additional tables with clear implementation priority}

**Migration Strategy:**
- **Development Phase:** Single migration file for rapid setup
- **Demo Data:** Seed script with realistic sample data for impressive demonstration
- **Performance:** Optimized indexes for fast demo queries

## Multi-Tier Feature Specifications

### Tier 1 Features (Must Implement Fully - 3-4 features)

#### Feature 1: {Primary Feature Name}
**Implementation Priority:** CRITICAL - Must be flawless for demo
**AI Tool Assignment:** {UI Developer + BE Developer collaboration}
**Demo Timing:** 30 seconds allocation in 2-minute flow

##### Technical Requirements
**Goal:** {Concise business value statement that impresses judges}

**API Design (Next.js App Router):**
```typescript
// app/api/{feature-endpoint}/route.ts
GET /api/{endpoint}
- Purpose: {clear functionality}
- Request: {TypeScript interface}
- Response: {TypeScript interface with success/error states}
- AI Implementation: Cursor AI + GPT 4.1 code generation

POST /api/{endpoint}
- Purpose: {clear functionality}
- Validation: {Zod schema or similar}
- Error Handling: {comprehensive error states for demo reliability}
- AI Implementation: Backend-focused AI assistance
```

**Frontend Implementation (Next.js App Router):**
```typescript
// app/{feature-page}/page.tsx
Page Component Hierarchy:
├── {FeaturePage} (main container)
├── {FeatureHeader} (shadcn/ui components)
├── {FeatureContent} (core functionality display)
├── {FeatureActions} (user interactions)
└── {FeatureLoading} (demo-ready loading states)

State Management:
- React hooks for local state
- API integration with error boundaries
- Loading states for professional demo appearance

AI Implementation Strategy:
- v0 for initial component generation
- UX Pilot for user experience optimization
- Cursor AI for TypeScript implementation
```

**Database Operations:**
```sql
-- Core CRUD operations optimized for demo
SELECT queries: {optimized for fast demo loading}
INSERT operations: {validation strategy}
UPDATE operations: {optimistic UI support}
DELETE strategy: {soft delete for demo safety}
```

**Demo Flow Integration:**
- **Entry Point:** {How judges access this feature during demo}
- **Key Interactions:** {3-4 clicks maximum to show full functionality}
- **Success Indicators:** {Visual feedback for successful operations}
- **Error Recovery:** {Graceful handling if something goes wrong during demo}
- **Transition Out:** {Seamless navigation to next demo feature}

**AI-Enhanced Implementation Guide:**
1. **v0 Component Generation:** {Specific prompts for UI components}
2. **Cursor AI Backend:** {API route implementation strategy}
3. **UX Pilot Optimization:** {User experience enhancement points}
4. **Integration Testing:** {AI-assisted testing approach}

##### Screen-Level Technical Specifications

###### Screen 1.1: {Screen Name from Design Brief}
**Technical Integration with Design Brief:** {Reference specific design specifications}

**Component Architecture:**
```typescript
interface {ScreenName}Props {
  // TypeScript interface aligned with design requirements
}

Component Structure:
├── shadcn/ui Button components (aligned with design system)
├── Form handling with react-hook-form
├── Loading states (skeleton components from shadcn/ui)
├── Error boundaries for demo reliability
└── Success feedback (toast notifications)
```

**API Integration:**
- **Endpoint Usage:** {Which API routes this screen calls}
- **Data Flow:** {Request → Processing → Response → UI Update}
- **Error Handling:** {User-friendly error messages for demo}
- **Performance:** {Optimistic updates, caching strategy}

**State Management:**
```typescript
// React state structure for this screen
interface {ScreenName}State {
  loading: boolean
  data: {DataType}[]
  error: string | null
  // Additional state as needed
}
```

#### Feature 2-4: {Additional Tier 1 Features}
{Repeat the detailed specification format above}

### Tier 2 Features (Partial Implementation - 1-2 features)

#### Feature X: {Tier 2 Feature Name}
**Implementation Priority:** MEDIUM - Show vision and ambition
**AI Tool Assignment:** General Developer + AI acceleration
**Demo Timing:** 15 seconds allocation for impressive vision showcase

##### Strategic Implementation Approach
**Goal:** {Demonstrate technical ambition for Feature Coverage points}

**AI-Generated UI Strategy:**
```typescript
// v0-generated components with basic functionality
Components Needed:
├── {FeatureMockup} (professional-looking interface)
├── {BasicFunctionality} (1-2 working interactions)
├── {VisionShowcase} (demonstrates full potential)
└── {FutureState} (impressive mockup of complete feature)
```

**Minimal Backend Support:**
```typescript
// app/api/{tier2-endpoint}/route.ts
GET /api/{endpoint} - Basic data retrieval
// Focus on impressive frontend with minimal backend complexity
```

**Demo Integration:**
- **Quick Showcase:** {How to demonstrate this in 15 seconds}
- **Key Message:** {What this feature tells judges about team ambition}
- **Technical Soundness:** {Ensure it doesn't break during demo}

### Wow Factor Feature (AI-Enhanced Innovation)

#### Feature WOW: {AI-Enhanced Feature Name}
**Implementation Priority:** CRITICAL for Vibe scoring (20% of total points)
**AI Tool Assignment:** Wow Feature Developer + Gemini Pro 2.5 + Claude 4
**Demo Timing:** 30-45 seconds - The centerpiece moment

##### Innovation Technical Architecture
**Goal:** {Create memorable "wow factor" that impresses judges with AI integration}

**AI Integration Strategy:**
```typescript
// Innovative AI-powered functionality
AI Enhancement Approach:
├── {AIComponent} (visible AI functionality for judges)
├── {InnovativeUI} (creative interface that stands out)
├── {TechnicalShowcase} (demonstrates technical creativity)
└── {DemoImpact} (memorable moment in presentation)
```

**Technical Innovation Points:**
- **AI API Integration:** {How AI services enhance the feature}
- **Creative Implementation:** {Unique approach that differentiates from other teams}
- **Technical Complexity:** {Sophisticated enough to impress technical judges}
- **User Experience:** {Innovative but intuitive interaction design}

**Demo Optimization:**
- **Wow Moment Setup:** {How to build anticipation during demo}
- **Key Demonstration:** {The impressive AI functionality showcase}
- **Judge Impact:** {Why this will be memorable and score high on Vibe}

## Strategic Testing Approach (10% of total score)

**AI-Assisted Backend Testing Strategy:**
Focus ONLY on backend API tests for maximum ROI within time constraints.

### Test Coverage Plan
```typescript
// Target: 2-3 core API endpoints for coverage statistics
Test Priorities:
1. Core business logic API routes (Tier 1 features)
2. Database operations (CRUD functionality)
3. Error handling scenarios (demo reliability)

AI Implementation:
- Jest + Supertest for API testing
- AI-generated test cases using GPT 4.1
- Coverage reporting for scoring demonstration
```

### Test Implementation Guide
```typescript
// Example test structure (AI-generated)
describe('API Route: /api/{core-feature}', () => {
  test('should handle successful requests')
  test('should validate input data')
  test('should handle database errors gracefully')
  test('should return proper error responses')
})
```

**Skip Complex Testing:**
- No frontend component testing (too time-intensive)
- Maybe E2E testing (focus on backend coverage)
- No integration testing beyond API routes

## Performance Optimization for Live Demo

### Critical Performance Requirements
**Loading Time Targets:**
- Initial page load: <2 seconds
- API responses: <500ms
- Feature navigation: <1 second
- Database queries: optimized for demo data volume

### Optimization Strategy
```typescript
// Next.js App Router optimization
Performance Techniques:
├── API route optimization (simple queries, proper indexing)
├── Component lazy loading (only if needed for demo flow)
├── Image optimization (minimal images, optimized sizes)
├── Database query optimization (explain plans for demo data)
└── Railway deployment optimization (environment variables, build settings)
```

## Team Coordination Technical Specifications

### Parallel Development Strategy
**Conflict Prevention:**
```typescript
// Clear module boundaries for parallel development
Team Member Assignments:
├── UI Developer: app/{feature}/page.tsx files + shadcn/ui components
├── BE Developer: app/api/{feature}/route.ts files + database schema
├── Wow Feature Developer: AI integration modules + innovative components
├── General Developer: Tier 2 features + utility functions + testing
└── Product Owner: Documentation generation + deployment coordination
```


### Demo Reliability Checklist
- [ ] All Tier 1 features working on deployed application
- [ ] Demo data populated and realistic
- [ ] Error handling graceful across all features
- [ ] Performance optimized for live demonstration
- [ ] Backup plans for potential demo issues
- [ ] Navigation flow tested for 2-minute presentation

### Pre-Demo Technical Verification
```bash
# Technical checklist for demo readiness
1. All API routes responding correctly
2. Database operations working reliably
3. UI components rendering properly across features
4. Demo flow navigation smooth and intuitive
5. Performance meeting target metrics
6. Error states handled gracefully
```

</format>

<implementation-coordination>

**Cross-Reference Integration:**
Your technical specifications must align with:
- **Part 1 Architect:** Feature prioritization, team coordination, AI tool assignments
- **Part 2 Design Brief:** UI component specifications, user experience flows, demo navigation
- **Scoring Optimization:** Technical foundation for all scoring categories

**AI Tool Integration Points:**
- **v0 Integration:** Component generation specifications with technical requirements
- **UX Pilot Integration:** Technical UX optimization points and implementation guides
- **Cursor AI Integration:** Code generation-ready specifications and architecture patterns
- **Multi-AI Coordination:** How different AI tools work together for maximum acceleration

**Quality Assurance Integration:**
- **Design Consistency:** Technical specs support consistent shadcn/ui implementation
- **Demo Flow Support:** Technical architecture enables smooth 2-minute demonstration
- **Error Prevention:** Robust technical specifications prevent demo-breaking issues
- **Performance Reliability:** Technical optimizations ensure fast, reliable live demo

</implementation-coordination>

<context>

<features-list>
</features-list>

</context>