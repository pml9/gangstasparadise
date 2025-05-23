
### Primary Colors
Primary Brand - #1C43C9 (Blue Default - shadcn/ui primary override)
Primary Neutral - #FFFFFF (Background and clean surfaces)

### Secondary Colors  
Secondary Accent - #1425BA (Blue Dark - Feature differentiation and hover states)
Secondary Background - #FAFAFA (Card backgrounds and subtle highlights)

### Functional Colors (shadcn/ui integrated)
Success - #00C246 (Default Green - Success states and confirmations - maps to shadcn/ui success)
Warning - #F79009 (Default Amber - Warnings and attention - maps to shadcn/ui warning)  
Error - #D2373F (Light Red - Errors and destructive actions - maps to shadcn/ui destructive)
Muted - #636363 (Neutral 600 - Secondary text and disabled states - maps to shadcn/ui muted)

### Demo-Specific Colors
Tier1 Indicator - #E8ECFA (Very Light Blue - Subtle accent for fully-implemented features)
Tier2 Indicator - #FE8AEA (Light Red tint - Subtle accent for mockup features)
Wow Factor - #FF7009 (Default Amber - Special accent for impressive AI-enhanced elements)

### Extended Palette (Based on Enterprise Needs)
**Background Variations:**
- Background Base: #FFFFFF
- Background Subtle: #FAFAFA (25 shade)
- Background Muted: #F2F2F2 (50 shade)
- Background Elevated: #E6E6E6 (100 shade)

**Text Hierarchy:**
- Text Primary: #000000 (Black)
- Text Secondary: #636363 (600 shade)
- Text Muted: #9B9B9B (400 shade)
- Text Disabled: #BBBBBB (300 shade)

**Border System:**
- Border Light: #D4D4D4 (200 shade)
- Border Default: #9B9B9B (400 shade)
- Border Strong: #636363 (600 shade)

## Typography (shadcn/ui optimized)
**Font Strategy:** Leverage shadcn/ui typography scale with minimal customization

### Font Family
Primary: var(--font-sans) (shadcn/ui default)
Monospace: var(--font-mono) (For code displays if needed)

### shadcn/ui Typography Scale Integration
**Headings:**
- H1: shadcn/ui "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
- H2: shadcn/ui "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
- H3: shadcn/ui "scroll-m-20 text-2xl font-semibold tracking-tight"

**Body Text:**
- Large: shadcn/ui "text-lg text-muted-foreground"
- Default: shadcn/ui "leading-7 [&:not(:first-child)]:mt-6"
- Small: shadcn/ui "text-sm text-muted-foreground"

**Utility Text:**
- Caption: shadcn/ui "text-xs text-muted-foreground"
- Code: shadcn/ui "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"

## Component Styling (shadcn/ui foundation)
**Strategy:** 80% shadcn/ui defaults + 20% strategic customization for brand alignment

