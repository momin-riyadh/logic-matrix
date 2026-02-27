export type BlogCategory = string;

export type BlogSection = {
  title: string;
  content: string;
  image?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: BlogCategory;
  href: string;
  tags?: string[];
  readTime?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  sections?: BlogSection[];
};

export const blogCategories: BlogCategory[] = [
  'All Topics', 'AWS', 'Artificial Intelligence', 'Azure', 'Banking IT', 'Big Data', 'Blockchain', 'CRM', 'Cloud', 'Customer Service', 'Data Analytics & BI', 'Data Science', 'Design',
  'Digital Transformation', 'Dynamics 365', 'Ecommerce', 'Enterprises', 'Finance IT', 'Fleet Management', 'HR', 'Healthcare IT', 'Help Desk', 'IT Consulting', 'ITSM',
  'Image Analysis', 'Information Security', 'Infrastructure Management', 'Insurance IT', 'Internet of Things', 'Investment IT', 'Lending IT', 'Managed IT', 'Manufacturing IT',
  'Marketing Automation', 'Mobile Apps', 'Power BI', 'Remote Work', 'SCM', 'Salesforce', 'SharePoint', 'Software Development', 'Software Testing & QA', 'Startups',
  'Transportation & Logistics IT', 'Web Portals', 'eLearning'
];

const mockSections: BlogSection[] = [
  {
    title: 'Planning in Agile models',
    content: "Welcome to the AK Group blog, where we delve into the exciting world of construction! Every week, we'll be your guide on a journey through the latest trends, industry insights, and practical tips related to all things building. Whether you're a seasoned homeowner, a budding architect, or simply curious about the fascinating world of construction, we have something for everyone.",
    image: '/logicmatrix/recent-work-1.png' // Placeholder for the SDLC diagram
  },
  {
    title: 'Scrum',
    content: "Welcome to the AK Group blog, where we delve into the exciting world of construction! Every week, we'll be your guide on a journey through the latest trends, industry insights, and practical tips related to all things building. Whether you're a seasoned homeowner, a budding architect, or simply curious about the fascinating world of construction, we have something for everyone."
  },
  {
    title: 'Planning participants',
    content: "In Scrum, ScienceSoft organizes software projects in sprints, each lasting 1-4 weeks and aimed at delivering a piece of functionality that addresses a user story. User stories are usually the descriptions of features from a user's perspective or descriptions of actions that a user would like to make (e.g., upload a photo, cut a video, add data to a database).\n\nPlanning participants: A project owner, a project manager, business analysts, a test manager, development and testing teams.\n\nPlanning specifics: In Scrum, we prepare a detailed plan only for one upcoming sprint. We take the scope of work for a sprint from the backlog, which comprises all the ideas about the functionality for the developed solution.\n\nThe planning process: Before the sprint planning itself, our project owner performs backlog grooming (also known as backlog refinement). This process includes adding new user stories to respond to newly discovered business or user needs, removing user stories that are no longer relevant, splitting user stories if they are too big to do within one sprint and prioritizing backlog items for execution.\n\nThen, at the beginning of a sprint, planning participants set up a planning meeting to agree on the goal of the new sprint. They discuss the detailed scope of work for the sprint and determine the required efforts and the expected timeframes. At ScienceSoft, in some cases we involve business analysts to help translate high-level business requirements into the requirements for the development and testing teams."
  },
  {
    title: 'Extreme programming (XP)',
    content: "This software development model means implementing the beneficial elements of traditional software engineering practices at \"extreme\" levels. For example, code reviews are traditionally considered a useful practice, and, taken to the extreme, code is reviewed continuously, as in pair programming, which has become an established practice in XP. An XP project is comprised of releases, and each release consists of short iterations lasting about a week.\n\nPlanning participants: A project owner, a project manager, business analysts and development and testing teams.\n\nPlanning specifics: The planning process within Extreme Programming is called the Planning Game and consists of two stages, release planning and iteration planning, each consisting of the exploration, the commitment and the steering phases.\n\nThe planning process: During the release planning stage, project participants determine the general requirements for the upcoming release and set the time and budget frames:\n\n• The exploration phase – the project owner provides high-level requirements for the needed feature. The planning participants jointly turn these requirements into user stories.\n\n• The commitment phase – each user story is reworked into a piece of functionality, sorted by value and included in the plan for the upcoming release. The project participants agree on the costs and date of the release.\n\n• The steering phase – the plan built at the previous phase is reviewed, updated (if needed) and approved."
  },
  {
    title: 'Kanban',
    content: "At ScienceSoft, we use Kanban approach to manage a software development project without clear iterations. The project activities are split into small tasks to be performed within several working days. The tasks are assigned to team members and added to the Kanban board, which is split into different columns according to the status of the tasks in each column (e.g., to be done, in progress, completed). As the status of a task changes, a responsible team member moves the task from one column to another.\n\nPlanning participants: A project owner, a project manager, business analysts, team leads of the teams involved in the project (designers, developers, testers, data analysts and so on).\n\nPlanning specifics: Kanban has no separate planning stage. The communication with a project owner in a Kanban project is ongoing, and new change requests and tasks for the project team can be discussed and added to the Kanban board throughout the entire cooperation."
  }
];

export const blogPosts: BlogPost[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `${i + 1}`,
  title: i === 0 ? 'Plan Your Project with Your Software Development Model in Mind' : 'Members First Credit',
  date: 'October 24, 2023',
  description: i === 0 ? 'Explore our recent Web, eCommerce and Mobile app projects' : "With Arkatechture's help, Members First Credit Union will be using data to pinpoint products and services that will benefit their members most.",
  image: i % 4 === 0 ? '/logicmatrix/recent-work-1.png' : i % 4 === 1 ? '/logicmatrix/recent-work-2.png' : i % 4 === 2 ? '/logicmatrix/recent-work-3.png' : '/logicmatrix/recent-work-4.png',
  category: i === 0 ? 'Software Development' : 'Banking IT',
  href: `/blog/${i + 1}`,
  tags: i === 0 ? ['Software Development', 'Startups'] : ['Banking IT', 'Finance'],
  readTime: i === 0 ? '8 min read' : '5 min read',
  lastUpdated: i === 0 ? 'Nov 9, 2025' : 'Oct 24, 2023',
  effectiveDate: i === 0 ? '2nd Febuary 2026' : undefined,
  sections: i === 0 ? mockSections : undefined
}));
