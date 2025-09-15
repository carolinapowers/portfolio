export interface Recommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  summary: string;
  content: string;
  skills: string[];
  date: string;
  relationship: string;
}

export const recommendations: readonly Recommendation[] = [
  {
    id: '1',
    name: 'Margo Schaedel',
    title: 'Software Engineer',
    company: 'Articulate',
    avatar: 'MS',
    summary:
      'Brought technical excellence and generous spirit, making meaningful improvements to developer experience.',
    content: `Carolina made an immediate and lasting impression as an engineer at Articulate, bringing both technical excellence and a generous spirit to the team from day one. I joined Articulate around the same time she did, and even though she was still new herself, she reached out to help during my onboarding—guiding me through setup and smoothing over those often confusing and overwhelming first few weeks. Decidedly proactive, she also spent time updating legacy documentation, which streamlined the setup process for future team members, myself included.
Carolina brought a rare blend of curiosity, technical skill, and a strong sense of teamwork. She wasn't content to simply patch an issue—she always wanted to understand why things behaved the way they did. Her enthusiasm for digging into the root of a problem made her a stronger engineer, and she consistently shared her learnings with the team. I especially appreciated her initiative in experimenting with Cypress testing in our stack and then documenting and sharing her process—an example of her natural gift for knowledge-sharing, which is all too often undervalued in this industry.

She also made meaningful improvements to the developer experience at Articulate, including updating internal tooling to allow developers to test message publishing flows directly in the local environment—no need to navigate through the UI. These behind-the-scenes enhancements saved time, reduced friction, and reflected her deep commitment to making things better for everyone.

Carolina was always eager to lend a hand—whether pairing on a tricky bug, reviewing a pull request, or offering thoughtful support in Slack. Her collaborative spirit, technical acumen, and empathy made her a standout teammate, and any team would be incredibly fortunate to work with her.`,
    skills: [
      'Cypress Testing',
      'Developer Experience',
      'Knowledge Sharing',
      'Collaboration',
      'Proactive Mindset',
      'Code Quality',
      'Documentation Excellence',
      'Process Improvement',
      'Developer Tooling',
      'Onboarding Excellence',
      'Technical Guidance',
    ],
    date: 'July 18, 2025',
    relationship: 'Margo worked with Carolina on the same team',
  },
  {
    id: '2',
    name: 'Noelle Burton',
    title: 'BYU',
    company: 'Podium',
    avatar: 'NB',
    summary:
      'Carolina was a generous and insightful mentor who explained complex concepts and fostered collaboration.',
    content:
      "I had the privilege of working with Carolina during my internship, and I can confidently say she was one of the most impactful people I had the chance to collaborate with. From day one, she was a generous and insightful mentor—always willing to answer questions, explain complex concepts with clarity, and guide me through challenges with patience and respect. Our pair programming sessions were some of the most productive and rewarding experiences of my internship. She has a rare talent for writing clean, thoughtful code while creating a collaborative environment that invites ideas and encourages learning. I learned so much just by working alongside her. Beyond her mentorship, Carolina is a key contributor to any team she's on. She's technically sharp, incredibly dependable, and always willing to jump in and help. Her presence elevates both the quality of the work and the morale of the team. Any team would be lucky to have her.",
    skills: [
      'Mentorship',
      'Collaboration',
      'Clean Code',
      'Technical Communication',
    ],
    date: 'July 3, 2025',
    relationship:
      "Carolina was senior to Noelle but didn't manage her directly",
  },
  {
    id: '3',
    name: 'Kelly Furness',
    title: 'Software Engineering Manager',
    company: 'Articulate',
    avatar: 'KF',
    summary:
      'Exceptional at cross-team collaboration and uplifting team environments.',
    content:
      "I've been lucky enough to work at two companies with Carolina. While we haven't been on the same immediate team, I've had the pleasure of collaborating with her across several projects. Carolina is exceptional at cross-team collaboration and navigating complex projects with many moving parts and unknowns. She brings clarity to communication and is always flexible in how she works with others, whether that's through Zoom calls, Slack conversations, or async PR feedback. I've seen Carolina take on highly ambiguous work that required coordinating across multiple teams, which was a newer challenge for our organization. She consistently sets others up for success through thoughtful documentation, streamlined tooling, and a strong understanding of developer experience. Beyond her technical skills, Carolina is just a joy to work with. She's kind, approachable, and brings positivity to every interaction. She makes teams better not just through her code, but through the way she lifts up those around her.",
    skills: [
      'Cross-team Communication',
      'Developer Experience',
      'Documentation',
      'Leadership',
      'Kindness',
      'Positivity',
      'Developer Tooling',
      'Workflow Optimization',
    ],
    date: 'July 2, 2025',
    relationship: 'Kelly worked with Carolina but on different teams',
  },
  {
    id: '4',
    name: 'Paulius Juskevicius',
    title: 'Senior Software Engineer',
    company: 'Articulate',
    avatar: 'PJ',
    summary:
      "Calm and thoughtful engineer who improves every project and team she's part of.",
    content:
      "Carolina is one of those engineers who consistently makes things better — the codebase, the team, the project, all of it. I've had the chance to work with her at Articulate, and she brings a calm, thoughtful presence that raises the bar for everyone around her. She approaches problems with clarity and care, and it shows — in her code, in her reviews, and in how she collaborates across the team. Even when things get messy (and they do), she never loses sight of what's important or cuts corners just to get things done. Beyond her technical skills, Carolina is just a great teammate. Supportive, humble, and always willing to dig in and help — whether it's pairing on a tough bug or offering thoughtful feedback in a PR. Any team would be lucky to have her. I know mine is.",
    skills: ['Code Reviews', 'Teamwork', 'Resilience', 'Clean Code', 'Technical Guidance', 'Team Support'],
    date: 'July 1, 2025',
    relationship: 'Paulius worked with Carolina on the same team',
  },
  {
    id: '5',
    name: 'Jessica Poémape',
    title: 'Software Engineer',
    company: 'Articulate',
    avatar: 'JP',
    summary:
      'Highly collaborative engineer with enthusiasm for writing well-tested and maintainable code.',
    content:
      "I worked with Carolina for the past year at Articulate, mostly in React, Node and SQL. She's always ready to dive in and tackle challenging problems alongside the team, and her collaborative spirit makes working with her a true pleasure. With her extensive knowledge in writing well-tested, maintainable code, she consistently pushes for improvements that benefit everyone. Her enthusiasm for enhancing the codebase and elevating quality is truly infectious. Plus, she brings a vibrant energy and a sense of fun to the team, making even the toughest days feel a bit lighter. She's an invaluable asset, and any team would be lucky to have her!",
    skills: ['React', 'Node.js', 'SQL', 'Testing', 'Vibrant Energy', 'Fun', 'Testing Excellence', 'Code Quality'],
    date: 'July 1, 2025',
    relationship: 'Jessica worked with Carolina on the same team',
  },
  {
    id: '6',
    name: 'AJ Foster',
    title: 'Software Engineer',
    company: 'CodeSandbox',
    avatar: 'AF',
    summary:
      'Solved complex problems in new languages every month with technical depth and adaptability.',
    content:
      'Carolina and I joined Code School (later Pluralsight) around the same time, working together on one of the strangest and most dynamic teams there is. She tackled difficult software engineering problems with highly technical solutions — all in a new and different programming language nearly every month, based on the topic of instruction. She excelled at both this project-driven structure as well as the product-driven roles we eventually transitioned to during our tenure together. Trust her to deliver the right thing, done right, with experience in a variety of programming languages, runtimes, and paradigms.',
    skills: [
      'Programming Paradigms',
      'Languages',
      'Adaptability',
      'Problem Solving',
    ],
    date: 'July 1, 2025',
    relationship: 'AJ worked with Carolina on the same team',
  },
  {
    id: '7',
    name: 'Mariah Hay',
    title: 'CEO & Co-Founder',
    company: 'Allboarder',
    avatar: 'MH',
    summary:
      'Brings quiet strength, human-centered thinking, and inclusive collaboration to every team.',
    content:
      "I had the pleasure of leading the org Carolina was part of at Pluralsight, and even though we didn't work together day-to-day, her team's presence was consistently felt in the best ways — through thoughtful collaboration, strong communication, and a clear sense of ownership. What stood out most to me was how the team, including Carolina, consistently showed up for one another and for the work. They navigated complex projects with curiosity and care, always grounded in human-centered values. I saw them ask the right questions, advocate for the user, and collaborate with design, product, and engineering peers in ways that elevated the outcome and the team dynamic. Carolina in particular has a quiet strength — the kind that builds trust and brings out the best in others. She contributes not just through her skills, but through the perspective she brings and the inclusive way she works. Any organization that values genuine cross-functional collaboration and is committed to creating an environment where people are supported would be lucky to have her.",
    skills: ['Leadership', 'Collaboration', 'Empathy', 'Ownership'],
    date: 'July 1, 2025',
    relationship: 'Mariah managed Carolina directly',
  },
  {
    id: '8',
    name: 'Jaron Thatcher',
    title: 'Senior Software Engineer',
    company: 'Pluralsight',
    avatar: 'JT',
    summary:
      'Driven, dependable, and a team player who speaks up when something can be improved.',
    content:
      "Carolina is an awesome person to work with. She is exceptionally driven, prompt, and true to her word. She isn't afraid to speak up when she thinks there's a better way something could be done. She would be a great addition to any software team and I am happy to recommend her as a coworker for anybody who is lucky enough to be on this page reading this!",
    skills: ['Team Collaboration', 'Initiative', 'Communication', 'Advocacy'],
    date: 'July 1, 2025',
    relationship: 'Jaron worked with Carolina on the same team',
  },
  {
    id: '9',
    name: 'Matt Owens',
    title: 'Software Engineer',
    company: 'Dropbox',
    avatar: 'MO',
    summary:
      'Brilliant engineer and generous mentor who consistently delivers high-quality work.',
    content:
      "Carolina is a brilliant software engineer who takes immense pride in her work and consistently delivers. She's also a fantastic mentor who has taught me a tremendous amount. I wholeheartedly recommend her.",
    skills: [
      'Mentorship',
      'Software Engineering',
      'Consistency',
      'Quality Delivery',
    ],
    date: 'June 30, 2025',
    relationship: "Carolina was senior to Matt but didn't manage him directly",
  },
  {
    id: '10',
    name: 'Gary Eimerman',
    title: 'Chief Learning/Product Officer',
    company: 'Pluralsight',
    avatar: 'GE',
    summary:
      'Dedicated learner and team member who helped architect scalable solutions.',
    content:
      'Carolina is a great team member and a dedicated learner. Having the chance to work with her on the Content Libraries initiative at Pluralsight. It was clear she was able to work with the team to solve a challenging transformation in how we architected data and its relationship with our entire platform. It was also clear that while not everything was known, she was willing to dive in and learn to keep up both on the technological advancements, but also the business and how it worked so she could help engineer a solution that solved for both the needs of today and something that could scale.',
    skills: [
      'Architecture',
      'Team Collaboration',
      'Scalable Solutions',
      'Curiosity',
      'Technical Leadership',
      'Knowledge Sharing',
    ],
    date: 'June 30, 2025',
    relationship: 'Gary managed Carolina directly',
  },
  {
    id: '11',
    name: 'Kevin Law',
    title: 'Software Engineer',
    company: 'Pluralsight',
    avatar: 'KL',
    summary:
      'Great mentor with high integrity and strong web development skills.',
    content:
      'Carolina is a stellar person to work with. She is skilled as an engineer and has all the hallmarks of a great teammate; she has a high degree of personal integrity, offers thoughtful insights, asks the right questions, and is skilled at web software development. Carolina would often proactively seek ways to help me learn when I was new on the team and I consider her a great mentor because of it. She makes the engineers on her team better by the way she works and communicates. She has my strongest endorsement and recommendation.',
    skills: [
      'Mentorship',
      'Web Development',
      'Integrity',
      'Team Communication',
    ],
    date: 'June 28, 2025',
    relationship: 'Kevin worked with Carolina on the same team',
  },
  {
    id: '12',
    name: 'Jon Friskics',
    title: 'Product & Learning Leader',
    company: 'Code School / Pluralsight',
    avatar: 'JF',
    summary:
      'Cross-functional collaborator who delivered instructional content with care and context.',
    content:
      'Carolina was an amazing colleague and engineer when we worked together for years at Code School and Pluralsight! I worked directly with her on several big projects, including one that created a brand new interactive learning format. In addition to the engineering skills she brought to the team, she would often work with a variety of disciplines (like engineering, product, and content creators), and always cared about sharing knowledge in the right way to help everyone have the right context to collaborate.',
    skills: ['Instructional Content', 'Collaboration', 'Knowledge Sharing'],
    date: 'June 28, 2025',
    relationship: 'Jon worked with Carolina but on different teams',
  },
  {
    id: '13',
    name: 'Fangwen Zhao',
    title: 'Product Design Manager',
    company: 'Twilio',
    avatar: 'FZ',
    summary:
      'Detail-oriented engineer who sparked design insights and delivered high-quality results.',
    content:
      'Carolina is one of the most dedicated engineers I have ever worked with. During my time at PS, we partnered on delivering the best hands-on learning experiences — Projects at PS as well as the Content Library tooling to power the curation of all the courses at PS. Her attention to the details not only made me a better designer but also triggered a lot of new ideas. If anybody is looking for someone who is not only getting things done but always thinking ahead, taking ownership and delivering high-quality crafts, look no further!',
    skills: ['Design Collaboration', 'Ownership', 'Engineering Quality', 'Mentorship', 'Leadership'],
    date: 'June 28, 2025',
    relationship: 'Fangwen worked with Carolina on the same team',
  },
  {
    id: '14',
    name: 'Merilee Benson',
    title: 'Lead Product Designer',
    company: 'BILL',
    avatar: 'MB',
    summary:
      'Creative and dedicated engineer who proactively drives innovation and user-centered solutions.',
    content: `I had the pleasure of collaborating closely with Carolina on our product team, and I can confidently say she's a standout Software Engineer. Carolina's dedication to her craft and innovative problem-solving skills make her an invaluable asset to any team. Her creativity and proactive approach to problem-solving were evident in every project we worked on together. Carolina's dedication, kindness, and passion for her work made our collaboration both productive and enjoyable. She played a crucial role in key initiatives, such as implementing hands-on projects and integrating new experiences into our platform. Carolina's active participation in user research and design reviews highlighted her commitment to delivering creative solutions tailored to user needs. Overall, Carolina is not just a talented Software Engineer but also a collaborative team player who consistently goes above and beyond to deliver exceptional results. I wholeheartedly recommend her for any role where innovation, dedication, and passion are valued.`,
    skills: [
      'Creative Problem-Solving',
      'User Research',
      'Engineering Innovation',
      'Team Collaboration',
      'Kindness',
      'Passion',
      'Technical Guidance',
    ],
    date: 'June 6, 2025',
    relationship: 'Merilee worked with Carolina on the same team',
  },
  {
    id: '15',
    name: 'Jared Loosli',
    title: 'Director of Software Development',
    company: 'Pluralsight',
    avatar: 'JL',
    summary:
      'Thoughtful leader who advocates for customers and helps teams explore meaningful solutions.',
    content: `Carolina worked for me for many years. I appreciated her willingness to dig into complex situations and come up with options for her team to explore more fully. She is thoughtful about her approach to work and is willing to speak up and advocate not only for her teammates but customers and their experiences as well! I've loved working with her and would love to work with her again!`,
    skills: ['Leadership', 'Customer Focus', 'Team Support', 'Initiative'],
    date: 'May 27, 2025',
    relationship: 'Jared managed Carolina directly',
  },
  {
    id: '16',
    name: 'Mary Hoag',
    title: 'IT Project Manager',
    company: 'UCF Coding Bootcamp',
    avatar: 'MH',
    summary:
      'Supportive mentor who empowered students through technical guidance and dedication.',
    content: `Carolina's help and support has been instrumental in my success in the UCF Coding Bootcamp. When I was trying to use a new framework, one not covered by the course material, she offered technical help and corrections that got my app up and running. Her dedication to student success in addition to her technical knowledge has been a true asset to the new program at UCF. It has been a pleasure to work with her.`,
    skills: [
      'Mentorship',
      'Technical Guidance',
      'Education',
      'Student Success',
    ],
    date: 'June 30, 2016',
    relationship: "Carolina was senior to Mary but didn't manage her directly",
  },
  {
    id: '17',
    name: 'Mike Marrow',
    title: 'Manager, Software Engineering',
    company: 'Deloitte Digital',
    avatar: 'MM',
    summary:
      'Passionate and fast-learning developer who became a go-to expert in JavaScript and AngularJS.',
    content: `Few people have the drive and passion for their profession that Carol has. I had the pleasure of working with Carol for a year at Deloitte Digital. She came in as a Junior Developer but her skills quickly surpassed that level. Carol quickly picked up in-depth knowledge of JavaScript and AngularJS becoming a go-to person for projects involving those technologies. Carol would be a great addition to any team and I hope to work with her again in the future.`,
    skills: ['JavaScript', 'AngularJS', 'Quick Learning', 'Team Contribution'],
    date: 'June 8, 2016',
    relationship: "Mike was senior to Carolina but didn't manage her directly",
  },
] as const;


// 
// Use the real recommendations for the portfolio
export const portfolioRecommendations = recommendations;

export type RecommendationType = (typeof recommendations)[number];
export type PortfolioRecommendationType =
  (typeof portfolioRecommendations)[number];
