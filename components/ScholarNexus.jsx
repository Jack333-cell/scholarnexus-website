'use client';

import React, { useState } from 'react';
import Services from './Services';
import { Search, Menu, X, ChevronRight, Calendar, Tag, Globe, Zap, TrendingUp, BookOpen, Award, ArrowLeft, MapPin, Clock, DollarSign, Users, CheckCircle, Mail, PlusCircle, Edit2, Trash2 } from 'lucide-react';

const ScholarNexus = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // home, scholarships, blog, blog-post
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const [newsletter, setNewsletter] = useState({ status: 'idle', message: '' });
  const [email, setEmail] = useState('');
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'How to Write a Winning Scholarship Essay in 5 Steps',
      excerpt: 'Learn the proven formula for writing scholarship essays that stand out and win you funding.',
      content: 'Writing a winning scholarship essay requires more than just good grammar. You need to tell your story in a way that resonates with scholarship committees.\n\nStep 1: Start with a Strong Hook\nYour opening sentence should grab attention. Instead of generic statements, share a specific moment that changed your perspective.\n\nStep 2: Show, Don\'t Tell\nInstead of saying "I am hardworking," tell a story that demonstrates your work ethic. Use concrete examples and vivid details.\n\nStep 3: Connect to the Scholarship Mission\nResearch what the scholarship values and align your essay with those values. Show how you embody their mission.\n\nStep 4: Be Authentic\nScholarship committees read thousands of essays. Your genuine voice will stand out more than trying to impress with fancy words.\n\nStep 5: Edit and Get Feedback\nWrite multiple drafts. Have teachers, mentors, and friends review your work. Fresh eyes catch things you might miss.\n\nRemember: Your essay is your chance to show who you are beyond grades and test scores. Make it count!',
      author: 'ScholarNexus',
      date: 'March 10, 2026',
      category: 'Application Tips',
      image: '✍️',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Top 10 Scholarships for African Students',
      excerpt: 'A comprehensive guide to the best fully-funded opportunities for African students studying abroad.',
      content: 'Africa is home to millions of talented students seeking world-class education. Here are the top 10 scholarships specifically available for African students .\n\n1. DAAD Scholarships (Germany)\nThe German government offers comprehensive funding for African students pursuing postgraduate studies. Full tuition coverage plus monthly stipend.\n\n2. Fulbright Program (USA)\nThe prestigious US government scholarship for African students to study and conduct research at American universities.\n\n3. Mandela Rhodes Scholarship (South Africa)\nFunded postgraduate study at South African universities for young African leaders, with a leadership development programme.\n\n4. Erasmus+ Scholarships (Europe)\nEuropean Union scholarships for African students studying in European universities.\n\n5. Mastercard Foundation Scholarship (Multiple)\nComprehensive funding for talented young Africans to study at leading universities globally.\n\n6. African Leadership University Scholarships\nPartially to fully funded scholarships for African students demonstrating leadership potential.\n\n7. Gates Cambridge Scholarship (UK)\nFull-cost postgraduate scholarships at the University of Cambridge, open to applicants from outside the UK.\n\n8. British Council Scholarships (UK)\nFunding opportunities for African students studying in United Kingdom universities.\n\n9. Australian Government RTP Scholarship\nFor African graduate students pursuing research degrees in Australia.\n\n10. Chinese Government Scholarship\nComprehensive scholarships for African students studying in Chinese universities.\n\nEach of these scholarships has specific requirements, but the opportunity is there. Start preparing your applications now!',
      author: 'ScholarNexus',
      date: 'March 8, 2026',
      category: 'Regional Guides',
      image: '🌍',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: '5 Common Scholarship Application Mistakes to Avoid',
      excerpt: 'Don\'t let these preventable errors cost you your scholarship opportunity.',
      content: 'Scholarship committees review thousands of applications. Small mistakes can eliminate your chances of winning. Here are the 5 most common mistakes and how to avoid them.\n\nMistake 1: Missing the Deadline\nAlways submit at least 48 hours before the deadline. Technical issues happen. Give yourself a buffer.\n\nMistake 2: Not Following Instructions\nRead requirements carefully. If they ask for 250 words, don\'t submit 500. If they want PDF format, don\'t send Word documents.\n\nMistake 3: Generic Essays\nAvoid cookie-cutter responses. Personalize every essay to the specific scholarship and its mission.\n\nMistake 4: Spelling and Grammar Errors\nPoor writing reflects poorly on you. Use spell-check, read aloud, and have someone else proofread.\n\nMistake 5: Incomplete Applications\nSubmit all required documents. Missing even one recommendation letter can disqualify you.\n\nBonus Tip: Keep organized records of all scholarships you\'ve applied for, deadlines, and required documents. This prevents you from missing opportunities or submitting duplicate applications.\n\nTake time to do it right. Your future is worth it!',
      author: 'ScholarNexus',
      date: 'March 5, 2026',
      category: 'Application Tips',
      image: '⚠️',
      readTime: '4 min read'
    }
  ]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'General',
    image: '📝'
  });

  // Verified November 2026 against official sources. Re-check deadlines each intake cycle.
  const scholarshipListings = [
    {
      id: 1,
      title: 'Gates Cambridge Scholarship 2027/28 | Fully Funded (UK)',
      category: 'Masters & PhD',
      levels: ['masters', 'phd'],
      country: 'United Kingdom',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: true,
      excerpt: 'Full-cost scholarships for outstanding applicants from outside the UK to pursue a postgraduate degree at the University of Cambridge.',
      thumbnail: '🎓',
      amount: 'Fully Funded',
      deadline: '8 Dec 2026 or 6 Jan 2027 (depends on course)',
      duration: 'Length of the course',
      gpa: 'Outstanding academic record',
      description: 'Gates Cambridge funds the full cost of postgraduate study at the University of Cambridge. You apply for the scholarship in the same Cambridge postgraduate application as your course. International applicants follow the funding deadline listed for their course in the Cambridge Course Directory.',
      requirements: ['Citizen of a country outside the UK', 'Apply for an eligible full-time postgraduate course at Cambridge', 'Outstanding intellectual ability', 'Evidence of leadership potential', 'Commitment to improving the lives of others'],
      benefits: ['University composition fee', 'Maintenance allowance', 'Airfare at the start and end of the course', 'Inbound visa costs and Immigration Health Surcharge', 'Discretionary funding (e.g. academic development, family allowance)'],
      university: 'University of Cambridge',
      link: 'https://www.gatescambridge.org/apply/'
    },
    {
      id: 2,
      title: 'Erasmus Mundus Joint Masters 2027 | Fully Funded (Europe)',
      category: 'Masters',
      levels: ['masters'],
      country: 'Europe (multiple countries)',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: true,
      excerpt: 'Study one master’s degree across two or more European universities, with full scholarships for the top-ranked applicants.',
      thumbnail: '🇪🇺',
      amount: 'Fully Funded',
      deadline: 'Varies by programme (most Oct 2026 – Feb 2027)',
      duration: '1–2 years',
      gpa: 'Set by each programme',
      description: 'Erasmus Mundus Joint Masters are delivered by consortia of universities, mostly in Europe. Each programme runs its own application and selection, and the best-ranked students receive an EU-funded scholarship. Browse the official catalogue, then apply directly on the programme website before its own deadline.',
      requirements: ['Bachelor’s degree (or equivalent) in a relevant field', 'English proficiency as required by the programme', 'Programme-specific documents (CV, motivation letter, references)', 'Apply directly to the chosen programme'],
      benefits: ['Participation costs (tuition) covered', 'Monthly living allowance', 'Travel and installation contribution', 'Insurance coverage'],
      university: 'University consortia across Europe',
      link: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en'
    },
    {
      id: 3,
      title: 'Swedish Institute Scholarships for Global Professionals 2027',
      category: 'Masters',
      levels: ['masters'],
      country: 'Sweden',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'Fully funded master’s study in Sweden for professionals with work and leadership experience from eligible countries.',
      thumbnail: '🇸🇪',
      amount: 'Fully Funded',
      deadline: 'Programme application by 15 Jan 2027; scholarship 8–24 Feb 2027',
      duration: '1–2 years',
      gpa: 'Admission to an eligible programme',
      description: 'A two-step process: first apply for an eligible master’s programme through University Admissions in Sweden, then submit a separate scholarship application to the Swedish Institute. Check the official page for the list of eligible countries and programmes.',
      requirements: ['Citizen of an eligible country', 'Work experience and demonstrated leadership', 'Application to an eligible master’s programme', 'Motivation letter and CV (SI template)'],
      benefits: ['Full tuition fees', 'Monthly living allowance', 'Travel grant', 'Insurance'],
      university: 'Swedish universities',
      link: 'https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/'
    },
    {
      id: 4,
      title: 'Chinese Government Scholarship (CSC) 2027/28',
      category: 'Undergraduate, Masters & PhD',
      levels: ['undergraduate', 'masters', 'phd'],
      country: 'China',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'Government-funded study at Chinese universities, with routes through embassies, universities and partner organisations.',
      thumbnail: '🇨🇳',
      amount: 'Fully Funded',
      deadline: 'Varies by route and university (mostly Jan – Apr 2027)',
      duration: 'Length of the programme',
      gpa: 'Set by host university',
      description: 'The Chinese Government Scholarship is administered by the China Scholarship Council. Applicants usually apply through a Chinese embassy (Type A) or directly to a designated Chinese university (Type B), using the online system at Campus China. Each university and embassy sets its own deadline.',
      requirements: ['Non-Chinese citizen in good health', 'Previous degree appropriate to the level applied for', 'Meet the host university’s admission and language requirements', 'Online application on the CSC system plus university documents'],
      benefits: ['Tuition waiver', 'On-campus accommodation', 'Monthly stipend', 'Comprehensive medical insurance'],
      university: 'Designated Chinese universities',
      link: 'https://www.campuschina.org/'
    },
    {
      id: 5,
      title: 'DAAD EPOS Scholarships 2027/28 | Development-Related Courses (Germany)',
      category: 'Masters',
      levels: ['masters', 'phd'],
      country: 'Germany',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'DAAD scholarships for professionals from developing countries on selected development-related postgraduate courses in Germany.',
      thumbnail: '🇩🇪',
      amount: 'Fully Funded',
      deadline: 'Varies by course; some 2027/28 courses still open — check the DAAD list',
      duration: '12–24 months (master’s)',
      gpa: 'Above-average degree',
      description: 'EPOS funds only the postgraduate courses on DAAD’s official list. You apply directly to the chosen course, which runs the selection, usually about a year before the course starts. Download the current list of courses and deadlines from the DAAD page.',
      requirements: ['Citizen of an eligible developing country', 'Bachelor’s degree, usually in a related field', 'At least two years’ relevant professional experience', 'Application to a listed EPOS course'],
      benefits: ['Monthly scholarship payment', 'Health insurance contribution', 'Travel allowance', 'Study and research subsidy'],
      university: 'German universities (EPOS courses)',
      link: 'https://www.daad.de/epos'
    },
    {
      id: 6,
      title: 'Wageningen University Africa Scholarship Programme 2027 | Fully Funded (Netherlands)',
      category: 'Masters',
      levels: ['masters'],
      country: 'Netherlands',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: true,
      excerpt: 'Full MSc funding at Wageningen University & Research for top African students. Your complete MSc application must be in before 1 December 2026.',
      thumbnail: '🌱',
      amount: 'Fully Funded',
      deadline: 'Complete MSc application before 1 Dec 2026',
      duration: '24 months',
      gpa: 'First Class Honours / 80%+',
      description: 'Wageningen University & Research (WUR) offers the Africa Scholarship Programme to citizens of African countries starting an MSc in September 2027. There is no separate scholarship form: you are considered automatically if your complete MSc application is submitted before 1 December 2026. Recipients are chosen from selected candidates and offers are made in April 2027. Applicants from eligible developing countries may also be considered for the Anne van den Ban Fund through the same MSc application.',
      requirements: ['Citizen of an African country', 'Unconditional admission to an on-campus WUR MSc (September 2027)', 'First Class Honours degree or GPA of 80%+', 'Complete MSc application submitted before 1 December 2026', 'Preference for applicants without a previous master’s degree'],
      benefits: ['Tuition fees for 24 months', 'Living allowance', 'Travel to and from the Netherlands', 'Visa and health insurance costs'],
      university: 'Wageningen University & Research',
      link: 'https://www.wur.nl/en/education/master/study-expenses-masters/scholarships'
    },
    {
      id: 7,
      title: 'Mastercard Foundation Scholars Program at UC Berkeley 2027 | Fully Funded (USA)',
      category: 'Masters',
      levels: ['masters'],
      country: 'United States',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'Full funding for African students admitted to a master’s programme at the University of California, Berkeley.',
      thumbnail: '🇺🇸',
      amount: 'Fully Funded',
      deadline: 'Follows each Berkeley master’s programme deadline (most Dec 2026 – Jan 2027)',
      duration: 'Up to 2 years',
      gpa: 'Competitive for Berkeley admission',
      description: 'The Mastercard Foundation Scholars Program at UC Berkeley supports young African leaders on master’s degrees. You first apply to a UC Berkeley graduate programme; candidates nominated by their programme are invited to a supplemental application and interview. The programme is for master’s students only (not undergraduates or PhD students). Applicants who entered their details and two recommenders in the Berkeley application by 15 November 2026 received an early invitation; check the official page for current steps.',
      requirements: ['Citizen of an African country', 'Apply to an eligible UC Berkeley master’s programme', 'Strong academic record and leadership commitment', 'Commitment to return and contribute to Africa', 'Not a previous Mastercard Foundation Scholar'],
      benefits: ['Full tuition and university fees', 'Housing and meals', 'Round-trip travel', 'Visa fees and health insurance', 'Leadership and entrepreneurship programming'],
      university: 'University of California, Berkeley',
      link: 'https://mcfscholarsprogram.berkeley.edu/'
    },
    {
      id: 8,
      title: 'York University President’s International Scholarship of Excellence 2027 (Canada)',
      category: 'Undergraduate',
      levels: ['undergraduate'],
      country: 'Canada',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'CAD 45,000 a year (up to CAD 180,000) for outstanding international students entering York University from high school.',
      thumbnail: '🇨🇦',
      amount: 'CAD 45,000 per year (up to CAD 180,000)',
      deadline: '27 Jan 2027 (11:59 PM EST)',
      duration: 'Up to 4 years',
      gpa: 'A average in high school',
      description: 'York University’s top award for international students starting an undergraduate degree. First apply for admission to York; once you receive your York Reference Number (4–5 business days later), complete the separate scholarship application and arrange your school nomination. Renewal requires a minimum B average and at least 24 credits a year.',
      requirements: ['Apply for undergraduate admission to York University', 'A average (or equivalent) in high school', 'Demonstrated leadership and community involvement', 'Separate scholarship application with school nomination'],
      benefits: ['CAD 45,000 per year', 'Renewable for up to 4 years (max CAD 180,000)'],
      university: 'York University, Toronto',
      link: 'https://futurestudents.yorku.ca/pise'
    },
    {
      id: 9,
      title: 'Miami University Presidential Fellows Program 2027 (USA)',
      category: 'Undergraduate',
      levels: ['undergraduate'],
      country: 'United States',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'Miami University’s top undergraduate award: tuition, fees, housing and food for 15 students a year. Deadline 1 December 2026.',
      thumbnail: '🏛️',
      amount: 'Tuition, fees, housing & food + $5,000',
      deadline: '1 Dec 2026',
      duration: '4 years',
      gpa: 'Top Honors College applicants',
      description: 'The Presidential Fellows Program at Miami University (Ohio) is a highly competitive award for fifteen first-year students in the Honors College each year. Indicate your interest on the admission application by 1 December. From fall 2027, applicants must also submit self-reported ACT or SAT scores. Shortlisted candidates go through additional review and an interview.',
      requirements: ['Apply for first-year admission to Miami University (Oxford campus) by 1 December', 'Indicate interest in the Presidential Fellows Program', 'Self-reported ACT or SAT scores (required from fall 2027)', 'Interview if shortlisted'],
      benefits: ['Tuition and fees', 'Housing and food', '$5,000 academic enrichment stipend', 'Honors College cohort programming'],
      university: 'Miami University, Ohio',
      link: 'https://miamioh.edu/admission-aid/costs-financial-aid/scholarships.html'
    },
    {
      id: 10,
      title: 'UNIQLO Global Management Program 2027 | Fully Funded (Japan)',
      category: 'Internships & Training',
      levels: ['programs', 'undergraduate'],
      country: 'Japan',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'A 6-day, fully paid leadership programme at Fast Retailing’s global headquarters in Tokyo for undergraduates worldwide.',
      thumbnail: '🇯🇵',
      amount: 'Fully Funded',
      deadline: 'About 28 Feb 2027, so confirm on the official site',
      duration: '6 days (25–30 July 2027)',
      gpa: 'Strong academics & English',
      description: 'Fast Retailing (the company behind UNIQLO) brings high-achieving students from around the world to its Tokyo headquarters to learn about global retail through store visits, research and a presentation to senior management. Selection includes an online application, assessments and interviews.',
      requirements: ['Currently enrolled undergraduate (penultimate-year students are a good fit)', 'Excellent English', 'Leadership and teamwork experience', 'Able to attend the full programme in Tokyo'],
      benefits: ['Round-trip airfare to Japan', 'Accommodation', 'Mentoring from global business leaders', 'Possible consideration for future roles at Fast Retailing'],
      university: 'Fast Retailing Global HQ, Tokyo',
      link: 'https://www.fastretailing.com/employment/en/uniqlo/graduate/gmp/'
    },
    {
      id: 11,
      title: 'French-African Foundation Young Leaders Program 2027',
      category: 'Leadership Program',
      levels: ['programs'],
      country: 'France & Africa',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'A leadership and networking programme for young African and French professionals, with seminars in France and Africa.',
      thumbnail: '🤝',
      amount: 'Travel & accommodation covered',
      deadline: '2027 call is open, so check the official site for the closing date',
      duration: 'Two week-long seminars',
      gpa: 'Proven leadership & impact',
      description: 'The Young Leaders Program is the French-African Foundation’s flagship initiative, connecting emerging African and French leaders with decision-makers through training, mentoring and two seminars held alternately in France and on the African continent. In past editions applicants needed to be aged 28–40, hold African or French nationality, have at least five years of professional experience and speak English; confirm the 2027 criteria on the official site.',
      requirements: ['African or French nationality', 'Typically aged 28–40 (check 2027 criteria)', 'At least 5 years of professional experience with leadership impact', 'English required; French is an asset', 'CV, passport copy and short video presentation'],
      benefits: ['Flights and accommodation for the seminars', 'Training led by experts', 'Meetings with public and private decision-makers', 'Lifelong Young Leaders alumni network'],
      university: 'French-African Foundation',
      link: 'https://www.french-african.org/'
    },
    {
      id: 12,
      title: 'Google AI Plus Free for 12 Months: University Students in Africa',
      category: 'Student Offer',
      levels: ['offers'],
      country: '27 African countries',
      date: 'Updated November 2026',
      author: 'ScholarNexus',
      featured: false,
      excerpt: 'Eligible college and university students in 27 African countries can get one year of Google AI Plus (Gemini) free.',
      thumbnail: '🤖',
      amount: 'Free for 12 months',
      deadline: 'Limited-time offer, so sign up soon',
      duration: '12 months',
      gpa: 'Verified student status',
      description: 'Google is offering eligible college and university students across 27 African countries one year of Google AI Plus at no cost, including Gemini study tools. Note: this year’s offer is AI Plus, not AI Pro. Verify your student status on Google’s sign-up page; availability depends on your country and institution.',
      requirements: ['Enrolled at an eligible college or university', 'Located in an eligible African country', 'Personal Google account', 'Student verification on the sign-up page'],
      benefits: ['Google AI Plus free for 12 months', 'Gemini study and research tools', 'Extra cloud storage'],
      university: 'Google',
      link: 'https://one.google.com/ai-student'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Scholarships' },
    { id: 'undergraduate', label: 'Undergraduate' },
    { id: 'masters', label: 'Masters' },
    { id: 'phd', label: 'PhD' },
    { id: 'programs', label: 'Leadership & Internships' },
    { id: 'offers', label: 'Student Offers' }
  ];

  const filteredScholarships = scholarshipListings.filter((s) => {
    const inCategory = activeCategory === 'all' || s.levels.includes(activeCategory);
    const q = searchQuery.trim().toLowerCase();
    const inSearch = !q || [s.title, s.country, s.category, s.excerpt, s.university].join(' ').toLowerCase().includes(q);
    return inCategory && inSearch;
  });

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (newBlog.title && newBlog.excerpt && newBlog.content) {
      const blogPost = {
        id: blogs.length + 1,
        ...newBlog,
        author: 'You',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: `${Math.ceil(newBlog.content.split(' ').length / 200)} min read`
      };
      setBlogs([blogPost, ...blogs]);
      setNewBlog({ title: '', excerpt: '', content: '', category: 'General', image: '📝' });
      setShowNewBlogForm(false);
      setCurrentPage('blog');
    }
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const address = email.trim();
    if (!address || newsletter.status === 'loading') return;
    setNewsletter({ status: 'loading', message: 'Subscribing…' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: address, website: e.target.website?.value || '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setNewsletter({ status: 'ok', message: data.message || "You're subscribed! Watch your inbox for new scholarships." });
        setEmail('');
      } else {
        setNewsletter({ status: 'error', message: data.error || 'Something went wrong. Please try again, or message us on WhatsApp.' });
      }
    } catch {
      setNewsletter({ status: 'error', message: 'Network error. Please check your connection and try again.' });
    }
  };

  const NewsletterMessage = ({ dark }) =>
    newsletter.status === 'idle' ? null : (
      <div role="status" className={`mt-3 flex items-start gap-2 text-sm rounded p-2 ${dark ? 'bg-blue-500 text-white' : newsletter.status === 'error' ? 'bg-red-50 text-red-700' : 'bg-white text-slate-700'}`}>
        {newsletter.status === 'ok' && <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
        <span>{newsletter.message}</span>
      </div>
    );

  const honeypot = <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />;

  // BLOG DETAIL PAGE
  if (currentPage === 'blog-post' && selectedBlogPost) {
    const blog = blogs.find(b => b.id === selectedBlogPost);
    return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={() => { setCurrentPage('blog'); setSelectedBlogPost(null); }} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <h1 className="text-xl font-bold text-slate-900">Blog Post</h1>
              <div className="w-16"></div>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article>
            <div className="mb-8">
              <div className="text-5xl mb-4">{blog.image}</div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blog.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blog.readTime}</span>
                <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {blog.category}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-slate-700">
              {blog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Stay Updated</h3>
                <p className="text-slate-600 mb-4">Subscribe to our newsletter for more scholarship tips and guides.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  {honeypot}
                  <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                  <button type="submit" disabled={newsletter.status === 'loading'} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-60">Subscribe</button>
                </form>
                <NewsletterMessage />
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  // BLOG LIST PAGE
  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ArrowLeft className="w-5 h-5" /> Home
              </button>
              <h1 className="text-xl font-bold text-slate-900">Blog</h1>
              <span className="w-24" />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {showNewBlogForm && (
            <div className="mb-12 bg-slate-50 rounded-lg p-8 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Write New Article</h2>
              <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Article Title *</label>
                  <input type="text" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} placeholder="Enter article title" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Emoji Icon</label>
                  <input type="text" maxLength="2" value={newBlog.image} onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })} placeholder="Choose emoji" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Short Excerpt *</label>
                  <textarea value={newBlog.excerpt} onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })} placeholder="2-3 sentence summary" rows="3" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Category</label>
                  <select value={newBlog.category} onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>General</option>
                    <option>Application Tips</option>
                    <option>Regional Guides</option>
                    <option>Success Stories</option>
                    <option>Visa & Immigration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Full Article Content *</label>
                  <textarea value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} placeholder="Write your full article here. Use double line breaks to separate paragraphs." rows="12" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm" required />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">Publish Article</button>
                  <button type="button" onClick={() => setShowNewBlogForm(false)} className="px-6 py-3 bg-slate-300 text-slate-900 font-medium rounded-lg hover:bg-slate-400 transition">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-6">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No articles yet. Write your first one!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <article key={blog.id} className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="flex gap-6 p-6">
                    <div className="text-5xl flex-shrink-0">{blog.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 onClick={() => { setSelectedBlogPost(blog.id); setCurrentPage('blog-post'); }} className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 cursor-pointer flex-1">{blog.title}</h3>
                        {blog.author === 'You' && (
                          <button onClick={() => handleDeleteBlog(blog.id)} className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{blog.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0 mt-1 cursor-pointer" onClick={() => { setSelectedBlogPost(blog.id); setCurrentPage('blog-post'); }} />
                  </div>
                </article>
              ))
            )}
          </div>
        </main>
      </div>
    );
  }

  // SCHOLARSHIP DETAIL PAGE
  if (selectedScholarship) {
    const scholarship = scholarshipListings.find(s => s.id === selectedScholarship);
    return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button onClick={() => setSelectedScholarship(null)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <h1 className="text-xl font-bold text-slate-900">Scholarship Details</h1>
              <div className="w-16"></div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-6xl">{scholarship.thumbnail}</div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{scholarship.title}</h1>
                <p className="text-lg text-slate-600 mb-4">{scholarship.university}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    <Globe className="w-4 h-4" /> {scholarship.country}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    <DollarSign className="w-4 h-4" /> {scholarship.amount}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                    <Clock className="w-4 h-4" /> Deadline: {scholarship.deadline}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Funding Amount</p>
                <p className="text-xl font-bold text-blue-600">{scholarship.amount}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Deadline</p>
                <p className="text-lg font-bold text-green-600">{scholarship.deadline}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Duration</p>
                <p className="text-lg font-bold text-purple-600">{scholarship.duration}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Academic Standard</p>
                <p className="text-lg font-bold text-orange-600">{scholarship.gpa}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
              <p className="text-lg text-slate-700 leading-relaxed">{scholarship.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {scholarship.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What You Get</h2>
              <ul className="space-y-3">
                {scholarship.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Apply?</h3>
              <p className="text-blue-100 mb-6">Applications are made on the official website. Always confirm the latest deadline and eligibility there.</p>
              <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">Visit Official Page</a>
              <p className="text-blue-100 text-sm mt-4">Need help with your application, CV or motivation letter? <a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Talk to ScholarNexus</a>.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // MAIN HOME PAGE
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/logo-mark.png" alt="ScholarNexus logo" width="52" height="52" className="w-13 h-13 rounded-lg bg-white" style={{width:52,height:52}} />
              <div>
                <h1 className="text-xl font-bold text-slate-900">ScholarNexus</h1>
                <p className="text-xs text-slate-500">Connect · Empower · Succeed</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => setCurrentPage('home')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Scholarships</button>
              <button onClick={() => setCurrentPage('blog')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Blog</button>
              <a href="#services" onClick={() => setCurrentPage('home')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Services</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">About</a>
              <a href="mailto:info@scholarnexushub.com" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden sm:block p-2 hover:bg-slate-100 rounded-lg transition">
                <Search className="w-5 h-5 text-slate-600" />
              </button>
              <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-slate-200">
              <button onClick={() => setCurrentPage('home')} className="block py-2 text-sm font-medium text-slate-600 hover:text-blue-600 w-full text-left">Scholarships</button>
              <button onClick={() => setCurrentPage('blog')} className="block py-2 text-sm font-medium text-slate-600 hover:text-blue-600 w-full text-left">Blog</button>
              <a href="#services" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block py-2 text-sm font-medium text-slate-600 hover:text-blue-600">Services</a>
              <a href="#about" className="block py-2 text-sm font-medium text-slate-600 hover:text-blue-600">About</a>
              <a href="mailto:info@scholarnexushub.com" className="block py-2 text-sm font-medium text-slate-600 hover:text-blue-600">Contact</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">Find Your Next Fully Funded Scholarship</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Verified, open scholarships with official links — plus guidance on theses, applications, CVs and online work. We share. We guide. You succeed. 💙</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search scholarships by name, country, field..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">Search</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-slate-200"><div className="text-3xl font-bold text-blue-600 mb-1">{scholarshipListings.length}</div><p className="text-sm text-slate-600">Verified Opportunities</p></div>
            <div className="bg-white rounded-lg p-6 border border-slate-200"><div className="text-3xl font-bold text-blue-600 mb-1">100%</div><p className="text-sm text-slate-600">Official Application Links</p></div>
            <div className="bg-white rounded-lg p-6 border border-slate-200"><div className="text-3xl font-bold text-blue-600 mb-1">Free</div><p className="text-sm text-slate-600">Scholarship Guidance</p></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">By Type</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`w-full text-left px-4 py-2 rounded-lg transition font-medium text-sm ${activeCategory === cat.id ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>{cat.label}</button>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
              <h4 className="font-bold text-sm mb-2">Get New Scholarships</h4>
              <p className="text-xs text-blue-100 mb-4">Get new opportunities by email, or <a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="underline font-semibold">chat with us on WhatsApp</a>.</p>
              <form onSubmit={handleNewsletterSubmit}>
                {honeypot}
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-blue-500 placeholder-blue-300 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white mb-3" required />
                <button type="submit" disabled={newsletter.status === 'loading'} className="w-full px-3 py-2 bg-white text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-50 transition disabled:opacity-60">Subscribe</button>
              </form>
              <NewsletterMessage dark />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2">
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6"><Zap className="w-5 h-5 text-amber-500" /><h2 className="text-2xl font-bold text-slate-900">Featured Scholarships</h2></div>
              {filteredScholarships.length === 0 && (<p className="text-slate-600 mb-4">No scholarships match your search. Try another keyword or category.</p>)}
              <div className="grid gap-4">
                {filteredScholarships.filter(s => s.featured).map((scholarship) => (
                  <article key={scholarship.id} onClick={() => setSelectedScholarship(scholarship.id)} className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                    <div className="flex gap-4 p-5">
                      <div className="text-4xl flex-shrink-0">{scholarship.thumbnail}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">{scholarship.title}</h3>
                          <span className="flex-shrink-0 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">Featured</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{scholarship.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{scholarship.category}</span>
                          <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{scholarship.country}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{scholarship.date}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0 mt-1" />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-blue-600" /><h2 className="text-2xl font-bold text-slate-900">Latest Opportunities</h2></div>
              <div className="grid gap-4">
                {filteredScholarships.filter(s => !s.featured).map((scholarship) => (
                  <article key={scholarship.id} onClick={() => setSelectedScholarship(scholarship.id)} className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                    <div className="flex gap-4 p-5">
                      <div className="text-3xl flex-shrink-0">{scholarship.thumbnail}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 mb-2">{scholarship.title}</h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-1">{scholarship.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{scholarship.category}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{scholarship.date}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0 mt-1" />
                    </div>
                  </article>
                ))}
              </div>
              <button className="w-full mt-6 px-4 py-3 border border-slate-300 text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition">Load More Scholarships</button>
            </section>

            <section>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
                </div>
                <button onClick={() => setCurrentPage('blog')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
              </div>
              <div className="grid gap-4">
                {blogs.slice(0, 3).map((blog) => (
                  <article key={blog.id} onClick={() => { setSelectedBlogPost(blog.id); setCurrentPage('blog-post'); }} className="group bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">{blog.title}</h3>
                      </div>
                      <div className="text-2xl flex-shrink-0">{blog.image}</div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-1">{blog.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Services />

      {/* Footer */}
      <footer id="about" className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo-mark.png" alt="ScholarNexus logo" width="36" height="36" className="w-9 h-9 rounded-md bg-white p-0.5" />
                <h3 className="font-bold text-white">ScholarNexus</h3>
              </div>
              <p className="text-sm text-slate-400">ScholarNexus shares verified scholarship opportunities and offers guidance on theses, applications, CVs and online work. We share. We guide. You succeed. 💙</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">For Students</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => { setCurrentPage('home'); setSelectedScholarship(null); }} className="hover:text-blue-400 transition">Browse Scholarships</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="hover:text-blue-400 transition">Application Tips &amp; Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-blue-400 transition">Thesis &amp; research support</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition">Scholarships &amp; admissions</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition">Online work &amp; AI training jobs</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition">CVs &amp; job applications</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition">Teaching resources &amp; tutoring</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:info@scholarnexushub.com" className="hover:text-blue-400 transition break-all">info@scholarnexushub.com</a></li>
                <li><a href="https://wa.me/254754835544" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">WhatsApp: +254 754 835 544</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} ScholarNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScholarNexus;