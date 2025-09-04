import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Star, Coffee, Award, Network, Lightbulb, Globe, Zap, Heart, ArrowRight, Shuffle, Trophy, Target, AlertTriangle, CheckCircle, XCircle, Battery, Sun, Cloud, Umbrella, Camera, MessageCircle, Gift } from 'lucide-react';

const ONAQuest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    experience: '',
    interests: [],
    networking: '',
    schedule: '',
    focus: [],
    difficulty: 'veteran'
  });
  const [currentTimeSlot, setCurrentTimeSlot] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [knowledgePoints, setKnowledgePoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [energy, setEnergy] = useState(100);
  const [relationships, setRelationships] = useState({});
  const [reputation, setReputation] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [weather, setWeather] = useState('sunny');
  const [dayState, setDayState] = useState({
    wednesday: { completed: false, energy: 100 },
    thursday: { completed: false, energy: 100 },
    friday: { completed: false, energy: 100 }
  });

  // Enhanced points system with activity types
  const activityPoints = {
    keynote: 60,
    workshop: 85,
    panel: 45,
    networking_structured: 55,
    networking_casual: 35,
    meal_strategic: 25,
    meal_social: 45,
    rest_strategic: 15,
    sponsor_booth: 30,
    jazz_club: 40,
    live_tweet: 20,
    help_attendee: 35,
    organize_meetup: 100
  };

  // Comprehensive achievement system
  const achievementList = [
    { id: 'quest_begins', title: 'Quest Begins!', description: 'Started your ONA adventure', points: 25, icon: '🎯' },
    { id: 'first_networking', title: 'Social Starter', description: 'Attended first networking event', points: 50, icon: '🤝' },
    { id: 'energy_master', title: 'Energy Guru', description: 'Maintained 80+ energy for full day', points: 75, icon: '⚡' },
    { id: 'new_orleans_explorer', title: 'Big Easy Explorer', description: 'Experienced authentic New Orleans culture', points: 60, icon: '🎺' },
    { id: 'weather_warrior', title: 'Weather Warrior', description: 'Overcame weather challenges', points: 80, icon: '⛈️' },
    { id: 'reputation_builder', title: 'Influence Builder', description: 'Built strong professional reputation', points: 100, icon: '⭐' },
    { id: 'knowledge_hoarder', title: 'Knowledge Hoarder', description: 'Earned 800+ knowledge points', points: 75, icon: '📚' },
    { id: 'social_butterfly', title: 'Social Butterfly', description: 'Built relationships with 5+ people', points: 85, icon: '🦋' },
    { id: 'sponsor_savvy', title: 'Sponsor Savvy', description: 'Mastered sponsor interactions', points: 65, icon: '🎁' },
    { id: 'balance_master', title: 'Balance Master', description: 'Perfect work-life-conference balance', points: 150, icon: '⚖️' },
    { id: 'chaos_survivor', title: 'Chaos Survivor', description: 'Thrived despite conference chaos', points: 200, icon: '🌪️' },
    { id: 'mentor_mode', title: 'Conference Mentor', description: 'Helped 3+ fellow attendees', points: 120, icon: '🧙‍♀️' }
  ];

  // Enhanced challenge system with multi-day consequences
  const challenges = [
    {
      id: 'wednesday_weather',
      title: '🌧️ New Orleans Storm Warning',
      description: 'Sudden thunderstorm hits during outdoor welcome reception. The jazz courtyard is flooding!',
      options: [
        { text: 'Dash inside and network in lobby', points: 40, energyCost: 10, outcome: 'Quick thinking! You help organize impromptu indoor networking. Reputation +2!' },
        { text: 'Embrace the chaos - dance in rain', points: 25, energyCost: 15, outcome: 'Legendary move! You become the talk of the conference. Instant friendships formed!' },
        { text: 'Head back to hotel early', points: 10, energyGain: 20, outcome: 'Smart rest choice, but you miss key networking opportunities.' }
      ]
    },
    {
      id: 'beignet_dilemma',
      title: '🥐 Café du Monde Temptation',
      description: 'Everyone\'s going for famous beignets, but your 9 AM keynote starts in 20 minutes. Uber surge pricing is 3x!',
      options: [
        { text: 'Skip beignets, arrive early to keynote', points: 75, outcome: 'Professional discipline! You get front row seats and network with speakers before the session.' },
        { text: 'Quick beignet run, risk being late', points: 45, energyCost: 25, outcome: 'You make it just in time, covered in powdered sugar. Memorable entrance!' },
        { text: 'Organize group Uber share', points: 60, outcome: 'Leadership skills! You coordinate 4 people, split costs, and arrive together.' }
      ]
    },
    {
      id: 'sponsor_booth_maze',
      title: '🎁 Sponsor Booth Bermuda Triangle',
      description: 'You\'re trapped by an overly enthusiastic vendor demo. Your next session starts in 5 minutes!',
      options: [
        { text: 'Politely extract with business card promise', points: 50, outcome: 'Smooth exit! You maintain relationships while protecting your schedule.' },
        { text: 'Suffer through the full demo', points: -15, energyCost: 20, outcome: 'You learn about blockchain journalism solutions (spoiler: they don\'t work).' },
        { text: 'Introduce vendor to another attendee', points: 85, outcome: 'Genius networking move! You help both parties and become the conference connector.' }
      ]
    },
    {
      id: 'jazz_club_fomo',
      title: '🎷 Frenchmen Street Dilemma',
      description: 'The conference crowd is hitting the jazz clubs, but you have an 8 AM panel tomorrow. It\'s already 10 PM!',
      options: [
        { text: 'Strategic 1-hour jazz experience', points: 65, energyCost: 30, outcome: 'Perfect balance! You experience New Orleans culture and still get decent sleep.' },
        { text: 'Go all-in until 2 AM', points: 90, energyCost: 60, outcome: 'Epic night! Amazing connections made, but tomorrow will be rough.' },
        { text: 'Head home early like a responsible adult', points: 30, energyGain: 25, outcome: 'Your future self thanks you. Well-rested for tomorrow\'s intensive sessions.' }
      ]
    },
    {
      id: 'twitter_storm',
      title: '📱 Breaking News Twitter Storm',
      description: 'Major journalism story breaks during your session. Everyone\'s phones are buzzing. Do you engage?',
      options: [
        { text: 'Stay focused on session', points: 100, outcome: 'Iron discipline! You absorb 100% of the content while others miss key insights.' },
        { text: 'Strategic live-tweet session highlights', points: 75, outcome: 'Smart multi-tasking! You build your online presence while staying engaged.' },
        { text: 'Deep dive into breaking news', points: -25, outcome: 'You miss the entire session scrolling. The news cycle waits for no one.' }
      ]
    },
    {
      id: 'networking_overwhelm',
      title: '🤯 Networking Overload',
      description: 'You\'ve met 20 people today. Your business card stack is overwhelming and you can\'t remember names!',
      options: [
        { text: 'Take strategic break to organize contacts', points: 70, energyCost: 15, outcome: 'Smart system thinking! You create a contact management system others want to copy.' },
        { text: 'Power through and meet more people', points: 40, energyCost: 25, outcome: 'Quantity over quality. You meet tons of people but struggle with follow-up.' },
        { text: 'Focus on deepening existing connections', points: 85, outcome: 'Relationship mastery! You turn surface meetings into meaningful professional bonds.' }
      ]
    }
  ];

  // Comprehensive multi-day schedule
  const timeSlots = [
    // WEDNESDAY EVENING
    {
      day: 'Wednesday Sept 10',
      time: '6:00 PM',
      title: 'Quest Begins! 🎭',
      dayPhase: 'evening',
      required: true,
      activity: {
        title: 'Welcome Reception: Jazz Courtyard Kickoff',
        speakers: ['Conference Organizers', 'Local Jazz Musicians'],
        description: 'Welcome to New Orleans! Authentic jazz music, local cuisine, and your first chance to meet fellow journalism adventurers. The quest officially begins!',
        duration: '2 hours',
        location: 'Hyatt Regency Courtyard',
        category: 'networking_structured',
        points: activityPoints.networking_structured,
        energyCost: 20,
        whyMatch: 'Every legendary quest needs an epic beginning! Set the tone for your entire conference adventure.'
      }
    },
    
    // THURSDAY MORNING
    {
      day: 'Thursday Sept 11',
      time: '8:00 AM',
      title: 'Fuel Up Decision! ☕',
      dayPhase: 'morning',
      weatherSensitive: true,
      options: [
        {
          title: 'Strategic Coffee & Networking Breakfast',
          speakers: ['Conference sponsors', 'Early bird attendees'],
          description: 'Get caffeinated while building connections with other early risers. Strategic networking before the crowds arrive.',
          duration: '45 minutes',
          location: 'Hotel Restaurant',
          category: 'meal_strategic',
          points: activityPoints.meal_strategic,
          energyGain: 25,
          whyMatch: (prefs) => 'Perfect for maximizing your energy and connections before the day\'s learning marathon begins!'
        },
        {
          title: 'Authentic New Orleans Beignet Adventure',
          speakers: ['Local café owners', 'Cultural ambassadors'],
          description: 'Experience the real New Orleans at Café du Monde! Famous beignets and café au lait, plus cultural immersion.',
          duration: '60 minutes',
          location: 'Café du Monde (French Quarter)',
          category: 'meal_social',
          points: activityPoints.meal_social,
          energyGain: 20,
          culturalBonus: 25,
          whyMatch: (prefs) => 'Immerse yourself in New Orleans culture while fueling up for the day. Experience points bonus!'
        },
        {
          title: 'Quick Prep & Review Session Notes',
          speakers: ['Your strategic mind'],
          description: 'Use this time to review your personalized session plan and mentally prepare for optimal learning.',
          duration: '45 minutes',
          location: 'Hotel room or quiet space',
          category: 'rest_strategic',
          points: activityPoints.rest_strategic,
          energyGain: 30,
          focusBonus: 15,
          whyMatch: (prefs) => 'Maximize your learning capacity with strategic preparation. Your future self will thank you!'
        }
      ]
    },
    
    {
      day: 'Thursday Sept 11',
      time: '9:30 AM',
      title: 'Morning Knowledge Intensive! 🧠',
      dayPhase: 'morning',
      challengeRisk: 0.3,
      options: [
        {
          title: 'AI Revolution: Newsroom Automation Masterclass',
          speakers: ['Alex Rodriguez (Washington Post AI Lead)', 'Dr. Sarah Kim (Journalism AI Researcher)', 'Roberto Martinez (Automated Content Director)'],
          description: 'Deep dive into practical AI implementation. Learn to build 3 production-ready workflows, understand ethical implications, and see live demos of newsroom automation.',
          duration: '2 hours',
          location: 'Tech Innovation Lab',
          category: 'workshop',
          difficulty: 'Advanced',
          points: activityPoints.workshop,
          energyCost: 35,
          takeaways: ['3 ready-to-implement AI workflows', 'Ethics framework checklist', 'Automation ROI calculator'],
          prerequisites: [],
          whyMatch: (prefs) => prefs.interests.includes('ai') ? 
            '🤖 PERFECT MATCH! Your AI specialization makes this a knowledge goldmine. Expect maximum learning gains!' :
            '🚀 Essential future-proofing for any journalist. AI literacy is becoming non-negotiable.'
        },
        {
          title: 'Climate Storytelling: Data Visualization That Moves People',
          speakers: ['Dr. Maria Santos (Guardian Climate Editor)', 'James Chen (Climate Data Scientist)', 'Lisa Thompson (Solutions Journalism Expert)'],
          description: 'Transform overwhelming climate data into compelling human stories. Master advanced visualization techniques and learn psychology-based narrative frameworks.',
          duration: '2 hours',
          location: 'Sustainability Innovation Center',
          category: 'workshop',
          difficulty: 'Intermediate',
          points: activityPoints.workshop,
          energyCost: 30,
          takeaways: ['Interactive data viz templates', 'Climate story framework', 'Source network contacts'],
          whyMatch: (prefs) => prefs.interests.includes('climate') ?
            '🌍 CLIMATE CHAMPION DETECTED! Your passion will amplify every technique learned here.' :
            '📊 Critical skills for any data-driven journalist. Climate affects every beat.'
        },
        {
          title: 'Building Anti-Fragile Newsrooms: Beyond Survival',
          speakers: ['Michael Park (Resilient Media CEO)', 'Dr. Lisa Wang (Organizational Psychology)', 'David Martinez (Crisis Management Expert)'],
          description: 'Go beyond resilience to anti-fragility. Learn how to make your newsroom stronger through challenges, not despite them.',
          duration: '2 hours',
          location: 'Leadership Strategy Room',
          category: 'workshop',
          difficulty: 'Leadership',
          points: activityPoints.workshop,
          energyCost: 25,
          takeaways: ['Anti-fragility assessment tool', 'Crisis-to-strength playbooks', 'Team resilience metrics'],
          whyMatch: (prefs) => prefs.experience === 'leader' ?
            '👑 LEADERSHIP BONUS ACTIVATED! Perfect for your level - maximum strategic knowledge gains!' :
            '💪 Essential survival skills for the modern journalism landscape.'
        }
      ]
    },
    
    {
      day: 'Thursday Sept 11',
      time: '12:00 PM',
      title: 'Midday Energy Management! 🍽️',
      dayPhase: 'midday',
      weatherSensitive: true,
      challengeRisk: 0.4,
      options: [
        {
          title: 'Power Lunch: Strategic Networking with Industry Leaders',
          speakers: ['C-suite executives', 'Award-winning journalists', 'Innovation directors'],
          description: 'Intimate lunch with 8 carefully selected industry leaders. Share challenges, gain insights, and build high-value relationships.',
          duration: '90 minutes',
          location: 'Executive Dining Room',
          category: 'meal_strategic',
          points: activityPoints.meal_strategic + 20,
          energyGain: 35,
          reputationBonus: 25,
          prerequisites: ['High reputation or leadership experience'],
          whyMatch: (prefs) => 'Exclusive access to industry decision-makers. Your reputation opens doors to this tier of networking.'
        },
        {
          title: 'New Orleans Culinary Tour: Authentic Local Experience',
          speakers: ['Local chefs', 'Food culture experts', 'Fellow adventurous attendees'],
          description: 'Explore the real New Orleans food scene. Po\' boys, jambalaya, and networking with locals and fellow conference-goers.',
          duration: '2 hours',
          location: 'French Quarter & Marigny',
          category: 'meal_social',
          points: activityPoints.meal_social + 15,
          energyGain: 40,
          culturalBonus: 35,
          energyCost: 15, // walking around the city
          whyMatch: (prefs) => 'Perfect cultural immersion! Experience New Orleans authentically while building unique connections.'
        },
        {
          title: 'Strategic Rest & Session Prep',
          speakers: ['Your wise inner voice'],
          description: 'Recharge in your hotel room, review morning insights, and strategically prepare for afternoon intensive sessions.',
          duration: '90 minutes',
          location: 'Hotel room',
          category: 'rest_strategic',
          points: activityPoints.rest_strategic,
          energyGain: 50,
          focusBonus: 20,
          whyMatch: (prefs) => preferences.schedule === 'relaxed' ? 
            '🧘 PERFECT for your mindful approach! Strategic rest maximizes afternoon performance.' :
            '⚡ Smart energy management. Sometimes the best choice is strategic recovery.'
        }
      ]
    },
    
    {
      day: 'Thursday Sept 11',
      time: '2:30 PM',
      title: 'Afternoon Deep Dive! 🏊‍♀️',
      dayPhase: 'afternoon',
      challengeRisk: 0.5,
      options: [
        {
          title: 'Revenue Revolution: Sustainable Journalism Business Models',
          speakers: ['Jennifer Martinez (Morning Brew Revenue VP)', 'Carlos Rodriguez (Subscription Growth Expert)', 'Amy Foster (Independent Media Entrepreneur)'],
          description: 'Decode the mystery of sustainable journalism revenue. From membership models to innovative monetization strategies that actually work in 2025.',
          duration: '2.5 hours',
          location: 'Business Strategy War Room',
          category: 'workshop',
          difficulty: 'Business Focus',
          points: activityPoints.workshop + 10,
          energyCost: 40,
          takeaways: ['Revenue diversification playbook', 'Pricing psychology toolkit', 'Live P&L analysis'],
          whyMatch: (prefs) => prefs.interests.includes('business') ?
            '📊 REVENUE WIZARD PATH! Your business focus makes this session pure gold for knowledge points!' :
            '💰 Essential for every journalist. Understanding business models = career security.'
        },
        {
          title: 'Audience Alchemy: Community-First Content Strategy',
          speakers: ['Sarah Williams (The Athletic Community Director)', 'David Chang (Engagement Analytics Expert)', 'Maria Lopez (Creator Economy Specialist)'],
          description: 'Flip the traditional model. Learn to build devoted communities first, then create content they can\'t resist sharing.',
          duration: '2.5 hours',
          location: 'Community Innovation Lab',
          category: 'workshop',
          difficulty: 'Strategic',
          points: activityPoints.workshop,
          energyCost: 35,
          takeaways: ['Community-first framework', 'Engagement multiplier tactics', 'Live audience audit'],
          whyMatch: (prefs) => prefs.interests.includes('audience') ?
            '👥 COMMUNITY WHISPERER ACTIVATED! Your audience expertise will multiply these insights!' :
            '🎯 Critical for any journalist who wants their work to actually reach and impact people.'
        },
        {
          title: 'Product Thinking for News Innovation',
          speakers: ['Tom Johnson (Spotify Product Lead, ex-NYT)', 'Rachel Kim (News Product Designer)', 'Mark Davis (User Experience Researcher)'],
          description: 'Think like a product manager, act like a journalist. Learn to build news experiences people genuinely want in their daily lives.',
          duration: '2.5 hours',
          location: 'Innovation Design Studio',
          category: 'workshop',
          difficulty: 'Technical',
          points: activityPoints.workshop,
          energyCost: 35,
          takeaways: ['Product management fundamentals', 'User research toolkit', 'Rapid prototyping methods'],
          whyMatch: (prefs) => prefs.interests.includes('product') ?
            '⚡ INNOVATION ARCHITECT MODE! Your product interest makes this the perfect knowledge multiplier!' :
            '🔧 Essential for understanding how successful news products actually get built and scaled.'
        }
      ]
    },
    
    // FRIDAY MORNING
    {
      day: 'Friday Sept 12',
      time: '9:00 AM',
      title: 'Final Day Energy! 🌅',
      dayPhase: 'morning',
      weatherSensitive: true,
      options: [
        {
          title: 'Table Talks: Intimate Knowledge Sharing',
          speakers: ['Diverse conference attendees', 'Topic experts'],
          description: 'Small group discussions on hot topics. Choose your table based on interests and dive deep with 6-8 like-minded professionals.',
          duration: '90 minutes',
          location: 'Multiple themed areas',
          category: 'networking_structured',
          points: activityPoints.networking_structured + 15,
          energyCost: 20,
          relationshipBonus: 30,
          whyMatch: (prefs) => 'Perfect for deep connections and knowledge sharing. Quality over quantity networking!'
        },
        {
          title: 'Sponsor Showcase Speed Dating',
          speakers: ['Innovation companies', 'Tool creators', 'Service providers'],
          description: 'Rapid-fire exposure to cutting-edge journalism tools and services. 5-minute demos, focused on practical value.',
          duration: '2 hours',
          location: 'Exhibition Hall',
          category: 'sponsor_booth',
          points: activityPoints.sponsor_booth * 3,
          energyCost: 25,
          toolDiscoveryBonus: 40,
          whyMatch: (prefs) => 'Efficient way to discover tools that could transform your workflow. Maximum learning per minute!'
        }
      ]
    },
    
    {
      day: 'Friday Sept 12',
      time: '1:00 PM',
      title: 'Grand Finale! 🏆',
      dayPhase: 'afternoon',
      required: true,
      activity: {
        title: 'Online Journalism Awards Ceremony',
        speakers: ['Award recipients', 'Industry legends', 'ONA leadership'],
        description: 'Celebrate the best in digital journalism. Be inspired by award-winning work and connect with the industry\'s finest.',
        duration: '2 hours',
        location: 'Grand Ballroom',
        category: 'keynote',
        points: activityPoints.keynote + 25,
        energyCost: 15,
        inspirationBonus: 50,
        whyMatch: 'The perfect crescendo to your quest! Witness excellence and leave inspired for your next journalism adventure.'
      }
    },
    
    {
      day: 'Friday Sept 12',
      time: '3:30 PM',
      title: 'Quest Completion Choice! 🎭',
      dayPhase: 'afternoon',
      options: [
        {
          title: 'Strategic Follow-up Session',
          speakers: ['Your organized mind'],
          description: 'Organize contacts, plan follow-ups, and cement the knowledge you\'ve gained. The smart way to end.',
          duration: '90 minutes',
          location: 'Quiet hotel space',
          category: 'rest_strategic',
          points: activityPoints.rest_strategic + 35,
          energyGain: 25,
          organizationBonus: 50,
          whyMatch: (prefs) => 'Transform conference connections into lasting professional relationships. Strategic thinking at its finest!'
        },
        {
          title: 'Final New Orleans Cultural Experience',
          speakers: ['Local culture guides', 'Fellow adventurers'],
          description: 'Last chance to experience authentic New Orleans culture with your new conference connections.',
          duration: '3 hours',
          location: 'French Quarter & Beyond',
          category: 'meal_social',
          points: activityPoints.meal_social + 25,
          energyCost: 20,
          culturalBonus: 60,
          whyMatch: (prefs) => 'Perfect finale! Combine cultural exploration with relationship deepening. Memories that last a lifetime!'
        }
      ]
    }
  ];

  const questions = [
    {
      id: 'welcome',
      title: '🎮 Welcome to ONA Quest: New Orleans Edition!',
      subtitle: 'Your mission: Master the ultimate 3-day journalism adventure',
      content: 'You\'re about to embark on the most comprehensive conference quest ever created! Navigate 3 days in New Orleans, balance energy and learning, build lasting relationships, and overcome real conference challenges. Every choice shapes your professional future!',
      type: 'welcome'
    },
    {
      id: 'difficulty',
      title: 'Choose your adventure difficulty! ⚔️',
      subtitle: 'Each mode offers different challenges and rewards',
      options: [
        { value: 'rookie', label: 'Rookie Mode', icon: '🌱', desc: 'Guided experience with clear optimal paths', bonus: 'Extra guidance and fewer distractions' },
        { value: 'veteran', label: 'Veteran Mode', icon: '🎯', desc: 'Realistic conference experience with authentic challenges', bonus: 'Balanced difficulty with real-world scenarios' },
        { value: 'chaos', label: 'Chaos Mode', icon: '⚡', desc: 'Maximum difficulty with unexpected changes', bonus: 'Highest point multipliers for surviving chaos' }
      ],
      type: 'single'
    },
    {
      id: 'experience',
      title: 'Choose your character class! 🎮',
      subtitle: 'Each class has unique bonuses and challenges',
      options: [
        { value: 'early', label: 'Eager Apprentice', icon: '🌱', desc: 'High learning speed, vulnerable to distractions', bonus: '+30% workshop knowledge, -20% challenge resistance' },
        { value: 'mid', label: 'Seasoned Adventurer', icon: '🚀', desc: 'Balanced stats, good challenge resistance', bonus: 'Balanced bonuses across all activities' },
        { value: 'senior', label: 'Master Craftsperson', icon: '⭐', desc: 'Deep insights, networking bonuses', bonus: '+40% networking points, +20% reputation gains' },
        { value: 'leader', label: 'Guild Leader', icon: '👑', desc: 'Leadership bonuses, exclusive access', bonus: '+50% leadership content, access to exclusive events' }
      ],
      type: 'single'
    },
    {
      id: 'interests',
      title: 'Select your power-up specializations! ⚡',
      subtitle: 'Each specialization provides 25% bonus points in related activities',
      options: [
        { value: 'ai', label: 'AI Sorcery', icon: '🤖', desc: 'Master AI tools and automation', bonus: '+25% AI session points, unlock AI-specific challenges' },
        { value: 'climate', label: 'Earth Guardian', icon: '🌍', desc: 'Climate storytelling mastery', bonus: '+25% climate session points, environmental insight bonuses' },
        { value: 'resilience', label: 'Phoenix Rising', icon: '💪', desc: 'Newsroom resilience expertise', bonus: '+25% resilience session points, crisis management bonuses' },
        { value: 'business', label: 'Revenue Wizard', icon: '📊', desc: 'Business model innovation', bonus: '+25% business session points, monetization insight bonuses' },
        { value: 'audience', label: 'Community Whisperer', icon: '👥', desc: 'Audience engagement mastery', bonus: '+25% audience session points, community building bonuses' },
        { value: 'product', label: 'Innovation Architect', icon: '⚡', desc: 'News product development', bonus: '+25% product session points, UX/design insight bonuses' }
      ],
      type: 'multiple'
    }
  ];

  const handleAnswer = (questionId, value) => {
    if (questions[currentStep].type === 'multiple') {
      const current = preferences[questionId] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      setPreferences({ ...preferences, [questionId]: updated });
    } else {
      setPreferences({ ...preferences, [questionId]: value });
    }
  };

  const calculatePoints = (basePoints, category, bonuses = {}) => {
    let finalPoints = basePoints;
    
    // Apply specialization bonus
    if (preferences.interests && preferences.interests.includes(category)) {
      finalPoints *= 1.25;
    }
    
    // Apply difficulty multiplier
    const difficultyMultiplier = {
      rookie: 1.0,
      veteran: 1.2,
      chaos: 1.5
    };
    finalPoints *= difficultyMultiplier[preferences.difficulty] || 1.2;
    
    // Apply additional bonuses
    Object.values(bonuses).forEach(bonus => {
      finalPoints += bonus;
    });
    
    return Math.round(finalPoints);
  };

  const updateEnergy = (change) => {
    setEnergy(prev => Math.max(0, Math.min(100, prev + change)));
  };

  const updateReputation = (change) => {
    setReputation(prev => Math.max(0, prev + change));
  };

  const unlockAchievement = (achievementId, context = {}) => {
    const achievement = achievementList.find(a => a.id === achievementId);
    if (achievement && !achievements.find(a => a.id === achievementId)) {
      setAchievements(prev => [...prev, { ...achievement, context }]);
      setKnowledgePoints(prev => prev + achievement.points);
      return achievement;
    }
    return null;
  };

  const triggerChallenge = () => {
    // Select appropriate challenge based on current state
    let availableChallenges = [...challenges];
    
    if (currentTimeSlot === 0) availableChallenges = availableChallenges.filter(c => c.id === 'wednesday_weather');
    if (timeSlots[currentTimeSlot]?.day.includes('Thursday') && timeSlots[currentTimeSlot]?.time.includes('8:00')) {
      availableChallenges = availableChallenges.filter(c => c.id === 'beignet_dilemma');
    }
    
    const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    setCurrentChallenge(randomChallenge);
  };

  const handleChallengeChoice = (option) => {
    const pointsGained = calculatePoints(option.points || 0, 'challenge');
    setKnowledgePoints(prev => prev + pointsGained);
    
    if (option.energyCost) updateEnergy(-option.energyCost);
    if (option.energyGain) updateEnergy(option.energyGain);
    
    setCurrentChallenge({ ...currentChallenge, outcome: option.outcome, resolved: true });
    
    // Check for achievements
    const challengeCount = selectedActivities.filter(s => s.challengeResolved).length + 1;
    if (challengeCount >= 3) {
      unlockAchievement('chaos_survivor');
    }
  };

  const selectActivity = (activity, timeSlotIndex) => {
    const bonuses = {
      cultural: activity.culturalBonus || 0,
      reputation: activity.reputationBonus || 0,
      focus: activity.focusBonus || 0
    };
    
    const pointsEarned = calculatePoints(activity.points, activity.category, bonuses);
    
    const newSelection = {
      timeSlot: timeSlotIndex,
      activity: activity,
      day: timeSlots[timeSlotIndex].day,
      time: timeSlots[timeSlotIndex].time,
      pointsEarned: pointsEarned,
      challengeResolved: currentChallenge?.resolved || false
    };
    
    // Update game state
    setKnowledgePoints(prev => prev + pointsEarned);
    if (activity.energyCost) updateEnergy(-activity.energyCost);
    if (activity.energyGain) updateEnergy(activity.energyGain);
    if (activity.reputationBonus) updateReputation(activity.reputationBonus);
    
    const updatedSelections = [...selectedActivities];
    updatedSelections[timeSlotIndex] = newSelection;
    setSelectedActivities(updatedSelections);
    
    // Check for achievements
    if (selectedActivities.length === 0) {
      unlockAchievement('quest_begins');
    }
    
    if (activity.category.includes('networking')) {
      unlockAchievement('first_networking');
    }
    
    if (knowledgePoints + pointsEarned >= 800) {
      unlockAchievement('knowledge_hoarder');
    }
    
    if (energy >= 80) {
      unlockAchievement('energy_master');
    }
    
    // Clear challenge
    setCurrentChallenge(null);
    
    if (currentTimeSlot < timeSlots.length - 1) {
      setCurrentTimeSlot(currentTimeSlot + 1);
      
      // Check for random challenge
      const nextSlot = timeSlots[currentTimeSlot + 1];
      if (nextSlot && nextSlot.challengeRisk && Math.random() < nextSlot.challengeRisk) {
        setTimeout(() => triggerChallenge(), 1000);
      }
    } else {
      setCurrentStep(-1); // Quest complete!
    }
  };

  // Challenge overlay
  if (currentChallenge && !currentChallenge.resolved) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-red-50 to-orange-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-300">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Challenge Alert!</h1>
            </div>
            <p className="text-red-100">Your quest is being tested...</p>
          </div>

          <div className="p-6 text-center">
            <div className="text-6xl mb-4">{currentChallenge.title.split(' ')[0]}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentChallenge.title}</h2>
            <p className="text-gray-600 text-lg mb-8">{currentChallenge.description}</p>

            <div className="space-y-4">
              {currentChallenge.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChallengeChoice(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    option.points > 0 ? 'border-green-300 hover:border-green-500 bg-green-50' :
                    option.points < 0 ? 'border-red-300 hover:border-red-500 bg-red-50' :
                    'border-yellow-300 hover:border-yellow-500 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option.text}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${
                        option.points > 0 ? 'text-green-600' :
                        option.points < 0 ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {option.points > 0 ? '+' : ''}{option.points} pts
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Challenge outcome display
  if (currentChallenge && currentChallenge.resolved) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Challenge Resolved!</h1>
            </div>
          </div>

          <div className="p-6 text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <p className="text-gray-700 text-lg mb-6">{currentChallenge.outcome}</p>
            
            <button
              onClick={() => setCurrentChallenge(null)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Continue Quest! <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quest activity selection phase
  if (currentStep >= questions.length && currentStep !== -1) {
    const currentSlot = timeSlots[currentTimeSlot];
    
    if (!currentSlot) {
      return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">Quest Complete!</h1>
            <p className="text-gray-600">Your legendary ONA Quest is finished!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        {/* Enhanced HUD */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🧠</div>
              <div>
                <h3 className="text-2xl font-bold text-purple-800">{knowledgePoints} Knowledge Points</h3>
                <p className="text-purple-600">{currentSlot.day} • {currentSlot.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-green-600" />
                <div className="w-20 bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      energy > 70 ? 'bg-green-500' : energy > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${energy}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{energy}%</span>
              </div>
              
              <div className="flex gap-2">
                {achievements.slice(-3).map((achievement, index) => (
                  <div key={index} className="text-2xl bg-yellow-100 rounded-full p-2" title={achievement.title}>
                    {achievement.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentTimeSlot) / timeSlots.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6" />
              <h1 className="text-3xl font-bold">{currentSlot.day} • {currentSlot.time}</h1>
            </div>
            <h2 className="text-xl text-purple-100">{currentSlot.title}</h2>
          </div>

          <div className="p-6">
            {currentSlot.required ? (
              <div className="text-center space-y-6">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentSlot.activity.title}</h3>
                  <p className="text-gray-600 mb-4">{currentSlot.activity.description}</p>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-center gap-4 text-lg font-bold">
                      <Target className="w-6 h-6 text-purple-600" />
                      <span className="text-purple-800">{currentSlot.activity.points} Knowledge Points</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-blue-800 font-medium">🎪 {currentSlot.activity.whyMatch}</p>
                  </div>
                </div>

                <button
                  onClick={() => selectActivity(currentSlot.activity, currentTimeSlot)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Join Activity! <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-2">🤔</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Path!</h3>
                  <p className="text-gray-600">Each choice affects your energy, knowledge, and relationships</p>
                </div>

                <div className="space-y-6">
                  {currentSlot.options.map((option, index) => {
                    const finalPoints = calculatePoints(option.points, option.category, {
                      cultural: option.culturalBonus || 0,
                      reputation: option.reputationBonus || 0
                    });

                    return (
                      <div key={index} className="border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all duration-200 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{index === 0 ? '🚀' : index === 1 ? '🌟' : '⚡'}</div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-xl font-bold text-gray-800">{option.title}</h4>
                                <div className="flex gap-2">
                                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-lg text-sm">
                                    <Target className="w-4 h-4 inline mr-1" />
                                    <span className="font-bold text-green-800">{finalPoints} pts</span>
                                  </div>
                                  {option.energyCost && (
                                    <div className="bg-red-100 px-3 py-1 rounded-lg text-sm">
                                      <span className="font-bold text-red-700">-{option.energyCost} energy</span>
                                    </div>
                                  )}
                                  {option.energyGain && (
                                    <div className="bg-blue-100 px-3 py-1 rounded-lg text-sm">
                                      <span className="font-bold text-blue-700">+{option.energyGain} energy</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-gray-700 mb-4">{option.description}</p>

                              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                                <p className="text-yellow-800 font-medium text-sm">
                                  {typeof option.whyMatch === 'function' ? option.whyMatch(preferences) : option.whyMatch}
                                </p>
                              </div>

                              {option.takeaways && (
                                <div className="mb-4">
                                  <h5 className="font-semibold text-gray-800 mb-2">🎁 You'll gain:</h5>
                                  <div className="flex gap-2 flex-wrap">
                                    {option.takeaways.map((takeaway, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                        {takeaway}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <button
                                onClick={() => selectActivity(option, currentTimeSlot)}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                                disabled={energy < (option.energyCost || 0)}
                              >
                                Choose This Path! 🎯
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Final quest completion
  if (currentStep === -1) {
    const totalPoints = knowledgePoints;
    const rank = totalPoints >= 1200 ? 'Legendary Quest Master' :
                 totalPoints >= 1000 ? 'Knowledge Grandmaster' :
                 totalPoints >= 800 ? 'Wisdom Seeker' :
                 totalPoints >= 600 ? 'Learning Champion' :
                 'Conference Explorer';

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">ONA Quest Complete!</h1>
          <p className="text-gray-600">Your legendary New Orleans journalism adventure is finished!</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Final Score: {totalPoints} Knowledge Points</h2>
            <div className="text-xl text-purple-600 mb-6">Rank: {rank}</div>
            
            {achievements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements Unlocked</h3>
                <div className="flex gap-4 justify-center flex-wrap">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="font-bold text-gray-800 text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">+{achievement.points} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-800">Your Quest Journey</h3>
            {selectedActivities.map((selection, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="text-2xl">📚</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-purple-600 mb-1">
                    <Clock className="w-4 h-4" />
                    {selection.day} • {selection.time}
                  </div>
                  <h4 className="font-semibold text-gray-800">{selection.activity.title}</h4>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+{selection.pointsEarned}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setCurrentStep(0);
                setCurrentTimeSlot(0);
                setSelectedActivities([]);
                setPreferences({});
                setKnowledgePoints(0);
                setAchievements([]);
                setEnergy(100);
                setReputation(0);
                setCurrentChallenge(null);
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Start New Quest! 🎮
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Initial questionnaire
  const question = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Quest Setup {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
          {question.subtitle && (
            <p className="text-purple-100">{question.subtitle}</p>
          )}
        </div>

        <div className="p-6">
          {question.type === 'welcome' ? (
            <div className="text-center space-y-6">
              <div className="text-6xl">🎭</div>
              <p className="text-gray-600 text-lg leading-relaxed">{question.content}</p>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-2">Quest Features:</h3>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>🎯 Multi-day adventure with energy management</li>
                  <li>⚔️ Real conference challenges and distractions</li>
                  <li>🏆 Achievement system with professional growth rewards</li>
                  <li>🎺 Authentic New Orleans cultural experiences</li>
                  <li>🤝 Relationship building with lasting impact</li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Begin Epic Quest! 🗡️
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {question.options.map((option) => {
                const isSelected = question.type === 'multiple' 
                  ? (preferences[question.id] || []).includes(option.value)
                  : preferences[question.id] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 transform hover:scale-102 ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-50 shadow-md' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <h3 className={`font-medium ${isSelected ? 'text-purple-800' : 'text-gray-800'}`}>
                          {option.label}
                        </h3>
                        <p className={`text-sm mt-1 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`}>
                          {option.desc}
                        </p>
                        {option.bonus && (
                          <p className={`text-xs mt-1 font-medium ${isSelected ? 'text-green-700' : 'text-green-600'}`}>
                            {option.bonus}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-purple-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type !== 'welcome' && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={currentStep === 0}
              >
                ← Back
              </button>
              
              <button
                onClick={() => {
                  if (currentStep === questions.length - 1) {
                    setCurrentStep(questions.length);
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                disabled={
                  (question.type === 'single' && !preferences[question.id]) ||
                  (question.type === 'multiple' && (!preferences[question.id] || preferences[question.id].length === 0))
                }
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === questions.length - 1 ? 'Begin Quest! 🗡️' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ONAQuest;