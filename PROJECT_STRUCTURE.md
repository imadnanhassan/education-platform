# গ্র্যাভিটন একাডেমি - Project Structure & Plan

## 📁 Folder Structure Plan

```
app/
├── (frontend)/                    # Public Frontend Pages
│   ├── layout.tsx                # Frontend Layout with Navbar/Footer
│   ├── page.tsx                  # Home Page
│   ├── made-easy/
│   │   ├── page.tsx             # Subject List
│   │   ├── [subject]/
│   │   │   ├── page.tsx         # Chapter List
│   │   │   └── [chapter]/
│   │   │       └── page.tsx     # MCQ/PDF/Video Content
│   ├── clubs/
│   │   ├── page.tsx             # Club List
│   │   └── [clubId]/
│   │       └── page.tsx         # Club Details
│   ├── courses/
│   │   └── page.tsx             # Course Catalog
│   ├── fly-to-abroad/
│   │   ├── page.tsx             # Main Page
│   │   ├── olympiad/
│   │   │   └── page.tsx
│   │   ├── sat/
│   │   │   └── page.tsx
│   │   ├── ielts/
│   │   │   └── page.tsx
│   │   └── extra-curricular/
│   │       └── page.tsx
│   ├── gallery/
│   │   └── page.tsx             # Photo & Video Gallery
│   ├── teachers/
│   │   └── page.tsx             # Teacher Profiles
│   ├── scholarship/
│   │   └── page.tsx             # Talent Hunt
│   ├── magazine/
│   │   ├── page.tsx             # Article List
│   │   └── [articleId]/
│   │       └── page.tsx         # Article Details
│   ├── membership/
│   │   └── page.tsx             # Shareholder & Silver Member
│   ├── contact/
│   │   └── page.tsx             # Contact Form
│   ├── about/
│   │   └── page.tsx             # About Us
│   └── login/
│       └── page.tsx             # Login Page (Student/Admin)
│
├── (student-dashboard)/           # Student Portal
│   ├── layout.tsx               # Student Dashboard Layout
│   ├── page.tsx                 # Dashboard Home
│   ├── profile/
│   │   └── page.tsx             # Student Profile
│   ├── my-courses/
│   │   └── page.tsx             # Enrolled Courses
│   ├── assignments/
│   │   └── page.tsx             # Assignments & MCQ
│   ├── results/
│   │   └── page.tsx             # Results & Progress
│   ├── feedback/
│   │   └── page.tsx             # Submit Feedback
│   └── notes/
│       └── page.tsx             # Graviton Basket (Note Sharing)
│
├── (admin-dashboard)/             # Admin CMS Panel
│   ├── layout.tsx               # Admin Dashboard Layout
│   ├── page.tsx                 # Admin Dashboard Home
│   ├── students/
│   │   ├── page.tsx             # Student Management
│   │   └── [studentId]/
│   │       └── page.tsx         # Student Details
│   ├── courses/
│   │   ├── page.tsx             # Course Management
│   │   └── create/
│   │       └── page.tsx         # Create Course
│   ├── content/
│   │   ├── subjects/
│   │   │   └── page.tsx         # Manage Subjects
│   │   ├── chapters/
│   │   │   └── page.tsx         # Manage Chapters
│   │   └── mcq/
│   │       └── page.tsx         # Manage MCQ
│   ├── clubs/
│   │   └── page.tsx             # Club Management
│   ├── gallery/
│   │   └── page.tsx             # Gallery Management
│   ├── teachers/
│   │   └── page.tsx             # Teacher Management
│   ├── magazine/
│   │   └── page.tsx             # Article Management
│   ├── admissions/
│   │   └── page.tsx             # Admission Requests
│   ├── feedback/
│   │   └── page.tsx             # View All Feedback
│   └── settings/
│       └── page.tsx             # System Settings
│
└── globals.css                   # Global Styles
```

## 📋 Components Structure

