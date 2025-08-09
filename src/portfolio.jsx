import React, { useState, useEffect, useRef } from 'react';
import favourImage from './assets/fm.jpg';
import canisaHealthImage from './assets/canisa_health.png';
import kurabillImage from './assets/kurabill.png';
import medibalanceImage from './assets/medibalance.png';
import wooXImage from './assets/woox_travel.png';
import ashesiMobilityImage from './assets/ashesi_mobility.png';
import tubPneuImage from './assets/tubpneu_prediction.png';
import lungDetectImage from './assets/lung_detect.png';
import customerChurnImage from './assets/customer_churn.png';
import performancePredictionImage from './assets/performance_prediction.png';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const typedTextRef = useRef(null);
  const [stars, setStars] = useState([]);

  // Typed text effect
  useEffect(() => {
    const texts = [
      'brainstorming solutions at the intersection of healthcare & technology',
      'solving AI and machine learning challenges'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      
      const speed = isDeleting ? 50 : 100;
      setTimeout(type, speed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Create stars background
useEffect(() => {
  const createStars = () => {
    const starsArray = [];
    for (let i = 0; i < 150; i++) {
      starsArray.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      });
    }
    return starsArray;
  };
  
  setStars(createStars()); // Store stars in state
}, []);

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Email from your website';
    const message = formData.get('message');

    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      time: new Date().toLocaleString(),
    };

    try {
      // Initialize EmailJS if not already done
      if (typeof window !== 'undefined' && window.emailjs) {
        await window.emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams);

        setFormStatus(`
          <div style="text-align: center; padding: 20px 0; color: #32b8cd;">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p>Message sent successfully! I'll get back to you soon.</p>
          </div>
        `);
        e.target.reset();
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setFormStatus(`
        <div style="text-align: center; padding: 20px 0; color: #ff4545;">
          <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
          <p>Something went wrong! Please try again or contact me directly via email.</p>
        </div>
      `);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //Back to top button visibility
useEffect(() => {
  const handleScroll = () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  //Active section highlighting
useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'skills','research', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for header

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        
        // Update nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sections[i]}`) {
            link.classList.add('active');
          }
        });
        break;
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <>
      {/* Add external stylesheets */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="portfolio-container">
        {/* Stars Background */}
        <div className="stars" id="stars">
        {stars.map((star) => (
            <div
            key={star.id}
            className="star"
            style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`
            }}
            />
        ))}
        </div>

        {/* Header */}
        <header id="header">
          <div className="container">
            <nav>
            {/* Attach clickable url Link to name */}
              <div className="logo">
                <a href="#home">Favour <span> Madubuko</span></a>
              </div>
              <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
                <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
                <li><a href="#research" className={activeSection === 'research' ? 'active' : ''}>Research & Awards</a></li>
                <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
                <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
                <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
              </ul>

              {/* <div className="theme-toggle" onClick={toggleTheme}>
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </div> */}

              <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="container">
            <div className="hero-content">
              <h1>Tinkering with solutions around healthcare, data and technology</h1>
              <p>My interdisciplinary interest revolves around <span className="typed-text">{typedText}</span></p>
              <div className="hero-buttons">
                <a href="#projects" className="btn">My Work</a>
                <a href="#contact" className="btn secondary-btn">Contact Me</a>
              </div>
            </div>
            <div className="cosmic-circle"></div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="container">
            <div className="about-content">
              <div className="about-image">
                <img src={favourImage} alt="favour_image" />
              </div>
              <div className="about-text">
                <h2 className="section-title">About Favour</h2>
                <p style={{ textAlign: "justify" }}> Hi, I’m Favour. I am a first class graduate in Management Information Systems with a peculiar focus in Computer Science from Ashesi University. 
                I am a Software & AI Engineer and a Digital Health Advocate.
                {/* A fun fact about me is that I started my IT journey working at a cybercafe for my uncle from the age of 12; I reached and won the fastest level of Mavis Beacon Penguin Crossing game (I bet you can't beat my typing speed!).  */}
                  </p>
                <br />
                <p> My research interests revolve around Biomedical & Health Informatics, (Bio) Statistics, and Health Data Science domains.</p>
                <br />
                <p>At the side, I am building my healthcare startup <strong> <a href="https://canisa-health-wesbite.vercel.app/" target='_blank'>CANISA HEALTH.</a> </strong>Our flagship product <strong> <a href="https://kurabill.com/" target='_blank'>KURABILL</a> </strong> will be launching soon.</p>
                <br />
                {/* <p>When I’m not doing the serious stuff, I love to hike, cycle or explore nature.</p> */}

                <div className="about-stats">
                  <br />
                  <div className="stat">
                    <h3>Education</h3>
                    <p>BSc. MIS Ashesi University Ghana, 2025</p>
                    <p>UC Berkeley, Entrepreneurship & Technology, Spring 2024</p>
                  </div>
                  <div className="stats">
                    <div className="stat-box">
                      <div className="stat-number">3+</div>
                      <div className="stat-label">Years of Experience</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-number">7+</div>
                      <div className="stat-label">Major Projects</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-number">15+</div>
                      <div className="stat-label">Tech Skills</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills" id="skills">
          <div className="container">
            <h2 className="section-title">Technical Expertise</h2>
            <p>My skill set bridges technical expertise with design thinking. I am tool agnostic, as long as it solves the problem at hand.</p>

            <div className="skills-container">
              <div className="skill-category">
                <h3><i className="fas fa-code"></i> Programming Languages</h3>
                <ul className="skill-list">
                        <li>PHP</li>
                        {/* <li>Java</li> */}
                        <li>Python</li>
                        <li>JavaScript</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3><i className="fas fa-brain"></i> AI & Machine Learning</h3>
                <ul className="skill-list">
                        <li>Keras</li>
                        <li>PyTorch</li>
                        <li>Tensorflow</li>
                        <li>scikit-learn</li>
                        <li>Deep Learning</li>
                        <li>API Integration</li>
                        <li>Neural Networks</li>
                </ul>
              </div>

               <div class="skill-category">
                    <h3><i class="fas fa-chart-bar"></i> Data & Tools</h3>
                    <ul class="skill-list">
                        <li>R</li>
                        <li>SQL</li>
                        <li>NumPy</li>
                        <li>Pandas</li>
                        <li>Seaborn</li>
                        <li>MS Excel</li>
                        <li>Matplotlib</li>                        
                    </ul>
                </div>

                <div class="skill-category">
                    <h3><i class="fas fa-laptop-code"></i> Web & Software Development</h3>
                    <ul class="skill-list">
                        <li>Git</li>
                        <li>React</li>
                        <li>MySQL</li>
                        <li>Vercel</li>
                        <li>Django</li>
                        <li>NextJS</li>
                        <li>FastAPI</li>
                        <li>Streamlit</li>
                        <li>TypeScript</li>                     
                    </ul>
                </div>
                
                <div class="skill-category">
                    <h3><i class="fas fa-users"></i> Soft Skills</h3>
                    <ul class="skill-list">
                        <li>Research</li>
                        <li>Teamwork</li>
                        <li>Communication</li>
                        <li>Design Thinking</li>
                        <li>Problem-Solving</li>
                        <li>Product Management</li>
                    </ul>
                </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="projects" id="research">
          <div className="container">
            <h2 className="section-title">Featured Research and Award</h2>
            <p>Research is all about showing the world what possibilities exists. Awards are by-products of excellence.</p>
                <div className="projects-grid">
                      <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                        <div className="project-content">
                          <div class="project-links">
                            <span className="tech-tag">Research</span>
                            <a href="https://canisa-health-wesbite.vercel.app/" target="_blank"><i class="fas fa-external-link-alt"></i> Read Here</a>
                          </div>
                          <br />
                          <p className="project-desc">A health platform aimed at helping patients manage their hypertension through accurate health data entry and analysis of symptoms</p>
                        </div>
                      </div>

                       <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                        <div className="project-content">
                          <div class="project-links">
                            <span className="tech-tag">Research manuscript in progress</span>
                            <a href="https://canisa-health-wesbite.vercel.app/" target="_blank"><i class="fas fa-external-link-alt"></i> Read Here</a>
                          </div>
                          <br />
                          <p className="project-desc">A health platform aimed at helping patients manage their hypertension through accurate health data entry and analysis of symptoms</p>
                        </div>
                      </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                         <div className="project-content">
                          <div class="project-links">
                            <span className="tech-tag">Research Project</span>
                            <a href="https://canisa-health-wesbite.vercel.app/" target="_blank"><i class="fas fa-external-link-alt"></i> Read Here</a>
                          </div>
                          <br />
                          <p className="project-desc">A health platform aimed at helping patients manage their hypertension through accurate health data entry and analysis of symptoms</p>
                         </div>
                       </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - Oxford University, ISF Finalist</span>
                            </div>
                            <br />
                            <p className="project-desc">Health Entrepreneurship Stream, Oxford Africa Conference Innovation Seed Fund Finalist, 2024</p>
                          </div>
                        </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - Mastercard Foundation Scholar 2025</span>
                            </div>
                            <br />
                            <p className="project-desc">Awarded a fully-funded MCF scholarship to pursue undergraduate studies at Ashesi University Ghana.</p>
                          </div>
                        </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - Yale PATHS Scholar 2025</span>
                            </div>
                            <br />
                            <p className="project-desc">Selected as a scholar by the Yale School of Medicine for preparation towards launching a career in the Biomedical Sciences</p>
                          </div>
                        </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - 25Under25 Health Innovator Nominee, 2024</span>
                            </div>
                            <br />
                            <p className="project-desc">Selected as a nominee for the 25Under25 Digital Health Innovator award in Nigeria under the Health and Care Category</p>
                          </div>
                        </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - 1st Place, 2023</span>
                            </div>
                            <br />
                            <p className="project-desc">InnoTech, African Digital Health Community Health Innovation Bootcamp. Community Health Innovation for lung disease prediction in low-resourced community</p>
                          </div>
                        </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - 2nd Place, Design & Entrepreneurship Fair 2022</span>
                            </div>
                            <br />
                            <p className="project-desc">Designed a prototype, <strong>HelpSpace</strong>, which is an EdTech solution for overcrowded universities in Ghana for maximized resource sharing</p>
                          </div>
                        </div>

                        <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - 3rd Place, Design Thinking Hackathon, 2022</span>
                            </div>
                            <br />
                            <p className="project-desc">Built and deployed <strong>#BITS</strong> - an E-commerce application - to enable students buy and sell re-usable items within communities</p>
                          </div>
                        </div>

                         <div className="project-card">
                          <div class="project-img">
                            <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                          </div>
                          <div className="project-content">
                            <div class="project-links">
                              <span className="tech-tag">Award - 3rd Place, EduHack Hackathon, 2022</span>
                            </div>
                            <br />
                            <p className="project-desc">Utilized the design thinking approach to prototype a study application for students with low-attention span and ADHD tendencies to enable focused learning.</p>
                          </div>
                        </div>
                        
                </div>
          </div>
        </section>


        {/* Experience Section */}
        {/* https://clustrmaps.com/add */}
        <section className="experience" id="experience">
          <div className="container">
            <h2 className="section-title">Professional Experience</h2>
            <p>My professional timeline while learning and building hands-on projects</p>

            <div className="timeline">
              <div class="timeline-item">
                <div class="timeline-date">July 2025 - Present</div>
                <h3 class="timeline-title">AI Engineering Intern</h3>
                <p class="timeline-subtitle"> <a href="https://yemaachi.com/" target="_blank" rel="noopener noreferrer">Yemaachi Biotechnology (YC S21)</a> - Accra, Ghana</p>
                <ul>
                    <li>Working within the Bioinformatics and AI team to conduct research and document approaches to implement deep learning algorithms capable of cancer mutation detection</li>
                    <li>Implementing the Graph Convolutional Networks to test out research hypotheses related to cancer genomics and drug response prediction</li>
                </ul>
            </div>

              <div class="timeline-item">
                    <div class="timeline-date">May 2024 - June 2025</div>
                    <h3 class="timeline-title">Data Scientist (Machine Learning Focus) </h3>
                    <p class="timeline-subtitle"> <a href="https://axumai.org/" target="_blank" rel="noopener noreferrer">Axum AI</a> - Illinois, USA</p>
                    <ul>
                        <li>Developed an NER-based document extraction pipeline that improved medical data accuracy by 40%, streamlining drug-related information retrieval.</li>
                        <li>Fine-tuned LLMs for pharmaceutical applications, reducing query response time by 20% while maintaining domain-specific accuracy.</li>
                        <li>Scaled data processing workflows to handle 1K+ medical documents, ensuring efficient drug information extraction.</li>
                        <li>Automated preprocessing and validation steps, cutting manual review time by 30% and enhancing dataset reliability.</li>
                    </ul>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">January 2024 - May 2024</div>
                    <h3 class="timeline-title">Data Science Intern</h3>
                    <p class="timeline-subtitle"> <a href="https://beta.torneos.gg/en" target="_blank" rel="noopener noreferrer">Gamefort</a> - Delaware, USA</p>
                    <ul>
                        <li>Boosted gamer retention by 10% across 5K+ active users by deploying Support Vector Machine algorithm to personalize betting experiences.</li>
                        <li>Spearheaded MVP launch in 2 weeks, driving 30% higher engagement and 15% lower churn through cross-functional collaboration between team and CEO.</li>
                        <li>Designed real-time ML pipelines analyzing 1M+ daily transactions, achieving 95% accuracy in betting behavior predictions.</li>
                        <li>Optimized data workflows, reducing latency by 20% and enabling faster, scalable insights for the platform.</li>
                    </ul>
                </div>

                <div class="timeline-item">
                    <div class="timeline-date">January 2024</div>
                    <h3 class="timeline-title">Research & Data Intern</h3>
                    <p class="timeline-subtitle"> <a href="http://www.redish.com" target="_blank" rel="noopener noreferrer">Re:Dish</a> - California, USA</p>
                    <ul>
                        <li>Led a cross-functional team of 5 business and engineering students to analyze low reusable plastic adoption in California, identifying key barriers (cost, convenience, awareness) through primary research and market analysis</li>
                        <li>Developed 10 actionable solutions (e.g., incentive programs, retail partnerships) based on research insights, improving the stakeholder’s go-to-market strategy by 25%</li>
                        <li>Built an AI-powered API prototype that compared real-time costs of single-use vs. reusable plastics, providing data-driven transparency for potential users</li>
                        <li>Presented findings and prototype to stakeholders, resulting in 2 solutions being prioritized for pilot testing</li>
                    </ul>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">September 2023 - December 2023</div>
                    <h3 class="timeline-title">Founder-in-Residence</h3>
                    <p class="timeline-subtitle"> <a href="https://www.futurize.studio/futurizeu" target='_blank'>Futurize Incubator</a> - England, United Kingdom</p>
                    <ul>
                        <li>Selected for Futurize’s HealthTech incubator, a first-of-its-kind program in Africa, supported by AstraZeneca and Bristol Myers Squibb.</li>
                        <li>Researched & validated Canisa Health (a chronic disease management platform) through customer discovery, competitive analysis, and regulatory compliance frameworks.</li>
                        <li>Developed a scalable business model by applying lean startup methodologies, IP strategy, and operations management best practices from expert-led workshops.</li>
                        <li>Acquired practical entrepreneurship training in commercializing health research - from ideation and customer validation - to industry implementation and scaling.</li>
                    </ul>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">September 2022 - February 2023</div>
                    <h3 class="timeline-title">Co-founder and Strategy Lead</h3>
                    <p class="timeline-subtitle"> <a href="http://myscholarshub.org" target='_blank'> <strong>myScholarsHub</strong></a></p>
                    <ul>
                        <li>Launched a college EdTech advisory and consultant platform connecting high-school students with with great academic potential from low-income backgrounds to scholarship opportunities.</li>
                        <li>Secured $1000 seed funding from the Coca-Cola Foundation, and managed budget/financial allocation for product development and student outreach programs.</li>
                        <li>Established partnerships with 5 local high schools to test the platform, leading to 10+ student admissions to choice colleges between time period of 2022-2023.</li>
                    </ul>
                </div>          

                <div class="timeline-item">
                    <div class="timeline-date">June 2022 - July 2022</div>
                    <h3 class="timeline-title">Project Management Intern</h3>
                    <p class="timeline-subtitle">African Leadership Academy - South Africa</p>
                    <ul>
                        <li>Worked in a team of three students across different time zones to investigate and analyze the cause of high school students' dropout rate in South Africa post-COVID-19 pandemic. </li>
                        <li>Developed an organizational re-integration framework to revamp school curriculum and accomodate periodic return to school which reduced the dropout rate by 50%. </li>
                        <li>Compiled and updated weekly report on team progress for modifications and project progress which minimized potential scope creep and improved communication flow.</li>
                    </ul>
                </div>

                 <div class="timeline-item">
                    <div class="timeline-date">May 2022 - June 2022</div>
                    <h3 class="timeline-title">Design Thinking Intern</h3>
                    <p class="timeline-subtitle">Ashesi Entrepreneurship and Design Lab - Accra, Ghana</p>
                    <ul>
                        <li>Co-led the remodification of service delivery and go-to market strategy for a flagship Learning Management System (LMS) SaaS product</li>
                        <li>Researched competitors and developed best competitive strategy to ensure penetration and adoption of product by private secondary schools in Ghana</li>
                        <li>Facilitated stakeholder outreach and engagement meetings to refine value proposition and validate business model.</li>
                    </ul>
                </div>
            </div>
          </div>
        </section>

        {/* Projects Section*/}
        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <p>My projects showcase a blend of design thinking, and a deep understanding of user needs.</p>

            <div className="projects-grid">
                <div class="project-card">
                    <div class="project-img">
                        <img src={canisaHealthImage} alt="Canisa Health" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Canisa Health</h3>
                        <p class="project-desc">A health platform aimed at helping patients manage their hypertension through accurate health data entry and analysis of symptoms</p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">NodeJS</span>
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">MongoDB</span>
                        </div>
                        <div class="project-links">
                            <a href="https://canisa-health-wesbite.vercel.app/" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        </div>
                    </div>
                </div>
              
                <div class="project-card">
                    <div class="project-img">
                        <img src= {kurabillImage} alt="Kurabill" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Kurabill</h3>
                        <p class="project-desc">An inventory and POS platform that helps pharmacies setup their digital pharmacy and streamline their operations while targeting hard-to-reach patients. We enable loved ones send care across borders by purchasing medication with the power of stablecoins </p>
                        <div class="project-tech">
                            <span class="tech-tag">Medical</span>
                            <span class="tech-tag">Health financing</span>
                            <span class="tech-tag">E-commerce</span>
                            <span class="tech-tag">Digital Health</span>
                        </div>
                        <div class="project-links">
                            <a href="https://www.kurabill.com" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-img">
                        <img src= {medibalanceImage } alt="Medibalance" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Medibalance</h3>
                        <p class="project-desc">A medical invoicing system that helps patients manage their medical expenses and health facilities process billing with less friction  and digital proofs.</p>
                        <div class="project-tech">
                            <span class="tech-tag">PHP</span>
                            <span class="tech-tag">MySQL</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">Apache</span>
                            <span class="tech-tag">HTML/CSS</span>
                            <span class="tech-tag">AWS</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>

                        </div>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-img">
                        <img src= {wooXImage} alt="wooX Travel" />

                    </div>
                    <div class="project-content">
                        <h3 class="project-title">wooX Travel - who is travelling?</h3>
                        <p class="project-desc">A travel companion application that helps users manage their travel itineraries, book and make payment to visit tourists sites in Ghana.</p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">PHP</span>
                            <span class="tech-tag">MySQL</span>
                            <span class="tech-tag">Apache</span>
                            <span class="tech-tag">AWS</span>
                            <span class="tech-tag">API</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {ashesiMobilityImage} alt="Ashesi Mobility" />

                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Ashesi Mobility</h3>
                        <p class="project-desc">A web application designed to facilitate bookings, ticketing and payment for Ashesi staff whilst providing them with real-time updates on available buses, their schedules and routes.</p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">jQuery</span>
                            <span class="tech-tag">PHP</span>
                            <span class="tech-tag">MySQL</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {tubPneuImage} alt="Tuberculosis and Pneumonia Diagnosis" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Tuberculosis and Pneumonia Prediction app</h3>
                        <p class="project-desc">Developed a machine learning model to assist in the diagnosis of tuberculosis and pneumonia from chest X-ray images, achieving high accuracy and efficiency.</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Convolutional Neural Network</span>
                            <span class="tech-tag">Pandas</span>
                            <span class="tech-tag">NumPy</span>
                            <span class="tech-tag">TensorFlow</span>
                            <span class="tech-tag">Streamlit</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {lungDetectImage} alt="Lung Disease Prediction" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Lung Disease Prediction app</h3>
                        <p class="project-desc">Developed an end-to-end machine learning model to assist in the detection of patients prone to lung diseases from symptoms in order to refer them for checkup</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Pandas</span>
                            <span class="tech-tag">NumPy</span>
                            <span class="tech-tag">Matplotlib</span>
                            <span class="tech-tag">Seaborn</span>
                            <span class="tech-tag">scikit-learn</span>
                            <span class="tech-tag">Streamlit</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {customerChurnImage} alt="Customer Churn Prediction" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Customer Churn Prediction app</h3>
                        <p class="project-desc">Developed an end-to-end machine learning model to assist in identifying and predicting at-risk customers who are likely to churn so as to implement targeted retention strategies</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>

                            <span class="tech-tag">Pandas</span>
                            <span class="tech-tag">Data Analysis</span>
                            <span class="tech-tag">Data Visualization</span>
                            <span class="tech-tag">NumPy</span>
                            <span class="tech-tag">Matplotlib</span>
                            <span class="tech-tag">Seaborn</span>
                            <span class="tech-tag">Multi Layer Perceptron</span>
                            <span class="tech-tag">Support Vector Machine</span>
                            <span class="tech-tag">Streamlit</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-img">
                        <img src= {performancePredictionImage} alt="Player Performance Prediction" />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Player Performance Prediction app</h3>
                        <p class="project-desc">Developed an end-to-end machine learning model to assist in identifying and predicting player performance metrics for better team selection and strategy formulation</p>
                        <div class="project-tech">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Pandas</span>                                                        
                            <span class="tech-tag">Keras</span>
                            <span class="tech-tag">TensorFlow</span>
                            <span class="tech-tag">NumPy</span>
                            <span class="tech-tag">Matplotlib</span>
                            <span class="tech-tag">Seaborn</span>
                            <span class="tech-tag">Streamlit</span>
                        </div>
                        <div class="project-links">
                            <a href="" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                            <a href="" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <p>Got a research or project idea you want to chat about? Do send me a message</p>
            <div className="contact-wrapper">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>favour.madubuko.mr@gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>(+233) 123456789</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>Ghana</p>
                  </div>
                </div>
                
                <div className="social-links">
                  <a href="http://www.linkedin.com/in/madubuko-favour-c" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://github.com/favouralgo" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                </div>
              </div>
              
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="message" placeholder="Your Message" required></textarea>
                  </div>
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span><i className="fas fa-spinner fa-spin"></i> Sending...</span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                  <div className="form-status" dangerouslySetInnerHTML={{ __html: formStatus }}></div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <p className="footer-text">© 2025 Favour Madubuko. All rights reserved.</p>
          </div>
        </footer>

        {/* Back to Top Button */}
        <a href="#about" className="back-to-top">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </>
  );
};

export default Portfolio;