### Buttons (shadcn/ui variants)
**Primary Button:** 
- Component: Button variant="default"
- Customization: Custom brand color (#1C43C9) via CSS variables
- Usage: Tier 1 feature primary actions (Submit Sick Leave, Upload Receipt, Submit Maintenance)

**Secondary Button:**
- Component: Button variant="outline" 
- Usage: Tier 1 feature secondary actions (Cancel, Edit, View Details)

**Ghost Button:**
- Component: Button variant="ghost"
- Usage: Tier 2 feature actions and navigation (Travel Booking, Asset Management)

**Wow Factor Button:**
- Component: Button variant="default" + custom gradient (#FF7009 to #1C43C9)
- Usage: AI-enhanced feature call-to-action (Ask AI Assistant, Smart Suggestions)

### Cards (shadcn/ui foundation)
**Standard Card:**
- Component: Card with CardHeader, CardContent, CardFooter
- Customization: Subtle shadow enhancement for demo visibility
- Usage: Tier 1 feature containers (Sick Leave Form, Expense Report, Maintenance Ticket)

**Mockup Card:**
- Component: Card with reduced opacity (opacity-70) and muted border
- Usage: Tier 2 feature mockups (Travel Booking UI, Asset Booking interface)

**Hero Card:**
- Component: Card with enhanced styling and subtle animation (hover:scale-105 transition)
- Usage: AI Assistant feature showcase, dashboard summary cards

**Status Cards:**
- Approved: Card with green accent border (border-l-4 border-green-500)
- Pending: Card with amber accent border (border-l-4 border-amber-500)
- Rejected: Card with red accent border (border-l-4 border-red-500)

### Forms (shadcn/ui integration)
**Input Fields:**
- Component: Input with Label and FormDescription
- Error State: Built-in shadcn/ui error styling with red accent
- Focus State: Enhanced brand color (#1C43C9) focus ring

**Select Components:**
- Component: Select with shadcn/ui dropdown styling
- Custom: Brand-aligned focus and hover states
- Usage: Category selection (Expense types, Maintenance categories)

**Date Pickers:**
- Component: shadcn/ui Calendar component
- Customization: Brand color for selected dates
- Usage: Sick leave date selection, travel date ranges

**File Upload:**
- Component: Custom styled input with drag-and-drop zone
- Visual feedback: Upload progress with brand colors
- Usage: Receipt upload for expense reports

## Icons & Visual Elements
**Icon Strategy:** Lucide React (shadcn/ui default) + strategic custom icons for brand

**Icon Sizes:**
- Small: 16px (inline with text, form inputs)
- Default: 20px (UI elements, buttons)  
- Large: 24px (feature highlights, navigation)
- Hero: 32px (wow factor elements, dashboard icons)

**Icon Colors:**
- Primary: Current text color (inherits from typography)
- Muted: text-muted-foreground (#636363)
- Brand: Custom brand accent color (#1C43C9)
- Interactive: Hover state transitions to brand color

**Feature-Specific Icons:**
- Sick Leave: Calendar, Clock, User-X
- Expense Reports: Receipt, DollarSign, CreditCard
- Maintenance: Tool, AlertTriangle, CheckCircle
- Travel: Plane, MapPin, Briefcase
- AI Assistant: Brain, Sparkles, MessageCircle

## Spacing System (Tailwind alignment)
**Strategy:** Use Tailwind spacing scale with shadcn/ui component spacing

**Standard Spacing:**
- xs: space-1 (4px) - Micro spacing, form field gaps
- sm: space-2 (8px) - Component internal spacing, button padding
- md: space-4 (16px) - Default element spacing, card padding
- lg: space-6 (24px) - Section spacing, form sections
- xl: space-8 (32px) - Major section separation, page margins
- 2xl: space-12 (48px) - Page-level spacing, feature section breaks

**Demo-Specific Spacing:**
- Feature Section: space-16 (64px) - Clear feature separation for demo
- Demo Padding: space-8 (32px) - Consistent demo container spacing
- Dashboard Grid: gap-6 (24px) - Optimal spacing for feature cards

## Motion & Animation (Demo-optimized)
**Animation Strategy:** Subtle, professional motion that enhances demo without distraction

**Standard Transitions:**
- Default: transition-all duration-200 ease-in-out
- Hover States: transition-colors duration-150 ease-in-out
- Focus States: transition-all duration-100 ease-in-out

**Demo-Specific Animations:**
- Feature Reveal: fade-in with slight slide-up (300ms) - opacity-0 to opacity-100, translate-y-4 to translate-y-0
- Loading States: Professional skeleton animation using shadcn/ui Skeleton
- Success Feedback: Subtle scale + color transition (200ms) - scale-95 to scale-100 with color change
- Status Updates: Smooth badge color transitions for approval states

**Performance Considerations:**
- Use transform and opacity for animations (GPU acceleration)
- Limit simultaneous animations during demo (max 3 concurrent)
- Prefers-reduced-motion support for accessibility
- Animation cleanup on component unmount

## Responsive Strategy (Demo-focused)
**Primary Target:** Desktop demo environment (1920x1080 minimum)
**Secondary:** Tablet backup (iPad Pro - 1024x768)
**Tertiary:** Mobile fallback (iPhone 14 Pro - 393x852)

**Breakpoint Strategy:**
- sm: 640px (Mobile backup - single column layouts)
- md: 768px (Tablet backup - simplified navigation)  
- lg: 1024px (Demo environment - full feature display)
- xl: 1280px+ (Large demo screens - enhanced spacing)

**shadcn/ui Responsive Patterns:**
- Container max-width alignment with shadcn/ui defaults
- Grid patterns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Navigation: Mobile hamburger menu, desktop sidebar
- Form layouts: Single column mobile, multi-column desktop

## Feature-Specific Design Patterns

### Sick Leave Management
**Color Theme:** Blue primary with calendar-focused UI
**Key Components:**
- Calendar interface with date range selection
- Status badges (Pending: amber, Approved: green, Rejected: red)
- Manager notification cards with action buttons

### Expense Report Management
**Color Theme:** Green accent for money-related actions
**Key Components:**
- Receipt upload zone with drag-and-drop styling
- OCR result display with editable fields
- Category selection with icon indicators
- Approval workflow progress indicators

### Maintenance Issues
**Color Theme:** Amber/orange for attention and urgency
**Key Components:**
- Issue severity indicators (Low: blue, Medium: amber, High: red)
- Status progression (New → Assigned → In Progress → Resolved)
- Photo upload for issue documentation
- Priority badges with appropriate color coding

### AI-Powered Assistant (Wow Factor)
**Color Theme:** Gradient combinations with sparkle effects
**Key Components:**
- Chat interface with animated message bubbles
- Suggestion cards with hover animations
- Predictive analytics charts with smooth transitions
- Smart recommendation badges

## Accessibility (Scoring requirement)
**WCAG Compliance Strategy:** Built-in through shadcn/ui + strategic enhancements

**Color Contrast:**
- AA compliance minimum (4.5:1 for normal text) - verified for all text combinations
- AAA target for critical demo elements (7:1) - form labels, call-to-action buttons
- High contrast mode support through CSS custom properties

**Keyboard Navigation:**
- shadcn/ui focus management out-of-the-box
- Logical tab order for demo flow (forms → actions → navigation)
- Skip links for demo efficiency ("Skip to main content", "Skip to next feature")
- Custom focus indicators matching brand colors

**Screen Reader Support:**
- Semantic HTML through shadcn/ui components
- ARIA labels for custom elements (file uploads, status indicators)
- Live region announcements for dynamic content (status changes, AI responses)
- Proper heading hierarchy (H1 for page titles, H2 for features, H3 for sections)

## Performance Optimization (Demo reliability)
**Loading Strategy:**
- Fast initial paint through shadcn/ui optimized components
- Progressive image loading for receipt uploads and documentation
- Optimistic UI for database interactions (immediate feedback, background sync)
- Critical CSS inlining for demo reliability

**Bundle Optimization:**
- Tree-shaking friendly component imports from shadcn/ui
- Lazy loading for Tier 2 feature components (travel, asset booking)
- Code splitting by feature for faster initial load
- Image optimization for uploaded receipts and documentation

## AI Tool Integration Guidelines

### v0 Component Generation
**Design Tokens for AI:**
```css
:root {
  --primary: #1C43C9;
  --primary-dark: #1425BA;
  --secondary: #FAFAFA;
  --success: #00C246;
  --warning: #F79009;
  --error: #D2373F;
  --muted: #636363;
  --wow-factor: linear-gradient(135deg, #FF7009 0%, #1C43C9 100%);
}
```

**Component Specifications for AI:**
- Use shadcn/ui Button, Card, Input, Select components as base
- Apply custom CSS variables for brand colors
- Include proper TypeScript interfaces for props
- Follow responsive patterns (mobile-first design)

### UX Pilot Optimization
**Color and Spacing Choices:**
- High contrast ratios for better accessibility recommendations
- Consistent spacing that benefits from AI-suggested improvements
- Clear visual hierarchy that AI can enhance

**Design Patterns:**
- Form validation patterns that work with UX suggestions
- Error state designs that benefit from AI optimization
- User flow patterns optimized for AI-driven improvements

### Cursor AI Consistency
**Design System Documentation:**
- Clear variable naming conventions (feature-action-state)
- TypeScript interfaces for all design tokens
- Consistent component prop structures across features

**Implementation Patterns:**
```typescript
interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    muted: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    default: string;
    hover: string;
    focus: string;
  };
}
```