```
components/
├── layouts/
│   ├── frontend/
│   │   ├── Navbar.tsx           # Frontend Navigation
│   │   ├── Footer.tsx           # Frontend Footer
│   │   └── Layout.tsx           # Frontend Layout Wrapper
│   ├── student/
│   │   ├── Sidebar.tsx          # Student Dashboard Sidebar
│   │   ├── Header.tsx           # Student Dashboard Header
│   │   └── Layout.tsx           # Student Layout Wrapper
│   └── admin/
│       ├── Sidebar.tsx          # Admin Dashboard Sidebar
│       ├── Header.tsx           # Admin Dashboard Header
│       └── Layout.tsx           # Admin Layout Wrapper
│
├── sections/                     # Homepage Sections
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Stats.tsx
│   └── Testimonials.tsx
│
├── ui/                          # Reusable UI Components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── Table.tsx
│
├── forms/                       # Form Components
│   ├── LoginForm.tsx
│   ├── ContactForm.tsx
│   ├── FeedbackForm.tsx
│   └── AdmissionForm.tsx
│
└── common/                      # Common Components
    ├── Loading.tsx
    ├── ErrorBoundary.tsx
    └── SEO.tsx
```

## 🎨 Design Theme (Green Color Palette)

```css
Primary Colors:
- Primary: #22c55e (Green 500)
- Primary Light: #dcfce7 (Green 100)
- Primary Dark: #15803d (Green 700)

Secondary Colors:
- Secondary: #059669 (Emerald 600)
- Accent: #10b981 (Emerald 500)

Neutral Colors:
- Gray 50: #f9fafb
- Gray 100: #f3f4f6
- Gray 900: #111827
```

## 📱 Page Features Summary

### Frontend Pages:
1. **Home** - Hero, Features, Stats, Testimonials
2. **Made Easy** - Subject → Chapter → Content (MCQ/PDF/Video)
3. **Clubs** - Club listing → Club details with gallery
4. **Courses** - Course catalog with admission buttons
5. **Fly to Abroad** - Olympiad, SAT, IELTS, Extra Curricular
6. **Gallery** - Photo & Video galleries
7. **Teachers** - Teacher profiles with photos
8. **Scholarship** - Talent hunt system
9. **Magazine** - Blog-style articles
10. **Membership** - Shareholder & Silver member info
11. **Contact** - Contact form & information
12. **About** - Organization details
13. **Login** - Dual login (Student/Admin)

### Student Dashboard:
1. **Dashboard** - Overview, progress, notifications
2. **Profile** - Personal information management
3. **My Courses** - Enrolled courses & progress
4. **Assignments** - MCQ tests & assignments
5. **Results** - Test results & progress tracking
6. **Feedback** - Submit feedback with photos
7. **Notes** - Graviton Basket (note sharing system)

### Admin Dashboard:
1. **Dashboard** - Analytics, recent activities
2. **Students** - Student management & information
3. **Courses** - Course creation & management
4. **Content** - Subject, Chapter, MCQ management
5. **Clubs** - Club management
6. **Gallery** - Photo/Video management
7. **Teachers** - Teacher profile management
8. **Magazine** - Article management
9. **Admissions** - Handle admission requests
10. **Feedback** - View all feedback
11. **Settings** - System configuration

## 🚀 Development Phases

### Phase 1: Frontend (Public Pages)
- Setup folder structure
- Create layouts and components
- Implement all public pages with dummy data
- Responsive design with green theme

### Phase 2: Admin Dashboard
- Complete CMS functionality
- Content management system
- User management
- File upload system

### Phase 3: Student Dashboard
- Student portal
- Course enrollment
- Progress tracking
- Interactive features

### Phase 4: Backend Integration
- API development
- Database integration
- Authentication system
- File storage system

## 📝 Notes
- All pages will use dummy data initially
- Green color theme throughout
- Responsive design for mobile/tablet/desktop
- Bengali and English content support
- Modern UI/UX with clean design